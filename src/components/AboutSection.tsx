import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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

  return (
    <section id="about" className="py-16 relative">
      {/* Dhaka Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FF41' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15h-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
              About <span className="text-matrix-green">System</span>
            </h2>
            <div className="w-24 h-0.5 bg-matrix-green mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Bio Section */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
              <div className="bg-dark-surface border border-border-subtle rounded-medium p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-matrix-green font-mono text-sm">$</div>
                  <h3 className="text-h2 font-semibold text-text-primary">cat about_me.txt</h3>
                </div>
                <div className="ml-6 space-y-4">
                  <p className="text-body text-text-secondary leading-relaxed">
                    {data.summary}
                  </p>
                  
                  <div className="border-l-2 border-matrix-green/30 pl-4">
                    <p className="text-matrix-green font-mono text-sm italic">
                      "{data.philosophy}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Context */}
              <motion.div
                variants={itemVariants}
                className="bg-dark-surface/50 border border-border-subtle rounded-medium p-6"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg">🇳🇵</span>
                  <h4 className="text-h2 font-semibold text-text-primary">Kathmandu, Nepal</h4>
                </div>
                <p className="text-body text-text-secondary leading-relaxed">
                  Based in the heart of the Himalayas, bringing a unique cultural perspective to global tech challenges. 
                  Passionate about building solutions that bridge traditional wisdom with modern innovation.
                </p>
              </motion.div>
            </motion.div>

            {/* Achievements Section */}
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <div className="bg-dark-surface border border-border-subtle rounded-medium p-6">
                <div className="flex items-start space-x-3 mb-6">
                  <div className="text-matrix-green font-mono text-sm">$</div>
                  <h3 className="text-h2 font-semibold text-text-primary">ls achievements/</h3>
                </div>
                
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center space-x-3 p-3 rounded-sharp border border-border-subtle hover:border-matrix-green/30 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-2 h-2 bg-matrix-green rounded-full"></div>
                      <div>
                        <div className="font-mono text-sm text-matrix-green">
                          {achievement.title}
                        </div>
                        <div className="text-xs text-text-tertiary">
                          {achievement.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* GitHub Stats */}
                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-matrix-green">185</div>
                      <div className="text-xs text-text-tertiary">Contributions</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-matrix-green">5</div>
                      <div className="text-xs text-text-tertiary">Major Projects</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-matrix-green">8</div>
                      <div className="text-xs text-text-tertiary">Repositories</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cultural Integration Quote */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="max-w-3xl mx-auto bg-dark-surface/30 border border-nepali-warm-gold/20 rounded-medium p-6">
              <div className="text-nepali-warm-gold font-mono text-sm mb-2">
                /* Cultural Philosophy */
              </div>
              <p className="text-body text-text-secondary italic">
                "Technology is the language, culture is the soul. Building digital experiences that honor heritage while embracing the future."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection