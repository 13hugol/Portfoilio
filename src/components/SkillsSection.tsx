import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTilt } from '../hooks/useTilt'

interface SkillsSectionProps {
	skills: Record<string, string[]>
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
	const tilt = useTilt<HTMLDivElement>(3)

	const container = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
	}
	const item = {
		hidden: { opacity: 0, y: 24 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const } },
	}

	const keywords = [
		'Node.js', 'Express', 'MongoDB', 'WebSockets', 'Socket.IO', 'Redis',
		'JWT', 'REST APIs', 'Unity', 'C#', 'OpenCV', 'gTTS', 'Cloudinary',
		'Vercel', 'GitHub Actions', 'Responsive UI', 'Geospatial Queries', 'GalliMaps', 'GSAP',
	]

	return (
		<section id="skills" className="relative bg-ink py-24 md:py-32 border-t border-line">
			<div className="mx-auto max-w-[1320px] px-6 md:px-8">
				<motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
					{/* Header */}
					<motion.div variants={item} className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
						<div>
							<div className="label label-faint mb-4">— Skills / 002</div>
							<h2 className="editorial-h text-text text-h1">
								The <span className="font-serif-h-i text-muted">toolkit</span>.
							</h2>
						</div>
						<p className="text-muted text-body max-w-md">
							A working stack spanning full-stack web, real-time systems, game development,
							and computer vision — chosen for what it ships, not what it signals.
						</p>
					</motion.div>

					{/* Skills grid */}
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
						{Object.entries(skills).map(([category, skillList]) => (
							<motion.div
								key={category}
								variants={item}
								ref={tilt.ref}
								onPointerMove={tilt.onPointerMove}
								onPointerLeave={tilt.onPointerLeave}
								className="tilt-host bg-ink p-6 group hover:bg-surface transition-colors duration-300"
							>
								<div className="tilt-card">
									<div className="flex items-baseline justify-between mb-5 pb-3 border-b border-line">
										<h3 className="font-display text-text text-base">{category}</h3>
										<span className="label label-faint">{String(skillList.length).padStart(2, '0')}</span>
									</div>
									<div className="flex flex-wrap gap-1.5">
										{skillList.map((skill) => (
											<span
												key={skill}
												className="inline-block border border-line px-2.5 py-1 font-mono text-xs text-muted group-hover:text-text group-hover:border-line-strong transition-colors duration-200"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Keyword marquee */}
					<motion.div variants={item} className="mt-16 overflow-hidden border-y border-line py-5">
						<div className="marquee-track">
							{[...keywords, ...keywords].map((k, i) => (
								<span key={i} className="font-serif-h-i text-faint text-2xl px-6 whitespace-nowrap">
									{k} <span className="text-line-strong">·</span>
								</span>
							))}
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}

export default SkillsSection
