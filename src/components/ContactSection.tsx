import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Github, Linkedin, Globe, MapPin, ArrowUpRight, Clock } from 'lucide-react'

interface ContactInfo {
  name: string
  email: string
  website: string
  github: string
  linkedin: string
  location: string
}

interface ContactSectionProps {
  contactInfo: ContactInfo
}

const ContactSection = ({ contactInfo }: ContactSectionProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: 'text-nepali-lapis-blue',
      borderColor: 'border-nepali-lapis-blue/30',
      bgColor: 'bg-nepali-lapis-blue/10',
      hoverBg: 'hover:bg-nepali-lapis-blue/20',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: contactInfo.github.replace('https://github.com/', 'github.com/'),
      href: contactInfo.github.startsWith('http') ? contactInfo.github : `https://${contactInfo.github}`,
      color: 'text-matrix-green',
      borderColor: 'border-matrix-green/30',
      bgColor: 'bg-matrix-green/10',
      hoverBg: 'hover:bg-matrix-green/20',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: contactInfo.linkedin.replace('https://linkedin.com/in/', 'linkedin.com/in/'),
      href: contactInfo.linkedin.startsWith('http') ? contactInfo.linkedin : `https://${contactInfo.linkedin}`,
      color: 'text-nepali-malachite-green',
      borderColor: 'border-nepali-malachite-green/30',
      bgColor: 'bg-nepali-malachite-green/10',
      hoverBg: 'hover:bg-nepali-malachite-green/20',
    },
    {
      icon: Globe,
      label: 'Website',
      value: contactInfo.website.replace(/^https?:\/\//, ''),
      href: contactInfo.website.startsWith('http') ? contactInfo.website : `https://${contactInfo.website}`,
      color: 'text-nepali-warm-gold',
      borderColor: 'border-nepali-warm-gold/30',
      bgColor: 'bg-nepali-warm-gold/10',
      hoverBg: 'hover:bg-nepali-warm-gold/20',
    },
  ]

  return (
    <section id="contact" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-h1 font-bold text-text-primary mb-4">
              Get In <span className="text-matrix-green">Touch</span>
            </h2>
            <div className="w-24 h-0.5 bg-matrix-green mx-auto mb-4" />
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              Ready to collaborate on something amazing? Let's connect and build the future together.
            </p>
          </motion.div>

          {/* Contact method cards */}
          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {contactMethods.map(method => {
              const Icon = method.icon
              return (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.label !== 'Email' ? '_blank' : undefined}
                  rel={method.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  whileHover={{ y: -4, boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  className={`group flex flex-col p-6 bg-dark-surface border ${method.borderColor} rounded-medium ${method.hoverBg} transition-all duration-300 relative overflow-hidden`}
                >
                  <div className={`w-12 h-12 ${method.bgColor} border ${method.borderColor} rounded-medium flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${method.color}`} />
                  </div>
                  <span className="text-xs text-text-tertiary font-mono mb-1">{method.label}</span>
                  <span className={`text-sm font-mono ${method.color} break-all`}>{method.value}</span>
                  <ArrowUpRight className={`w-4 h-4 ${method.color} absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity`} />
                </motion.a>
              )
            })}
          </motion.div>

          {/* Location + Response time */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={itemVariants}
              className="bg-dark-surface border border-border-subtle rounded-medium p-6 flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-matrix-green/10 border border-matrix-green/30 rounded-medium flex items-center justify-center">
                <MapPin className="w-6 h-6 text-matrix-green" />
              </div>
              <div>
                <p className="text-xs text-text-tertiary font-mono mb-1">current_location</p>
                <p className="text-text-primary font-semibold">{contactInfo.location}</p>
                <p className="text-text-secondary text-sm mt-1">Open to remote &amp; on-site opportunities</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-dark-surface border border-border-subtle rounded-medium p-6 flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-nepali-warm-gold/10 border border-nepali-warm-gold/30 rounded-medium flex items-center justify-center">
                <Clock className="w-6 h-6 text-nepali-warm-gold" />
              </div>
              <div>
                <p className="text-xs text-text-tertiary font-mono mb-1">response_time</p>
                <p className="text-text-primary font-semibold">Within 24 hours</p>
                <p className="text-text-secondary text-sm mt-1">Usually much faster than that</p>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="mt-16 border-t border-border-subtle"
      >
        <div className="max-w-6xl mx-auto px-8 py-8 text-center">
          <p className="text-text-tertiary text-sm font-mono">
            © 2025 {contactInfo.name}. Built with React, TypeScript &amp; TailwindCSS.
          </p>
          <p className="text-text-tertiary text-xs mt-1 font-mono">Designed with Cyber-Kathmandu Fusion</p>
        </div>
      </motion.footer>
    </section>
  )
}

export default ContactSection
