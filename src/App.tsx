import { useEffect, useRef, useState } from 'react'
import './index.css'
import portfolioData from './data/portfolio-data.json'
import { ErrorBoundary } from './components/ErrorBoundary'
import Navigation from './components/Navigation'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import EducationSection from './components/EducationSection'
import ContactSection from './components/ContactSection'
import Cursor from './components/Cursor'

const FRAME_COUNT = 286

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const imagesRef = useRef<HTMLImageElement[]>([])
	const [progress, setProgress] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const [loadingProgress, setLoadingProgress] = useState(0)

	// Canvas fades out across the last sliver; About enters at the bottom.
	const canvasOpacity = Math.max(0, Math.min(1, (0.975 - progress) / 0.095))
	const navVisible = progress >= 0.88

	const { personalInfo, bio, achievements, skills, projects, education, certifications } = portfolioData

	// Hide scrollbar while the sequence is playing.
	useEffect(() => {
		document.documentElement.classList.toggle('canvas-scrollbar-hidden', !navVisible)
		return () => document.documentElement.classList.remove('canvas-scrollbar-hidden')
	}, [navVisible])

	// ── 1. Preload frames (idle-friendly) ──────────────────────────────────
	useEffect(() => {
		let loadedCount = 0
		const finishOne = (i: number) => {
			loadedCount++
			setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100))
			if (i === 0) drawFrame(0)
			if (loadedCount === FRAME_COUNT) setLoaded(true)
		}
		const schedule = (i: number) => {
			const run = () => {
				const img = new Image()
				const idx = i.toString().padStart(3, '0')
				img.src = `/sequence/frame_${idx}_delay-0.045s.webp`
				img.onload = () => finishOne(i)
				img.onerror = () => finishOne(i)
				imagesRef.current[i] = img
			}
			const ric = (window as Window).requestIdleCallback as
				| ((cb: () => void) => number)
				| undefined
			if (ric) ric(run)
			else setTimeout(run, 0)
		}
		for (let i = 0; i < FRAME_COUNT; i++) schedule(i)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// ── 2. Draw frame (cover-fit) ──────────────────────────────────────────
	const drawFrame = (index: number) => {
		if (!canvasRef.current || !imagesRef.current[index]) return
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		const img = imagesRef.current[index]
		if (!img.complete || img.naturalWidth === 0) return
		const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
		const x = canvas.width / 2 - (img.width / 2) * scale
		const y = canvas.height / 2 - (img.height / 2) * scale
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
	}

	// ── 3. Scroll → frame ──────────────────────────────────────────────────
	useEffect(() => {
		let rafId = 0
		const onScroll = () => {
			if (!containerRef.current) return
			const { offsetTop: top, offsetHeight: height } = containerRef.current
			const scrollable = height - window.innerHeight
			const raw = window.scrollY - top
			const p = raw < 0 ? 0 : raw > scrollable ? 1 : raw / scrollable
			setProgress(p)
			const frameIdx = Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT))
			if (rafId) cancelAnimationFrame(rafId)
			rafId = requestAnimationFrame(() => drawFrame(frameIdx))
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', onScroll)
			if (rafId) cancelAnimationFrame(rafId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// ── 4. Resize ──────────────────────────────────────────────────────────
	useEffect(() => {
		const onResize = () => {
			if (!canvasRef.current) return
			canvasRef.current.width = window.innerWidth
			canvasRef.current.height = window.innerHeight
			drawFrame(Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT)))
		}
		window.addEventListener('resize', onResize)
		onResize()
		return () => window.removeEventListener('resize', onResize)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress])

	// Smooth fade-in/out window for a beat.
	const fade = (start: number, end: number, p: number) => {
		if (p < start || p > end) return 0
		const r = (end - start) * 0.3
		if (p < start + r) return (p - start) / r
		if (p > end - r) return (end - p) / r
		return 1
	}

	const bioText = bio.about.includes('\n\n')
		? bio.about.split('\n\n').slice(1).join(' ')
		: bio.about

	const skillFlat = Object.values(skills).flat().slice(0, 8)

	return (
		<ErrorBoundary>
			<div className="bg-ink text-text min-h-screen font-sans selection:bg-text selection:text-ink">
				<Cursor />
				<Navigation visible={navVisible} />

				{/* ── Loading overlay ─────────────────────────────────────────────── */}
				{!loaded && (
					<div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink">
						<div className="editorial-h text-text text-5xl md:text-6xl mb-3">
							{personalInfo.name.split(' ')[0]}
						</div>
						<div className="label label-faint mb-10">Loading Portfolio</div>
						<div className="w-64 h-px bg-line overflow-hidden">
							<div
								className="h-full bg-text transition-[width] duration-300 ease-out"
								style={{ width: `${loadingProgress}%` }}
							/>
						</div>
						<div className="mt-3 label label-faint">{loadingProgress}%</div>
					</div>
				)}

				{/* ── Canvas sequence — fixed overlay, plays while scrolling ─────── */}
				<div
					className="fixed inset-0 bg-ink"
					style={{
						zIndex: 15,
						opacity: canvasOpacity,
						pointerEvents: canvasOpacity > 0.01 ? 'auto' : 'none',
					}}
				>
					<canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
					{/* B&W editorial scrim — desaturates + lifts text contrast */}
					<div
						className="absolute inset-0 pointer-events-none"
						style={{
							background:
								'radial-gradient(circle at 50% 50%, transparent 35%, rgba(10,10,10,0.55) 100%)',
							mixBlendMode: 'multiply',
						}}
					/>
					<div className="absolute inset-0 bg-ink/35 pointer-events-none" />

					<div className="absolute inset-0 pointer-events-none flex items-center justify-center">
						{/* Beat 1 · 0–0.25 · Identity */}
						<div
							className="absolute w-full px-6 flex flex-col items-center justify-center text-center"
							style={{
								opacity: fade(0, 0.25, progress),
								transform: `translateY(${progress * 80}px) scale(${1 + progress * 0.06})`,
							}}
						>
							<div className="label label-faint mb-6">
								{personalInfo.location} · {personalInfo.website}
							</div>
							<h1 className="editorial-h text-text text-6xl md:text-8xl lg:text-9xl mb-5">
								{personalInfo.name}
							</h1>
							<p className="font-display text-lg md:text-2xl text-muted mb-4 tracking-wide">
								{personalInfo.title}
							</p>
							<p className="font-serif-h-i text-base md:text-lg text-faint max-w-xl">
								&ldquo;{personalInfo.tagline}&rdquo;
							</p>
							<div className="mt-16 flex flex-col items-center gap-3">
								<p className="label label-faint">Scroll to discover</p>
								<div className="w-px h-14 bg-gradient-to-b from-faint to-transparent" />
							</div>
						</div>

						{/* Beat 2 · 0.35–0.65 · Practice */}
						<div
							className="absolute w-full px-6 flex flex-col items-center justify-center text-center"
							style={{
								opacity: fade(0.35, 0.65, progress),
								transform: `translateY(${(progress - 0.5) * 80}px)`,
							}}
						>
							<div className="label label-faint mb-5">— Practice</div>
							<h2 className="editorial-h text-text text-4xl md:text-6xl lg:text-7xl mb-7">
								This is me
							</h2>
							<div className="max-w-2xl mb-7 border border-line bg-surface/70 backdrop-blur-md px-7 py-6">
								<p className="font-sans text-base md:text-lg text-text leading-relaxed">
									Jack of all master of none
								</p>
							</div>
							<div className="flex flex-wrap gap-2 justify-center max-w-xl">
								{skillFlat.map((s) => (
									<span
										key={s}
										className="px-3 py-1 border border-line label !text-text/80"
									>
										{s}
									</span>
								))}
							</div>
						</div>

						{/* Beat 3 · 0.75–1.0 · CTA */}
						<div
							className="absolute w-full px-6 flex flex-col items-center justify-center text-center"
							style={{
								opacity: fade(0.75, 1, progress),
								transform: `scale(${1 - (1 - progress) * 0.06})`,
							}}
						>
							<div className="label label-faint mb-5">— Let&apos;s begin</div>
							<h2 className="editorial-h text-text text-4xl md:text-6xl lg:text-7xl mb-5">
								Let&apos;s build the <span className="font-serif-h-i">future</span>.
							</h2>
							<p className="label label-faint mb-8">{personalInfo.email}</p>
							<div
								className="flex gap-3 flex-wrap justify-center"
								style={{ pointerEvents: fade(0.75, 1, progress) > 0.05 ? 'auto' : 'none' }}
							>
								<a
									href="#projects"
									className="px-8 py-4 bg-text text-ink font-sans font-semibold text-sm tracking-wide hover:bg-pure-white transition-colors"
								>
									View my work
								</a>
								<a
									href={`mailto:${personalInfo.email}`}
									className="px-8 py-4 border border-line text-text font-sans font-semibold text-sm tracking-wide hover:border-text hover:bg-surface transition-colors"
								>
									Get in touch
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* ── Scroll spacer — gives the fixed canvas its playback room ───── */}
				<div id="home" ref={containerRef} style={{ height: '800vh' }} />

				{/* ── Portfolio content ─────────────────────────────────────────── */}
				<div style={{ marginTop: '-20vh' }}>
					<AboutSection data={bio} achievements={achievements} />
					<SkillsSection skills={skills} />
					<ProjectsSection projects={projects} />

					<EducationSection education={education} certifications={certifications} />
					<ContactSection
						contactInfo={{
							name: personalInfo.name,
							email: personalInfo.email,
							website: personalInfo.website,
							github: personalInfo.github,
							linkedin: personalInfo.linkedin,
							location: personalInfo.location,
						}}
					/>
				</div>
			</div>
		</ErrorBoundary>
	)
}

export default App
