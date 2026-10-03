// Renders the hero nebula cloud layers to transparent WebP files in public/nebula.
// The clouds come from SVG fractal noise, which is too heavy to compute live on phones,
// so they are baked once here and the page only moves the finished images around.
// Run with: node scripts/generate-nebula.mjs
import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const OUT = new URL('../public/nebula/', import.meta.url)
const WIDTH = 960
const HEIGHT = 640

// color is the cloud's RGB (0-1); gain/offset turn the noise into wisps (higher offset = thinner clouds)
const layers = [
    { name: 'violet', color: [0.6, 0.4, 1], freq: '0.0032 0.0055', octaves: 5, seed: 11, gain: 3.6, offset: -1.25, cx: 0.62, cy: 0.42, r: 0.58 },
    { name: 'magenta', color: [1, 0.25, 0.6], freq: '0.0045 0.004', octaves: 5, seed: 29, gain: 3.6, offset: -1.4, cx: 0.6, cy: 0.58, r: 0.46 },
    { name: 'teal', color: [0.2, 0.9, 0.82], freq: '0.006 0.0045', octaves: 5, seed: 5, gain: 3.4, offset: -1.35, cx: 0.8, cy: 0.64, r: 0.34 },
    { name: 'core', color: [1, 0.9, 1], freq: '0.009 0.007', octaves: 5, seed: 71, gain: 3, offset: -1.35, cx: 0.66, cy: 0.46, r: 0.26 },
    { name: 'dust', color: [0.02, 0.01, 0.05], freq: '0.008 0.012', octaves: 5, seed: 53, gain: 3, offset: -1.4, cx: 0.62, cy: 0.5, r: 0.4 },
]

function svg({ color: [r, g, b], freq, octaves, seed, gain, offset, cx, cy, r: radius }){
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 1200 800">
  <defs>
    <filter id="cloud" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${octaves}" seed="${seed}"/>
      <feColorMatrix type="matrix" values="0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  ${gain} 0 0 0 ${offset}"/>
    </filter>
    <radialGradient id="fade" cx="${cx}" cy="${cy}" r="${radius}">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="0.6" stop-color="#777"/>
      <stop offset="1" stop-color="#000"/>
    </radialGradient>
    <mask id="edge"><rect width="1200" height="800" fill="url(#fade)"/></mask>
  </defs>
  <rect width="1200" height="800" filter="url(#cloud)" mask="url(#edge)"/>
</svg>`
}

await mkdir(OUT, { recursive: true })

for (const layer of layers){
    const file = new URL(`${layer.name}.webp`, OUT)
    const info = await sharp(Buffer.from(svg(layer)))
        .webp({ quality: 74, alphaQuality: 100, smartSubsample: true, effort: 6 })
        .toFile(file.pathname.replace(/^\/([A-Za-z]:)/, '$1'))
    console.log(`${layer.name}.webp  ${(info.size / 1024).toFixed(0)} kB`)
}
