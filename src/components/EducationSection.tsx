import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface EducationSectionProps {
  education: {
    degree: string
  }
  certifications: Array<{
    title: string
    description: string
  }>
}

const EducationSection = ({ education, certifications }: EducationSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="education" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-h1 font-bold text-text-primary mb-4">
              Education & <span className="text-matrix-green">Certifications</span>
            </h2>
            <div className="w-24 h-0.5 bg-matrix-green mx-auto mb-4"></div>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              Academic background and professional certifications
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div variants={itemVariants} className="bg-dark-surface border border-border-subtle rounded-medium p-6">
              <div className="flex items-start space-x-3 mb-6">
                <div className="text-matrix-green font-mono text-sm">$</div>
                <h3 className="text-h2 font-semibold text-text-primary">cat education.txt</h3>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-2 border-matrix-green/30 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">🎓</span>
                    <h4 className="text-lg font-semibold text-text-primary">{education.degree}</h4>
                  </div>
                  <p className="text-text-secondary text-sm">
                    Currently pursuing undergraduate studies with focus on technology and innovation
                  </p>
                </div>
              </div>

              {/* Study Areas */}
              <div className="mt-6 pt-4 border-t border-border-subtle">
                <h5 className="text-sm font-semibold text-text-primary mb-3 font-mono">Study Focus</h5>
                <div className="flex flex-wrap gap-2">
                  {['Software Engineering', 'Computer Science', 'Technology Innovation'].map((area) => (
                    <span
                      key={area}
                      className="inline-block bg-matrix-green/10 border border-matrix-green/30 text-matrix-green px-2 py-1 rounded-small text-xs font-mono"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div variants={itemVariants} className="bg-dark-surface border border-border-subtle rounded-medium p-6">
              <div className="flex items-start space-x-3 mb-6">
                <div className="text-matrix-green font-mono text-sm">$</div>
                <h3 className="text-h2 font-semibold text-text-primary">ls certifications/</h3>
              </div>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-3 p-3 rounded-sharp border border-border-subtle hover:border-matrix-green/30 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-2 h-2 bg-nepali-warm-gold rounded-full mt-2"></div>
                    <div>
                      <div className="font-mono text-sm text-text-primary">
                        {cert.title}
                      </div>
                      <div className="text-xs text-text-tertiary">
                        {cert.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Achievement Timeline */}
              <div className="mt-6 pt-4 border-t border-border-subtle">
                <h5 className="text-sm font-semibold text-text-primary mb-3 font-mono">Learning Path</h5>
                <div className="space-y-2 text-sm text-text-secondary font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="text-matrix-green">2025</span>
                    <span>OpenCV Computer Vision Certification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-matrix-green">2025</span>
                    <span>Full-Stack Development Track</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-matrix-green">2025</span>
                    <span>Unity Game Development</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Terminal Style Summary */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 bg-dark-surface/50 border border-border-subtle rounded-medium p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-matrix-green font-mono text-sm">$</div>
              <h3 className="text-h2 font-semibold text-text-primary">summary --education</h3>
            </div>
            <div className="font-mono text-sm text-text-secondary space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-matrix-green">✓</span>
                <span>Active learner with continuous skill development</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-matrix-green">✓</span>
                <span>Self-taught in multiple technology domains</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-matrix-green">✓</span>
                <span>Practical experience through project development</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-matrix-green">✓</span>
                <span>Open to learning and adapting to new technologies</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default EducationSection