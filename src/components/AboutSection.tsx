import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTilt } from '../hooks/useTilt'

interface AboutSectionProps {
	data: {
		summary: string
		philosophy: string
		about: string
	}
	achievements: Array<{
		title: string
		description: string
	}>
}

const AboutSection = ({ data, achievements }: AboutSectionProps) => {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
	const tilt = useTilt<HTMLDivElement>(4)

	const container = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
	}
	const item = {
		hidden: { opacity: 0, y: 26 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const } },
	}

	const bioText = data.about.includes('\n\n')
		? data.about.split('\n\n').slice(1).join(' ')
		: data.about

	return (
		<section id="about" className="relative bg-ink py-24 md:py-32">
			<div className="mx-auto max-w-[1320px] px-6 md:px-8">
				<motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
					{/* Header */}
					<motion.div variants={item} className="mb-14 md:mb-20">
						<div className="label label-faint mb-4">— About / 001</div>
						<h2 className="editorial-h text-text text-h1 max-w-3xl">
							Engineer of <span className="font-serif-h-i text-muted">systems</span>,<br />
							student of <span className="font-serif-h-i text-muted">surfaces</span>.
						</h2>
					</motion.div>

					<div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
						{/* Portrait + identity */}
						<motion.div variants={item} className="lg:col-span-5">
							<div ref={tilt.ref} onPointerMove={tilt.onPointerMove} onPointerLeave={tilt.onPointerLeave} className="tilt-host">
								<div className="tilt-card card overflow-hidden">
									<div className="aspect-[4/5] bg-surface relative overflow-hidden">
										<img
											src="/profile.png"
											alt="Bhugol Gautam"
											className="absolute inset-0 h-full w-full object-cover photo-mono"
											loading="lazy"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
										<div className="absolute bottom-0 left-0 right-0 p-5">
											<div className="label label-faint mb-1">Nepal · Kathmandu</div>
											<div className="font-display text-text text-lg">Bhugol Gautam</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Bio + achievements */}
						<motion.div variants={item} className="lg:col-span-7 flex flex-col">
							<p className="font-serif-h text-text text-2xl md:text-3xl leading-snug mb-6">
								{bioText}
							</p>
							<p className="font-serif-h-i text-muted text-lg leading-relaxed mb-10 max-w-xl">
								&ldquo;{data.philosophy}&rdquo;
							</p>

							<div className="label label-faint mb-4">Achievements</div>
							<div className="grid sm:grid-cols-2 gap-px bg-line border border-line mb-8">
								{achievements.map((ach) => (
									<div key={ach.title} className="bg-ink p-5">
										<div className="font-mono text-text text-sm">{ach.title}</div>
										<div className="text-faint text-xs mt-1">{ach.description}</div>
									</div>
								))}
							</div>

							{/* Stat counters */}
							<div className="grid grid-cols-3 gap-px bg-line border border-line">
								{[
									{ n: '185', l: 'Contributions' },
									{ n: '6', l: 'Major Projects' },
									{ n: '8', l: 'Repositories' },
								].map((s) => (
									<div key={s.l} className="bg-ink p-5 text-center">
										<div className="font-serif-h text-text text-4xl">{s.n}</div>
										<div className="label label-faint mt-2">{s.l}</div>
									</div>
								))}
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

export default AboutSection
