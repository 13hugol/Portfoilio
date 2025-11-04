import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react'

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
  highlights: string
  performance?: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  return (
    <section id="projects" className="py-16 relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300FF41' fill-opacity='0.1'%3E%3Cpath d='M25 25c13.807 0 25-11.193 25-25S38.807 0 25 0 0 11.193 0 25s11.193 25 25 25z'/%3E%3C/g%3E%3C/svg%3E")`,
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
              Featured <span className="text-matrix-green">Projects</span>
            </h2>
            <div className="w-24 h-0.5 bg-matrix-green mx-auto mb-4"></div>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              A showcase of full-stack applications, games, and computer vision systems
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-dark-surface border border-border-subtle rounded-medium overflow-hidden hover:shadow-card-hover transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                {/* Terminal Window Header */}
                <div className="bg-hover-surface border-b border-border-subtle px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-text-tertiary font-mono">
                        {project.id}@terminal
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-text-tertiary font-mono">{project.year}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start space-x-3 mb-2">
                        <div className="text-matrix-green font-mono text-sm mt-1">$</div>
                        <div>
                          <h3 className="text-h2 font-semibold text-text-primary mb-1">
                            {project.title}
                          </h3>
                          <p className="text-body text-text-secondary mb-3">
                            {project.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-body text-text-secondary leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-block bg-matrix-green/10 border border-matrix-green/30 text-matrix-green px-2 py-1 rounded-small text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {project.liveUrl && (
                          <motion.a
                            href={`https://${project.liveUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center space-x-2 bg-matrix-green text-pure-black px-4 py-2 rounded-small font-semibold text-sm font-mono hover:bg-matrix-green-hover transition-colors duration-200"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </motion.a>
                        )}

                        {project.repoUrl && (
                          <motion.a
                            href={`https://${project.repoUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center space-x-2 border-2 border-matrix-green text-matrix-green px-4 py-2 rounded-small font-semibold text-sm font-mono hover:bg-matrix-green hover:text-pure-black transition-colors duration-200"
                          >
                            <Github className="w-4 h-4" />
                            <span>Source Code</span>
                          </motion.a>
                        )}

                        <motion.button
                          onClick={() => toggleProject(project.id)}
                          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                          className={`inline-flex items-center space-x-2 px-5 py-3 rounded-small font-bold text-sm font-mono transition-all duration-200 ${
                            expandedProject === project.id
                              ? 'bg-matrix-green text-pure-black shadow-matrix-glow border-2 border-matrix-green/20'
                              : 'bg-dark-surface border-2 border-matrix-green/50 text-matrix-green hover:bg-matrix-green/10 hover:border-matrix-green'
                          }`}
                        >
                          <span>{expandedProject === project.id ? 'Hide Details' : 'View Details'}</span>
                          {expandedProject === project.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-border-subtle"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Features */}
                          <div>
                            <h4 className="text-lg font-semibold text-text-primary mb-3 font-mono">
                              <span className="text-matrix-green">$</span> Features
                            </h4>
                            <ul className="space-y-2">
                              {project.features.map((feature, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                                  <span className="text-matrix-green mt-1">▸</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Highlights */}
                          <div>
                            <h4 className="text-lg font-semibold text-text-primary mb-3 font-mono">
                              <span className="text-matrix-green">$</span> Highlights
                            </h4>
                            <div className="bg-matrix-green/5 border border-matrix-green/20 rounded-sharp p-4">
                              <p className="text-sm text-text-secondary">
                                {project.highlights}
                              </p>
                            </div>

                            {project.performance && (
                              <div className="mt-4">
                                <h5 className="text-sm font-semibold text-nepali-warm-gold mb-2 font-mono">
                                  Performance
                                </h5>
                                <p className="text-sm text-text-secondary">
                                  {project.performance}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Gold Divider */}
                {index < projects.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-nepali-warm-gold/20 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Project Stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 bg-dark-surface border border-border-subtle rounded-medium p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-matrix-green font-mono text-sm">$</div>
              <h3 className="text-h2 font-semibold text-text-primary">project_stats.sh</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-matrix-green">5</div>
                <div className="text-sm text-text-tertiary">Major Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-matrix-green">20+</div>
                <div className="text-sm text-text-tertiary">Technologies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-matrix-green">3</div>
                <div className="text-sm text-text-tertiary">Domains</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-matrix-green">2025</div>
                <div className="text-sm text-text-tertiary">Active Year</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection