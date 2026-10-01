import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Fades and slides in every `[data-reveal]` element inside `ref` as it scrolls into view.
export default function useScrollReveal(ref){
    useLayoutEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const ctx = gsap.context(() => {
            gsap.set('[data-reveal]', { opacity: 0, y: 32 })
            ScrollTrigger.batch('[data-reveal]', {
                start: 'top bottom',
                once: true,
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: 0.1,
                    clearProps: 'transform,opacity',
                }),
            })
        }, ref)

        return () => ctx.revert()
    }, [ref])
}
