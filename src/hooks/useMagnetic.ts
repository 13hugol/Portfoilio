import { useRef, type RefObject } from 'react'

/**
 * Magnetic effect — pulls the element toward the pointer while it's within
 * `radius` of the element's center, springs back on leave.
 * Returns a ref to attach + the pointer handlers to spread on the element.
 *
 * Cheap: one rAF while hovering, none at rest. Cancelled on unmount.
 */
export function useMagnetic<T extends HTMLElement>(
	radius = 90,
	strength = 0.4,
): {
	ref: RefObject<T>
	onPointerMove: (e: React.PointerEvent<T>) => void
	onPointerLeave: (e: React.PointerEvent<T>) => void
} {
	const ref = useRef<T>(null)
	const raf = useRef<number | null>(null)
	const target = useRef({ x: 0, y: 0 })
	const current = useRef({ x: 0, y: 0 })

	const cancel = () => {
		if (raf.current != null) cancelAnimationFrame(raf.current)
		raf.current = null
	}

	const loop = () => {
		const el = ref.current
		if (!el) return
		current.current.x += (target.current.x - current.current.x) * 0.18
		current.current.y += (target.current.y - current.current.y) * 0.18
		el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`
		if (
			Math.abs(target.current.x - current.current.x) > 0.1 ||
			Math.abs(target.current.y - current.current.y) > 0.1
		) {
			raf.current = requestAnimationFrame(loop)
		} else {
			raf.current = null
		}
	}

	const onPointerMove = (e: React.PointerEvent<T>) => {
		const el = ref.current
		if (!el) return
		const r = el.getBoundingClientRect()
		const cx = r.left + r.width / 2
		const cy = r.top + r.height / 2
		const dx = e.clientX - cx
		const dy = e.clientY - cy
		const dist = Math.hypot(dx, dy)
		if (dist > radius + Math.max(r.width, r.height) / 2) {
			target.current = { x: 0, y: 0 }
		} else {
			target.current = { x: dx * strength, y: dy * strength }
		}
		if (raf.current == null) raf.current = requestAnimationFrame(loop)
	}

	const onPointerLeave = () => {
		target.current = { x: 0, y: 0 }
		if (ref.current && raf.current == null) {
			raf.current = requestAnimationFrame(loop)
		}
	}

	// Best-effort cleanup if the component unmounts mid-hover
	if (typeof window !== 'undefined') {
		window.addEventListener('beforeunload', cancel, { once: true })
	}

	return { ref, onPointerMove, onPointerLeave }
}
