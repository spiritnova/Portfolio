import { useEffect, useRef } from 'react'

const SPACING = 34
const RADIUS = 160
const BASE = 'rgba(255, 255, 255, 0.10)'

export default function GridBackground(){
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const coarse = window.matchMedia('(pointer: coarse)').matches
        const mouse = { x: -9999, y: -9999 }
        let dots = []
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

            dots = []
            for (let x = SPACING / 2; x < w; x += SPACING){
                for (let y = SPACING / 2; y < h; y += SPACING){
                    dots.push({ ox: x, oy: y, x, y })
                }
            }
            draw()
        }

        function draw(){
            ctx.clearRect(0, 0, w, h)
            for (const d of dots){
                const dx = mouse.x - d.ox
                const dy = mouse.y - d.oy
                const dist = Math.hypot(dx, dy)
                let tx = d.ox
                let ty = d.oy
                let glow = 0

                if (dist < RADIUS){
                    glow = 1 - dist / RADIUS
                    const push = glow * 14
                    tx -= (dx / dist) * push
                    ty -= (dy / dist) * push
                }

                d.x += (tx - d.x) * 0.15
                d.y += (ty - d.y) * 0.15

                ctx.beginPath()
                ctx.arc(d.x, d.y, 1.2 + glow * 1.8, 0, Math.PI * 2)
                ctx.fillStyle = glow > 0.02 ? `rgba(222, 185, 146, ${0.15 + glow * 0.85})` : BASE
                ctx.fill()
            }
        }

        function loop(){
            draw()
            raf = requestAnimationFrame(loop)
        }

        function onMove(e){
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        function onLeave(){
            mouse.x = mouse.y = -9999
        }

        resize()
        window.addEventListener('resize', resize)

        // static grid when there is no cursor to react to, or motion is reduced
        if (!reduced && !coarse){
            window.addEventListener('mousemove', onMove)
            document.addEventListener('mouseleave', onLeave)
            loop()
        }

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
        />
    )
}
