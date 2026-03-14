import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award } from 'lucide-react'

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
}

const EducationSection = ({ education, certifications }: EducationSectionProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="education" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-h1 font-bold text-text-primary mb-4">
              Education &amp; <span className="text-matrix-green">Certifications</span>
            </h2>
            <div className="w-24 h-0.5 bg-matrix-green mx-auto mb-4" />
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              Academic background and professional development
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education block */}
            <motion.div
              variants={itemVariants}
              className="bg-dark-surface border border-border-subtle rounded-medium overflow-hidden"
            >
              <div className="bg-hover-surface border-b border-border-subtle px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs text-text-tertiary font-mono">cat education.txt</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-nepali-lapis-blue/20 border border-nepali-lapis-blue/40 rounded-medium flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-nepali-lapis-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{education.degree}</h3>
                    {education.institution && (
                      <p className="text-matrix-green text-sm font-mono">{education.institution}</p>
                    )}
                    {education.field && (
                      <p className="text-text-secondary text-sm">{education.field}</p>
                    )}
                    {education.year && (
                      <p className="text-text-tertiary text-xs font-mono mt-1">{education.year}</p>
                    )}
                  </div>
                </div>

                {education.studyFocus && education.studyFocus.length > 0 && (
                  <div>
                    <p className="text-xs text-matrix-green font-mono mb-2">// Study Focus</p>
                    <div className="flex flex-wrap gap-2">
                      {education.studyFocus.map(topic => (
                        <span
                          key={topic}
                          className="inline-block bg-nepali-lapis-blue/10 border border-nepali-lapis-blue/30 text-nepali-lapis-blue px-2 py-1 rounded-small text-xs font-mono"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Learning path */}
                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <p className="text-xs text-text-tertiary font-mono mb-3">// Learning Path 2025</p>
                  <div className="space-y-2">
                    {[
                      'Advanced ML &amp; Deep Learning',
                      'Distributed Systems',
                      'Open Source Contributions',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <span className="text-matrix-green text-xs">▸</span>
                        <span
                          className="text-sm text-text-secondary"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications block */}
            <motion.div
              variants={itemVariants}
              className="bg-dark-surface border border-border-subtle rounded-medium overflow-hidden"
            >
              <div className="bg-hover-surface border-b border-border-subtle px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs text-text-tertiary font-mono">ls certifications/</span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-3 group"
                    >
                      <span className="text-nepali-warm-gold mt-1 flex-shrink-0">●</span>
                      <div>
                        <div className="flex items-start space-x-2">
                          <Award className="w-4 h-4 text-nepali-warm-gold mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-semibold text-text-primary group-hover:text-matrix-green transition-colors">
                            {cert.title}
                          </p>
                        </div>
                        <p className="text-xs text-text-tertiary mt-1 ml-6">{cert.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Summary terminal block */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-dark-surface border border-border-subtle rounded-medium p-6 font-mono text-sm"
          >
            <p className="text-matrix-green mb-2">$ echo "education_summary"</p>
            <div className="pl-4 space-y-1 text-text-secondary">
              <p>
                <span className="text-matrix-green">✓</span> {education.degree}
              </p>
              {certifications.map((cert, i) => (
                <p key={i}>
                  <span className="text-matrix-green">✓</span> {cert.title}
                </p>
              ))}
              <p>
                <span className="text-matrix-green">✓</span> Continuously learning and upskilling
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default EducationSection
