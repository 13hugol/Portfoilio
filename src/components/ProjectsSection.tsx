import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, Github, Plus, Minus } from 'lucide-react'

interface Project {
	id: string
	title: string
	subtitle: string
	year: string
	liveUrl?: string
	repoUrl?: string
	description: string
	techStack: string[]
	features: string[]
	highlights?: string
	performance?: string
}

interface ProjectsSectionProps {
	projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
	const [open, setOpen] = useState<string | null>(null)
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 })

	const container = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	}
	const item = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] as const } },
	}

	const toggle = (id: string) => setOpen((cur) => (cur === id ? null : id))

	return (
		<section id="projects" className="relative bg-ink py-24 md:py-32 border-t border-line">
			<div className="mx-auto max-w-[1320px] px-6 md:px-8">
				<motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
					{/* Header */}
					<motion.div variants={item} className="mb-16 md:mb-24">
						<div className="grid lg:grid-cols-12 gap-6 items-end">
							<div className="lg:col-span-8">
								<div className="label label-faint mb-4">— Selected work / 004</div>
								<h2 className="editorial-h text-text text-h1">
									Things I have <span className="font-serif-h-i text-muted">built</span>.
								</h2>
							</div>
							<div className="lg:col-span-4 lg:text-right">
								<p className="text-muted text-body max-w-sm lg:ml-auto">
									Six shipped projects across full-stack web, real-time systems, games,
									and computer vision.
								</p>
							</div>
						</div>
						<div className="rule mt-10" />
					</motion.div>

					{/* Editorial alternating spreads */}
					<div className="divide-y divide-line">
						{projects.map((p, i) => {
							const isOpen = open === p.id
							const flip = i % 2 === 1
							return (
								<motion.article
									key={p.id}
									variants={item}
									className="group py-10 md:py-14"
								>
									<div className={`grid lg:grid-cols-12 gap-6 lg:gap-10 items-start ${flip ? 'lg:[direction:rtl]' : ''}`}>
										{/* Oversized index numeral */}
										<div className="lg:col-span-2 lg:[direction:ltr]">
											<div className="font-serif-h text-faint text-7xl md:text-8xl leading-none">
												{String(i + 1).padStart(2, '0')}
											</div>
											<div className="label label-faint mt-2">{p.year}</div>
										</div>

										{/* Title + meta */}
										<div className="lg:col-span-6 lg:[direction:ltr]">
											<div className="flex items-baseline gap-3 mb-2">
												<h3 className="font-display text-text text-2xl md:text-4xl">{p.title}</h3>
												<ArrowUpRight className="w-5 h-5 text-faint group-hover:text-text transition-colors" />
											</div>
											<p className="font-serif-h-i text-muted text-lg md:text-xl mb-5">{p.subtitle}</p>
											<p className="text-muted text-body leading-relaxed max-w-xl">{p.description}</p>

											<div className="flex flex-wrap gap-2 mt-6">
												{p.liveUrl && (
													<a
														href={p.liveUrl.startsWith('http') ? p.liveUrl : `https://${p.liveUrl}`}
														target="_blank"
														rel="noopener noreferrer"
														data-cursor="hover"
														className="inline-flex items-center gap-2 bg-text text-ink px-4 py-2 font-sans text-sm font-semibold hover:bg-pure-white transition-colors rounded-small"
													>
														Live <ArrowUpRight className="w-3.5 h-3.5" />
													</a>
												)}
												{p.repoUrl && (
													<a
														href={p.repoUrl.startsWith('http') ? p.repoUrl : `https://${p.repoUrl}`}
														target="_blank"
														rel="noopener noreferrer"
														data-cursor="hover"
														className="inline-flex items-center gap-2 border border-line text-text px-4 py-2 font-sans text-sm font-semibold hover:border-text transition-colors rounded-small"
													>
														<Github className="w-3.5 h-3.5" /> Source
													</a>
												)}
											</div>
										</div>

										{/* Spec rail */}
										<div className="lg:col-span-4 lg:[direction:ltr]">
											<div className="border border-line bg-surface p-5">
												<div className="label label-faint mb-3">Stack</div>
												<div className="flex flex-wrap gap-1.5 mb-5">
													{p.techStack.map((t) => (
														<span
															key={t}
															className="inline-block border border-line px-2 py-0.5 font-mono text-xs text-muted"
														>
															{t}
														</span>
													))}
												</div>
												<div className="grid grid-cols-2 gap-px bg-line border border-line">
													<div className="bg-surface px-3 py-2">
														<div className="label label-faint">Features</div>
														<div className="font-serif-h text-text text-2xl mt-1">{p.features.length}</div>
													</div>
													<div className="bg-surface px-3 py-2">
														<div className="label label-faint">Domain</div>
														<div className="font-mono text-text text-xs mt-2 truncate">
															{p.techStack[0] ?? '—'}
														</div>
													</div>
												</div>

												<button
													onClick={() => toggle(p.id)}
													data-cursor="hover"
													className="mt-4 w-full flex items-center justify-between font-mono text-xs text-muted hover:text-text transition-colors focus-ring rounded-small py-1"
												>
													<span>{isOpen ? 'Hide detail' : 'Read detail'}</span>
													{isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
												</button>
											</div>
										</div>
									</div>

									{/* Inline detail drawer */}
									<AnimatePresence initial={false}>
										{isOpen && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: 'auto', opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
												className="overflow-hidden"
											>
												<div className="grid lg:grid-cols-12 gap-6 lg:gap-10 pt-8 mt-2 border-t border-line/60">
													<div className="lg:col-start-3 lg:col-span-6">
														<div className="label label-faint mb-3">Features</div>
														<ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
															{p.features.map((f, fi) => (
																<li key={fi} className="flex items-start gap-2 text-sm text-muted">
																	<span className="font-mono text-faint text-[0.6rem] mt-1.5">{String(fi + 1).padStart(2, '0')}</span>
																	<span>{f}</span>
																</li>
															))}
														</ul>
													</div>
													<div className="lg:col-span-4">
														{p.highlights && (
															<>
																<div className="label label-faint mb-3">Highlights</div>
																<p className="font-serif-h-i text-text text-lg leading-relaxed border-l border-line-strong pl-4 mb-5">
																	{p.highlights}
																</p>
															</>
														)}
														{p.performance && (
															<>
																<div className="label label-faint mb-2">Performance</div>
																<p className="text-sm text-muted leading-relaxed">{p.performance}</p>
															</>
														)}
													</div>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.article>
							)
						})}
					</div>

					{/* Footer stat strip */}
					<motion.div variants={item} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
						{[
							{ n: String(projects.length), l: 'Major Projects' },
							{ n: '25+', l: 'Technologies' },
							{ n: '4', l: 'Domains' },
							{ n: '2025', l: 'Active Year' },
						].map((s) => (
							<div key={s.l} className="bg-ink p-6 text-center">
								<div className="font-serif-h text-text text-4xl">{s.n}</div>
								<div className="label label-faint mt-2">{s.l}</div>
							</div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
