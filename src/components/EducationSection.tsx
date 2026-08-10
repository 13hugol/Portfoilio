import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award } from 'lucide-react'
import { useTilt } from '../hooks/useTilt'

interface Certification {
	title: string
	description: string
}

interface Education {
	degree: string
	institution?: string
	field?: string
	year?: string
	studyFocus?: string[]
}

interface EducationSectionProps {
	education: Education
	certifications: Certification[]
	learningPath?: string[]
}

const EducationSection = ({ education, certifications, learningPath }: EducationSectionProps) => {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
	const tilt = useTilt<HTMLDivElement>(3)

	const container = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
	}
	const item = {
		hidden: { opacity: 0, y: 26 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const } },
	}

	const path = learningPath ?? ['Advanced ML & Deep Learning', 'Distributed Systems', 'Open Source Contribution']

	return (
		<section id="education" className="relative bg-ink py-24 md:py-32 border-t border-line">
			<div className="mx-auto max-w-[1320px] px-6 md:px-8">
				<motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
					{/* Header */}
					<motion.div variants={item} className="mb-14 md:mb-20">
						<div className="label label-faint mb-4">— Education / 005</div>
						<h2 className="editorial-h text-text text-h1 max-w-3xl">
							Study &amp; <span className="font-serif-h-i text-muted">credential</span>.
						</h2>
					</motion.div>

					<div className="grid lg:grid-cols-2 gap-6">
						{/* Education */}
						<motion.div
							variants={item}
							ref={tilt.ref}
							onPointerMove={tilt.onPointerMove}
							onPointerLeave={tilt.onPointerLeave}
							className="tilt-host"
						>
							<div className="tilt-card card p-7 md:p-8 h-full">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-11 h-11 border border-line flex items-center justify-center rounded-small">
										<GraduationCap className="w-5 h-5 text-text" />
									</div>
									<div className="label label-faint">Education</div>
								</div>
								<h3 className="font-display text-text text-xl mb-2">{education.degree}</h3>
								{education.institution && (
									<p className="font-mono text-sm text-muted">{education.institution}</p>
								)}
								{education.field && <p className="text-muted text-sm mt-1">{education.field}</p>}
								{education.year && <p className="label label-faint mt-2">{education.year}</p>}

								{education.studyFocus && education.studyFocus.length > 0 && (
									<div className="mt-6">
										<div className="label label-faint mb-3">Study focus</div>
										<div className="flex flex-wrap gap-1.5">
											{education.studyFocus.map((t) => (
												<span
													key={t}
													className="inline-block border border-line px-2 py-0.5 font-mono text-xs text-faint"
												>
													{t}
												</span>
											))}
										</div>
									</div>
								)}

								<div className="mt-8 pt-6 border-t border-line">
									<div className="label label-faint mb-3">Learning path · 2025</div>
									<ul className="space-y-2">
										{path.map((p) => (
											<li key={p} className="flex items-start gap-2 text-sm text-muted">
												<span className="text-faint mt-1">—</span>
												<span>{p}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</motion.div>

						{/* Certifications */}
						<motion.div
							variants={item}
							ref={tilt.ref}
							onPointerMove={tilt.onPointerMove}
							onPointerLeave={tilt.onPointerLeave}
							className="tilt-host"
						>
							<div className="tilt-card card p-7 md:p-8 h-full">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-11 h-11 border border-line flex items-center justify-center rounded-small">
										<Award className="w-5 h-5 text-text" />
									</div>
									<div className="label label-faint">Certifications</div>
								</div>

								{certifications.length > 0 && (
									<div className="space-y-5">
										{certifications.map((cert, i) => (
											<motion.div
												key={i}
												initial={{ opacity: 0, x: -16 }}
												animate={inView ? { opacity: 1, x: 0 } : {}}
												transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
												className="pb-5 border-b border-line last:border-0 last:pb-0"
											>
												<p className="font-display text-text text-base">{cert.title}</p>
												<p className="text-faint text-sm mt-1">{cert.description}</p>
											</motion.div>
										))}
									</div>
								)}

								<div className="mt-8 pt-6 border-t border-line">
									<p className="font-serif-h-i text-muted text-lg leading-relaxed">
										Continuously learning — the stack is a moving target, and so is the curiosity.
									</p>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

export default EducationSection
