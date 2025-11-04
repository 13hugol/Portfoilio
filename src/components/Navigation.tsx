import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Determine active section
      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact']
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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled 
          ? 'bg-near-black/95 backdrop-blur-lg border-b border-border-subtle' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="text-matrix-green-primary font-mono text-lg"
          whileHover={{ scale: 1.05 }}
        >
          bhugol@portfolio:~$
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-small text-sm font-medium font-mono transition-all duration-200 relative ${
                activeSection === item.id
                  ? 'bg-matrix-green-primary text-pure-black shadow-matrix-glow'
                  : 'bg-dark-surface/50 border border-border-subtle text-text-secondary hover:border-matrix-green-primary/50 hover:text-matrix-green-primary hover:bg-matrix-green-primary/10'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-small"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 65, 0.8)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('contact')}
          className="bg-matrix-green-primary text-pure-black px-6 py-3 rounded-small font-bold text-sm font-mono hover:bg-matrix-green-hover transition-all duration-200 shadow-matrix-glow border-2 border-matrix-green-primary/20 hover:border-matrix-green-primary"
        >
          Contact Me
        </motion.button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-text-secondary hover:text-text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-matrix-green-primary"
        style={{
          width: isScrolled ? '100%' : '0%',
          transition: 'width 0.1s ease-out'
        }}
      />
    </motion.nav>
  )
}

export default Navigation