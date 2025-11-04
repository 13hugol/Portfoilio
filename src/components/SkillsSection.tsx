import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SkillsSectionProps {
  skills: Record<string, string[]>
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const categoryColors = {
    'Languages': 'border-matrix-green text-matrix-green',
    'Backend': 'border-nepali-lapis-blue text-nepali-lapis-blue',
    'Frontend': 'border-nepali-malachite-green text-nepali-malachite-green',
    'Real-Time': 'border-matrix-green text-matrix-green',
    'Cloud/DevOps': 'border-nepali-warm-gold text-nepali-warm-gold',
    'Databases': 'border-nepali-lapis-blue text-nepali-lapis-blue',
    'Game Dev': 'border-matrix-green text-matrix-green',
    'CV & TTS': 'border-nepali-malachite-green text-nepali-malachite-green',
    'Maps/Geo': 'border-nepali-warm-gold text-nepali-warm-gold',
  }

  return (
    <section id="skills" className="py-16 relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300FF41' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-h1 font-bold text-text-primary mb-4">
              Tech <span className="text-matrix-green">Stack</span>
            </h2>
            <div className="w-24 h-0.5 bg-matrix-green mx-auto mb-4"></div>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              A comprehensive toolkit spanning full-stack development, game development, and computer vision
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="bg-dark-surface border border-border-subtle rounded-medium p-6 hover:border-matrix-green/30 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                {/* Terminal Header */}
                <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-border-subtle">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs text-text-tertiary font-mono">terminal_@skills</span>
                </div>

                {/* Category Title */}
                <h3 className={`text-lg font-semibold mb-4 font-mono ${
                  categoryColors[category as keyof typeof categoryColors] || 'text-matrix-green'
                }`}>
                  $ {category}
                </h3>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: (index * 0.1) + (skillIndex * 0.05) 
                      }}
                      className="inline-block bg-matrix-green/10 border border-matrix-green/30 text-matrix-green px-3 py-1 rounded-small text-xs font-mono hover:bg-matrix-green/20 hover:border-matrix-green/50 transition-all duration-200 group-hover:scale-105"
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub Contribution Graph */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 bg-dark-surface border border-border-subtle rounded-medium p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-matrix-green font-mono text-sm">$</div>
              <h3 className="text-h2 font-semibold text-text-primary">git log --oneline --graph</h3>
            </div>
            
            <div className="space-y-2 font-mono text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <span className="text-matrix-green">*</span>
                <span>185 commits this year</span>
                <span className="text-text-tertiary">hash: 3.2k1a7b</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-matrix-green">*</span>
                <span>5 repositories created</span>
                <span className="text-text-tertiary">status: active</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-matrix-green">*</span>
                <span>Full-stack, Game Dev, Computer Vision</span>
                <span className="text-text-tertiary">domains: multiple</span>
              </div>
            </div>
          </motion.div>

          {/* Keywords Cloud */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'Node.js', 'Express', 'MongoDB', 'WebSockets', 'Socket.IO', 'Redis', 
                'JWT', 'REST APIs', 'Unity', 'C#', 'OpenCV', 'gTTS', 'Cloudinary', 
                'Vercel', 'GitHub Actions', 'Responsive UI', 'Geospatial Queries', 'GalliMaps'
              ].map((keyword, index) => (
                <motion.span
                  key={keyword}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="text-xs text-text-tertiary hover:text-matrix-green transition-colors duration-200 font-mono"
                  whileHover={{ scale: 1.1 }}
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection