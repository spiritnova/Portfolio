// Renders the services section's planet surfaces to WebP files in public/planets.
// Each texture tiles seamlessly left to right, so the page can scroll it inside a circle
// to make the planet turn. Run with: node scripts/generate-planets.mjs
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const OUT = fileURLToPath(new URL('../public/planets/', import.meta.url))
// drawn on a 1024x512 canvas, saved at 600x300: sharp enough for a 150px planet on a retina screen
const VIEW_W = 1024
const VIEW_H = 512
const OUT_W = 600
const OUT_H = 300

// boosts the noise's contrast, then maps it through a colour table (dark to light)
function palette(stops, slope, intercept){
    const channel = i => stops.map(s => s[i]).join(' ')
    return `<feColorMatrix type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="${slope}" intercept="${intercept}"/>
        <feFuncG type="linear" slope="${slope}" intercept="${intercept}"/>
        <feFuncB type="linear" slope="${slope}" intercept="${intercept}"/>
      </feComponentTransfer>
      <feComponentTransfer>
        <feFuncR type="table" tableValues="${channel(0)}"/>
        <feFuncG type="table" tableValues="${channel(1)}"/>
        <feFuncB type="table" tableValues="${channel(2)}"/>
      </feComponentTransfer>`
}

const filter = (id, body) => `<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">${body}</filter>`
const layer = (id, opacity = 1) => `<rect width="${VIEW_W}" height="${VIEW_H}" filter="url(#${id})" opacity="${opacity}"/>`

const planets = {
    // banded gas giant
    violet: `
        ${filter('s', `<feTurbulence type="fractalNoise" baseFrequency="0.0014 0.022" numOctaves="5" seed="4" stitchTiles="stitch"/>
            ${palette([[0.1, 0.04, 0.26], [0.2, 0.09, 0.44], [0.33, 0.18, 0.66], [0.48, 0.33, 0.86], [0.66, 0.55, 0.95], [0.82, 0.74, 0.98]], 2.2, -0.6)}`)}
        ${filter('w', `<feTurbulence type="fractalNoise" baseFrequency="0.006 0.02" numOctaves="4" seed="12" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.98  0 0 0 0 0.8  0 0 0 0 0.92  2.4 0 0 0 -1.3"/>`)}
        ${layer('s')}
        ${layer('w', 0.22)}`,
    // ocean world with clouds
    teal: `
        ${filter('s', `<feTurbulence type="fractalNoise" baseFrequency="0.0045 0.009" numOctaves="6" seed="21" stitchTiles="stitch"/>
            ${palette([[0.01, 0.08, 0.13], [0.02, 0.14, 0.22], [0.03, 0.24, 0.32], [0.05, 0.36, 0.4], [0.16, 0.5, 0.46], [0.36, 0.62, 0.52]], 2.4, -0.7)}`)}
        ${filter('c', `<feTurbulence type="fractalNoise" baseFrequency="0.005 0.022" numOctaves="5" seed="8" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  3.4 0 0 0 -1.8"/>`)}
        ${layer('s')}
        ${layer('c', 0.7)}`,
    // rocky rose world
    rose: `
        ${filter('s', `<feTurbulence type="fractalNoise" baseFrequency="0.0045 0.008" numOctaves="7" seed="33" stitchTiles="stitch"/>
            ${palette([[0.2, 0.04, 0.1], [0.34, 0.08, 0.18], [0.5, 0.15, 0.28], [0.66, 0.27, 0.4], [0.8, 0.45, 0.55], [0.9, 0.62, 0.7]], 2, -0.5)}`)}
        ${layer('s')}`,
}

await mkdir(OUT, { recursive: true })

for (const [name, body] of Object.entries(planets)){
    // render at the drawing's own size and shrink afterwards: rendering the noise straight
    // at a smaller size makes the renderer split it into mismatched tiles
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${VIEW_W}" height="${VIEW_H}" viewBox="0 0 ${VIEW_W} ${VIEW_H}">${body}</svg>`
    const full = await sharp(Buffer.from(svg)).png().toBuffer()
    const info = await sharp(full)
        .resize(OUT_W, OUT_H)
        // brighter and richer than the raw noise, since the page shades most of the sphere into night
        .modulate({ brightness: 1.4, saturation: 1.25 })
        .linear(1.1, -12)
        .webp({ quality: 80, effort: 6 })
        .toFile(`${OUT}${name}.webp`)
    console.log(`${name}.webp  ${(info.size / 1024).toFixed(0)} kB`)
}
