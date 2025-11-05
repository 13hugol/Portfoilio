import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Github, Linkedin, Globe, MapPin } from 'lucide-react'

interface ContactSectionProps {
  contactInfo: {
    name: string
    email: string
    website: string
    github: string
    linkedin: string
    location: string
  }
}

const ContactSection = ({ contactInfo }: ContactSectionProps) => {
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

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: 'text-matrix-green'
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: 'github.com/13hugol',
      href: `https://${contactInfo.github}`,
      color: 'text-text-secondary'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'Bhugol Gautam',
      href: contactInfo.linkedin,
      color: 'text-nepali-lapis-blue'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: 'Website',
      value: contactInfo.website,
      href: `https://${contactInfo.website}`,
      color: 'text-nepali-malachite-green'
    }
  ]

  return (
    <section id="contact" className="py-16 relative min-h-screen flex items-center">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FF41' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15h-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto px-8 relative z-10 w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-h1 font-bold text-text-primary mb-4">
              Contact <span className="text-matrix-green">Terminal</span>
            </h2>
            <div className="w-24 h-0.5 bg-matrix-green mx-auto mb-4"></div>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              Ready to build something amazing together? Let's connect and discuss your next project.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Contact Methods - Main Grid */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : '_self'}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  variants={itemVariants}
                  className="bg-dark-surface border border-border-subtle rounded-medium p-8 hover:border-matrix-green/50 transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-matrix-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <div className="relative z-10">
                    <div className={`${method.color} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                      {method.icon}
                    </div>
                    <div className="text-lg font-mono font-semibold text-text-primary group-hover:text-matrix-green transition-colors duration-300 mb-2">
                      {method.label}
                    </div>
                    <div className="text-sm text-text-tertiary group-hover:text-text-secondary transition-colors duration-300">
                      {method.value}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute top-4 right-4 text-matrix-green opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>

            {/* Location & Availability */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Location */}
              <motion.div variants={itemVariants} className="bg-dark-surface border border-border-subtle rounded-medium p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-matrix-green font-mono text-sm">$</div>
                  <h3 className="text-h2 font-semibold text-text-primary">current_location</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-nepali-warm-gold" />
                  <div>
                    <div className="font-mono text-sm text-text-primary">{contactInfo.location}</div>
                    <div className="text-xs text-text-tertiary">Available for remote work</div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Response Note */}
              <motion.div variants={itemVariants} className="bg-dark-surface/50 border border-border-subtle rounded-medium p-6">
                <div className="text-matrix-green font-mono text-sm mb-3">
                  Response Time:
                </div>
                <div className="text-text-secondary text-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></span>
                    <span>Email: Within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></span>
                    <span>Project inquiries: 1-2 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></span>
                    <span>Remote collaboration: Available</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="text-text-tertiary font-mono text-sm">
              <div className="mb-2">© 2025 Bhugol Gautam. All rights reserved.</div>
              <div className="text-xs">
                Built with React, TypeScript & TailwindCSS. 
                <span className="text-matrix-green"> Designed with Cyber-Kathmandu Fusion</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection