import { useRef, type RefObject } from 'react'

/**
 * 3D tilt — pointer-driven rotation of a card around X/Y, capped at `max` deg.
 * Use on a `.tilt-host` parent with a `.tilt-card` child (see index.css).
 *
 * Returns handlers to spread on the host element. No rAF needed; transforms
 * are applied directly on pointermove and reset on leave via CSS transition.
 */
export function useTilt<T extends HTMLElement>(
	max = 6,
): {
	ref: RefObject<T>
	onPointerMove: (e: React.PointerEvent<T>) => void
	onPointerLeave: () => void
} {
	const ref = useRef<T>(null)

	const onPointerMove = (e: React.PointerEvent<T>) => {
		const el = ref.current
		if (!el) return
		const card = el.querySelector<HTMLElement>('.tilt-card')
		if (!card) return
		const r = el.getBoundingClientRect()
		const px = (e.clientX - r.left) / r.width  // 0..1
		const py = (e.clientY - r.top) / r.height  // 0..1
		const ry = (px - 0.5) * 2 * max            // yaw
		const rx = -(py - 0.5) * 2 * max           // pitch
		card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
	}

	const onPointerLeave = () => {
		const el = ref.current
		if (!el) return
		const card = el.querySelector<HTMLElement>('.tilt-card')
		if (!card) return
		card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)'
	}

	return { ref, onPointerMove, onPointerLeave }
}
