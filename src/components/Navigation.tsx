import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMagnetic } from '../hooks/useMagnetic'

const Navigation = ({ visible = true }: { visible?: boolean }) => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [activeSection, setActiveSection] = useState('home')
	const [menuOpen, setMenuOpen] = useState(false)

	const cta = useMagnetic<HTMLButtonElement>(70, 0.35)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
			const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact']
			const scrollPosition = window.scrollY + 100
			for (const section of sections) {
				const element = document.getElementById(section)
				if (element) {
					const { offsetTop, offsetHeight } = element
					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						setActiveSection(section)
						break
					}
				}
			}
		}
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const navItems = [
		{ id: 'about', label: 'About' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'education', label: 'Education' },
		{ id: 'contact', label: 'Contact' },
	]

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId)
		if (element) element.scrollIntoView({ behavior: 'smooth' })
		setMenuOpen(false)
	}

	return (
		<AnimatePresence>
			{visible && (
				<motion.nav
					key="nav"
					initial={{ y: -80, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -80, opacity: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					className={`fixed top-0 left-0 right-0 z-[9999] h-16 transition-colors duration-300 ${
						isScrolled
							? 'bg-ink/85 backdrop-blur-md border-b border-line'
							: 'bg-transparent border-b border-transparent'
					}`}
				>
					<div className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-6 md:px-8">
						{/* Logo */}
						<motion.button
							initial={{ opacity: 0, x: -16 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							onClick={() => scrollToSection('home')}
							className="focus-ring rounded-small"
						>
							<span className="editorial-h text-text text-xl md:text-2xl">
								Bhugol <span className="font-serif-h-i text-muted">Gautam</span>
							</span>
						</motion.button>

						{/* Desktop nav */}
						<div className="hidden md:flex items-center gap-1">
							{navItems.map((item, index) => (
								<motion.button
									key={item.id}
									initial={{ opacity: 0, y: -16 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 * index + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
									onClick={() => scrollToSection(item.id)}
									className={`relative px-3 py-2 rounded-small transition-colors duration-200 focus-ring ${
										activeSection === item.id ? 'text-text' : 'text-muted hover:text-text'
									}`}
								>
									{/* the one terminal nod — a faint › on active */}
									{activeSection === item.id && (
										<span className="label !text-text absolute -left-0 top-1/2 -translate-y-1/2 text-[0.5rem]">
											›
										</span>
									)}
									<span className="label !tracking-[0.18em]">{item.label}</span>
									{activeSection === item.id && (
										<motion.div
											layoutId="nav-underline"
											className="absolute -bottom-0 left-3 right-3 h-px bg-text"
											transition={{ type: 'spring', stiffness: 400, damping: 32 }}
										/>
									)}
								</motion.button>
							))}
						</div>

						{/* CTA */}
						<motion.button
							ref={cta.ref}
							onPointerMove={cta.onPointerMove}
							onPointerLeave={cta.onPointerLeave}
							initial={{ opacity: 0, x: 16 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.8, duration: 0.5 }}
							whileTap={{ scale: 0.96 }}
							onClick={() => scrollToSection('contact')}
							className="hidden md:inline-flex bg-text text-ink px-5 py-2.5 text-sm font-sans font-semibold tracking-wide hover:bg-pure-white transition-colors focus-ring rounded-small"
						>
							Get in touch
						</motion.button>

						{/* Mobile toggle */}
						<button
							className="md:hidden text-text focus-ring rounded-small"
							onClick={() => setMenuOpen((o) => !o)}
							aria-label="Menu"
							aria-expanded={menuOpen}
						>
							<div className="w-6 flex flex-col gap-1.5">
								<span
									className={`block h-px bg-current transition-transform duration-300 ${
										menuOpen ? 'translate-y-[7px] rotate-45' : ''
									}`}
								/>
								<span
									className={`block h-px bg-current transition-opacity duration-300 ${
										menuOpen ? 'opacity-0' : 'opacity-100'
									}`}
								/>
								<span
									className={`block h-px bg-current transition-transform duration-300 ${
										menuOpen ? '-translate-y-[7px] -rotate-45' : ''
									}`}
								/>
							</div>
						</button>
					</div>

					{/* Mobile drawer */}
					<AnimatePresence>
						{menuOpen && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.3 }}
								className="md:hidden overflow-hidden bg-ink/95 backdrop-blur-md border-b border-line"
							>
								<div className="px-6 py-4 flex flex-col">
									{navItems.map((item) => (
										<button
											key={item.id}
											onClick={() => scrollToSection(item.id)}
											className={`text-left py-3 border-b border-line/60 ${
												activeSection === item.id ? 'text-text' : 'text-muted'
											}`}
										>
											<span className="label !tracking-[0.18em]">{item.label}</span>
										</button>
									))}
									<button
										onClick={() => scrollToSection('contact')}
										className="mt-4 bg-text text-ink py-3 font-sans font-semibold text-sm tracking-wide rounded-small"
									>
						Get in touch
									</button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Scroll progress — hairline */}
					<motion.div
						className="absolute bottom-0 left-0 h-px bg-text"
						initial={{ width: '0%' }}
						animate={{ width: isScrolled ? '100%' : '0%' }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
					/>
				</motion.nav>
			)}
		</AnimatePresence>
	)
}

export default Navigation
