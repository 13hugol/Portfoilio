import { useEffect, useRef, useState } from 'react'

/**
 * Custom cursor — a small dot that tracks the pointer instantly, and a larger
 * ring that lerps toward it. Over elements marked `data-cursor="hover"` (or
 * any a/button), the ring grows and the dot hides — an invert-blend reads as
 * "negative space" against the B&W page.
 *
 * Hidden on touch / no-pointer devices. One rAF while moving.
 */
export default function Cursor() {
	const dotRef = useRef<HTMLDivElement>(null)
	const ringRef = useRef<HTMLDivElement>(null)
	const [enabled, setEnabled] = useState(false)

	useEffect(() => {
		const fine = window.matchMedia('(pointer: fine)').matches
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (!fine || reduced) return
		setEnabled(true)
		document.documentElement.classList.add('cursor-host')

		const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
		const ring = { x: mouse.x, y: mouse.y }
		let hovering = false
		let raf = 0

		const onMove = (e: PointerEvent) => {
			mouse.x = e.clientX
			mouse.y = e.clientY
			if (dotRef.current) {
				dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
			}
			const t = e.target as HTMLElement | null
			const hover = !!t?.closest('a, button, [data-cursor="hover"], input, textarea, select')
			if (hover !== hovering) {
				hovering = hover
				if (ringRef.current) ringRef.current.dataset.hover = hover ? '1' : '0'
				if (dotRef.current) dotRef.current.dataset.hover = hover ? '1' : '0'
			}
		}

		const loop = () => {
			ring.x += (mouse.x - ring.x) * 0.18
			ring.y += (mouse.y - ring.y) * 0.18
			if (ringRef.current) {
				ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
			}
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)

		window.addEventListener('pointermove', onMove, { passive: true })
		return () => {
			window.removeEventListener('pointermove', onMove)
			cancelAnimationFrame(raf)
			document.documentElement.classList.remove('cursor-host')
		}
	}, [])

	if (!enabled) return null

	return (
		<>
			<div
				ref={dotRef}
				aria-hidden
				className="pointer-events-none fixed left-0 top-0 z-[9998] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-text transition-opacity duration-200 data-[hover=1]:opacity-0"
			/>
			<div
				ref={ringRef}
				aria-hidden
				className="pointer-events-none fixed left-0 top-0 z-[9998] -ml-[16px] -mt-[16px] h-8 w-8 rounded-full border border-text/50 transition-[width,height,margin,opacity,border-color] duration-200 data-[hover=1]:h-12 data-[hover=1]:w-12 data-[hover=1]:-ml-[24px] data-[hover=1]:-mt-[24px] data-[hover=1]:border-text/90"
				style={{ mixBlendMode: 'difference' }}
			/>
		</>
	)
}
