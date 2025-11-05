import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[9999] h-16 transition-all duration-300 ${
        isScrolled 
          ? 'bg-near-black/95 backdrop-blur-lg border-b border-border-subtle' 
          : 'bg-near-black/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-matrix-green-primary font-mono text-lg relative group cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative z-10">bhugol@portfolio:~$</span>
          <motion.span
            className="absolute -inset-1 bg-matrix-green-primary/20 rounded blur-sm opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-3 relative">
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.1 * index + 0.3,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.button
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-small text-sm font-medium font-mono transition-all duration-200 overflow-hidden ${
                  activeSection === item.id
                    ? 'text-pure-black'
                    : 'text-text-secondary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active background with glow */}
                <AnimatePresence>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-matrix-green-primary rounded-small"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 30 
                      }}
                    >
                      {/* Pulsing glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-matrix-green-primary rounded-small"
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(0, 255, 65, 0.5)',
                            '0 0 30px rgba(0, 255, 65, 0.8)',
                            '0 0 20px rgba(0, 255, 65, 0.5)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover background */}
                <AnimatePresence>
                  {hoveredItem === item.id && activeSection !== item.id && (
                    <motion.div
                      className="absolute inset-0 bg-matrix-green-primary/10 border border-matrix-green-primary/50 rounded-small"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                {/* Default background */}
                {activeSection !== item.id && hoveredItem !== item.id && (
                  <div className="absolute inset-0 bg-dark-surface/50 border border-border-subtle rounded-small" />
                )}

                {/* Text */}
                <span className="relative z-10">{item.label}</span>

                {/* Scanning line effect on hover */}
                {hoveredItem === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-matrix-green-primary/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 30px rgba(0, 255, 65, 0.8)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('contact')}
          className="relative bg-matrix-green-primary text-pure-black px-6 py-3 rounded-small font-bold text-sm font-mono transition-all duration-200 border-2 border-matrix-green-primary/20 hover:border-matrix-green-primary overflow-hidden group"
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-matrix-green-primary via-matrix-green-hover to-matrix-green-primary"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Button text */}
          <span className="relative z-10 flex items-center gap-2">
            Contact Me
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              →
            </motion.span>
          </span>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 255, 65, 0.3)',
                '0 0 40px rgba(0, 255, 65, 0.6)',
                '0 0 20px rgba(0, 255, 65, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
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

      {/* Scroll Progress Bar with glow */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-matrix-green-primary shadow-[0_0_10px_rgba(0,255,65,0.8)]"
        initial={{ width: '0%' }}
        animate={{ 
          width: isScrolled ? '100%' : '0%',
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Animated shimmer effect */}
        {isScrolled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
      </motion.div>
    </motion.nav>
  )
}

export default Navigation