import { useEffect, useRef } from 'react'

const TINTS = ['255, 255, 255', '255, 255, 255', '226, 232, 255', '255, 240, 220', '233, 225, 255']

function makeStars(w, h, coarse){
    // fewer stars on phones: same look, less work per frame
    const count = Math.min(Math.round((w * h) / (coarse ? 4200 : 2600)), 650)
    return Array.from({ length: count }, () => {
        const depth = Math.random() ** 2 * 0.8 + 0.2
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            depth,
            r: 0.35 + depth * 1.25,
            alpha: 0.35 + Math.random() * 0.65,
            speed: 0.6 + Math.random() * 2.2,
            phase: Math.random() * Math.PI * 2,
            tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        }
    })
}

export default function Starfield(){
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const coarse = window.matchMedia('(pointer: coarse)').matches
        const mouse = { x: 0, y: 0 }
        const offset = { x: 0, y: 0 }
        let stars = []
        let shooting = null
        let nextShot = 0
        let raf = 0
        let w = 0
        let h = 0

        function resize(){
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            w = window.innerWidth
            h = window.innerHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            stars = makeStars(w, h, coarse)
            draw(0)
        }

        function launchShootingStar(t){
            const fromLeft = Math.random() < 0.5
            shooting = {
                start: t,
                life: 900 + Math.random() * 500,
                x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
                y: Math.random() * h * 0.4,
                dx: (fromLeft ? 1 : -1) * (0.55 + Math.random() * 0.3),
                dy: 0.32 + Math.random() * 0.15,
            }
        }

        function drawShootingStar(t){
            const p = (t - shooting.start) / shooting.life
            if (p >= 1){
                shooting = null
                return
            }
            const travel = p * 700
            const hx = shooting.x + shooting.dx * travel
            const hy = shooting.y + shooting.dy * travel
            const tx = hx - shooting.dx * 160
            const ty = hy - shooting.dy * 160
            const fade = p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85
            const grad = ctx.createLinearGradient(hx, hy, tx, ty)
            grad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * fade})`)
            grad.addColorStop(1, 'rgba(196, 181, 253, 0)')
            ctx.strokeStyle = grad
            ctx.lineWidth = 1.6
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(hx, hy)
            ctx.lineTo(tx, ty)
            ctx.stroke()
        }

        function draw(t){
            ctx.clearRect(0, 0, w, h)

            // ease the parallax toward the cursor so the sky glides instead of jumping
            offset.x += (mouse.x - offset.x) * 0.04
            offset.y += (mouse.y - offset.y) * 0.04

            for (const s of stars){
                if (!reduced){
                    // slow drift, nearer stars move faster; wrap around the edges
                    s.x -= 0.012 * s.depth
                    s.y += 0.006 * s.depth
                    if (s.x < -4) s.x = w + 4
                    if (s.y > h + 4) s.y = -4
                }
                const px = s.x + offset.x * s.depth
                const py = s.y + offset.y * s.depth
                const twinkle = reduced ? 1 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.phase)
                ctx.fillStyle = `rgba(${s.tint}, ${s.alpha * twinkle})`
                ctx.beginPath()
                ctx.arc(px, py, s.r, 0, Math.PI * 2)
                ctx.fill()
            }

            if (!reduced){
                if (!shooting && t > nextShot){
                    if (nextShot) launchShootingStar(t)
                    nextShot = t + 6000 + Math.random() * 9000
                }
                if (shooting) drawShootingStar(t)
            }
        }

        function loop(t){
            draw(t)
            raf = requestAnimationFrame(loop)
        }

        function onMove(e){
            mouse.x = (e.clientX - w / 2) * -0.03
            mouse.y = (e.clientY - h / 2) * -0.03
        }

        resize()
        window.addEventListener('resize', resize)

        // a still sky when motion is reduced; otherwise twinkle, drift and the odd shooting star
        if (!reduced){
            if (!coarse) window.addEventListener('mousemove', onMove)
            raf = requestAnimationFrame(loop)
        }

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMove)
        }
    }, [])

    return (
        <>
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 0,
                    background: 'radial-gradient(ellipse 60% 50% at 85% 10%, rgba(139, 92, 246, 0.12), transparent 70%), radial-gradient(ellipse 50% 45% at 5% 90%, rgba(219, 39, 119, 0.08), transparent 70%)',
                }}
            />
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
            />
        </>
    )
}
