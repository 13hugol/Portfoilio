import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TypedText from './TypedText'

interface HeroSectionProps {
  data: {
    name: string
    title: string
    tagline: string
    location: string
    avatar: string
  }
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const titleTexts = [
    "AI & Full-Stack Developer",
    "Unity Game Developer", 
    "Computer Vision Engineer"
  ]

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative z-10">
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Terminal Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-matrix-green-primary font-mono text-sm">
            bhugol@portfolio:~$ echo "Welcome to the Matrix"
          </span>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Profile Photo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.img
                src={data.avatar}
                alt={data.name}
                className="w-72 h-72 rounded-full object-cover border-2 border-matrix-green-primary/30"
                style={{
                  boxShadow: '0 0 40px rgba(0, 255, 65, 0.6)',
                }}
                whileHover={{
                  boxShadow: '0 0 60px rgba(0, 255, 65, 0.8)',
                  scale: 1.05
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-matrix-green-primary/50"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Name and Title */}
          <div className="space-y-4">
            <motion.h1
              className="text-hero font-bold text-text-primary leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {data.name}
            </motion.h1>
            
            <motion.div
              className="text-h1 font-semibold text-matrix-green-primary font-mono min-h-[2.5rem] flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <TypedText 
                texts={titleTexts}
                speed={120}
                delay={2500}
              />
            </motion.div>
          </div>

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="inline-flex items-center space-x-2 bg-dark-surface border border-matrix-green-primary/30 rounded-sharp px-4 py-2 font-mono text-sm"
          >
            <span className="text-lg">🇳🇵</span>
            <span className="text-text-secondary">{data.location}</span>
          </motion.div>

          {/* Philosophy Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-dark-surface/50 border border-border-subtle rounded-medium p-6 font-mono text-sm text-text-secondary">
              <div className="flex items-start space-x-2">
                <span className="text-matrix-green-primary">$</span>
                <p>"{data.tagline}"</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 65, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="bg-matrix-green-primary text-pure-black px-8 py-3 rounded-small font-semibold font-mono text-sm shadow-matrix-glow"
            >
              view_projects --help
            </motion.button>
            
            <motion.a
              href="https://github.com/13hugol"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-matrix-green-primary text-matrix-green-primary px-8 py-3 rounded-small font-semibold font-mono text-sm hover:bg-matrix-green-primary hover:text-pure-black transition-colors duration-200"
            >
              github.com/13hugol
            </motion.a>
          </motion.div>

          {/* Terminal Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.3 }}
            className="text-text-tertiary font-mono text-xs"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-matrix-green-primary rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection