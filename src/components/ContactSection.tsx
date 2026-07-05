import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Github, Linkedin, Globe, MapPin, ArrowUpRight, Clock } from 'lucide-react'
import { useTilt } from '../hooks/useTilt'

interface ContactInfo {
	name: string
	email: string
	website: string
	github: string
	linkedin: string
	location: string
}

interface ContactSectionProps {
	contactInfo: ContactInfo
}

const ContactSection = ({ contactInfo }: ContactSectionProps) => {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
	const tilt = useTilt<HTMLDivElement>(3)

	const container = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	}
	const item = {
		hidden: { opacity: 0, y: 24 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const } },
	}

	const contactMethods = [
		{ icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
		{
			icon: Github,
			label: 'GitHub',
			value: contactInfo.github.replace(/^https?:\/\//, '').replace(/^www\./, ''),
			href: contactInfo.github.startsWith('http') ? contactInfo.github : `https://${contactInfo.github}`,
		},
		{
			icon: Linkedin,
			label: 'LinkedIn',
			value: contactInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/'),
			href: contactInfo.linkedin.startsWith('http') ? contactInfo.linkedin : `https://${contactInfo.linkedin}`,
		},
		{
			icon: Globe,
			label: 'Website',
			value: contactInfo.website.replace(/^https?:\/\//, '').replace(/^www\./, ''),
			href: contactInfo.website.startsWith('http') ? contactInfo.website : `https://${contactInfo.website}`,
		},
	]

	return (
		<section id="contact" className="relative bg-ink py-24 md:py-32 border-t border-line">
			<div className="mx-auto max-w-[1320px] px-6 md:px-8">
				<motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
					{/* Header */}
					<motion.div variants={item} className="mb-14 md:mb-20">
						<div className="label label-faint mb-4">— Contact / 006</div>
						<h2 className="editorial-h text-text text-h1 max-w-3xl">
							Let&apos;s build the <span className="font-serif-h-i text-muted">future</span>.
						</h2>
					</motion.div>

					{/* Contact cards */}
					<motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line mb-6">
						{contactMethods.map((m) => {
							const Icon = m.icon
							return (
								<div
									key={m.label}
									ref={tilt.ref}
									onPointerMove={tilt.onPointerMove}
									onPointerLeave={tilt.onPointerLeave}
									className="tilt-host"
								>
									<a
										href={m.href}
										target={m.label === 'Email' ? undefined : '_blank'}
										rel={m.label === 'Email' ? undefined : 'noopener noreferrer'}
										data-cursor="hover"
										className="tilt-card group block bg-ink p-6 h-full hover:bg-surface transition-colors duration-300"
									>
										<div className="flex items-start justify-between mb-8">
											<div className="w-10 h-10 border border-line flex items-center justify-center rounded-small group-hover:border-line-strong transition-colors">
												<Icon className="w-4 h-4 text-text" />
											</div>
											<ArrowUpRight className="w-4 h-4 text-faint opacity-0 group-hover:opacity-100 transition-opacity" />
										</div>
										<div className="label label-faint mb-1">{m.label}</div>
										<div className="font-mono text-text text-sm break-all">{m.value}</div>
									</a>
								</div>
							)
						})}
					</motion.div>

					{/* Location + response time */}
					<div className="grid md:grid-cols-2 gap-px bg-line border border-line">
						<motion.div variants={item} className="bg-ink p-6 flex items-start gap-4">
							<div className="w-10 h-10 border border-line flex items-center justify-center rounded-small flex-shrink-0">
								<MapPin className="w-4 h-4 text-text" />
							</div>
							<div>
								<div className="label label-faint mb-1">Location</div>
								<p className="font-display text-text">{contactInfo.location}</p>
								<p className="text-muted text-sm mt-1">Open to remote &amp; on-site opportunities</p>
							</div>
						</motion.div>
						<motion.div variants={item} className="bg-ink p-6 flex items-start gap-4">
							<div className="w-10 h-10 border border-line flex items-center justify-center rounded-small flex-shrink-0">
								<Clock className="w-4 h-4 text-text" />
							</div>
							<div>
								<div className="label label-faint mb-1">Response time</div>
								<p className="font-display text-text">Within 24 hours</p>
								<p className="text-muted text-sm mt-1">Usually much faster than that</p>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>

			{/* Footer */}
			<motion.footer
				initial={{ opacity: 0 }}
				animate={inView ? { opacity: 1 } : {}}
				transition={{ delay: 0.8 }}
				className="mt-24 border-t border-line"
			>
				<div className="mx-auto max-w-[1320px] px-6 md:px-8 py-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
					<div>
						<div className="editorial-h text-text text-4xl md:text-5xl">
							Bhugol <span className="font-serif-h-i text-muted">Gautam</span>
						</div>
						<div className="label label-faint mt-3">
							© {new Date().getFullYear()} · All rights reserved
						</div>
					</div>
					<div className="label label-faint text-right">
						Built with React, TypeScript &amp; Three.js
					</div>
				</div>
			</motion.footer>
		</section>
	)
}

export default ContactSection
