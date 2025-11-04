import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Github, Linkedin, Globe, MapPin, Send } from 'lucide-react'

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }, 1000)
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="bg-dark-surface border border-border-subtle rounded-medium p-6">
              <div className="flex items-start space-x-3 mb-6">
                <div className="text-matrix-green font-mono text-sm">$</div>
                <h3 className="text-h2 font-semibold text-text-primary">send_message --to=bhugol</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-matrix-green mb-2">
                    Enter name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-pure-black border border-matrix-green/30 rounded-sharp px-4 py-3 text-matrix-green font-mono text-sm focus:border-matrix-green focus:outline-none transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-matrix-green mb-2">
                    Enter email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-pure-black border border-matrix-green/30 rounded-sharp px-4 py-3 text-matrix-green font-mono text-sm focus:border-matrix-green focus:outline-none transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-matrix-green mb-2">
                    Enter message:
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-pure-black border border-matrix-green/30 rounded-sharp px-4 py-3 text-matrix-green font-mono text-sm focus:border-matrix-green focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-matrix-green text-pure-black py-3 rounded-small font-semibold font-mono text-sm shadow-matrix-glow hover:bg-matrix-green-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-pure-black/30 border-t-pure-black rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>EXECUTE_COMMAND</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Terminal Output */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-matrix-green/10 border border-matrix-green/30 rounded-sharp"
                >
                  <div className="text-matrix-green font-mono text-sm">
                    Message sent successfully ✓
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Methods */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Location */}
              <div className="bg-dark-surface border border-border-subtle rounded-medium p-6">
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
              </div>

              {/* Contact Methods Grid */}
              <div className="grid grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : '_self'}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    variants={itemVariants}
                    className="bg-dark-surface border border-border-subtle rounded-medium p-4 hover:border-matrix-green/30 transition-colors duration-200 group"
                    whileHover={{ y: -2 }}
                  >
                    <div className={`${method.color} mb-2`}>
                      {method.icon}
                    </div>
                    <div className="text-sm font-mono text-text-primary group-hover:text-matrix-green transition-colors duration-200">
                      {method.label}
                    </div>
                    <div className="text-xs text-text-tertiary truncate">
                      {method.value}
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Response Note */}
              <div className="bg-dark-surface/50 border border-border-subtle rounded-medium p-6">
                <div className="text-matrix-green font-mono text-sm mb-2">
                  Response Time:
                </div>
                <div className="text-text-secondary text-sm space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-matrix-green rounded-full"></span>
                    <span>Email: Within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-matrix-green rounded-full"></span>
                    <span>Project inquiries: 1-2 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-matrix-green rounded-full"></span>
                    <span>Remote collaboration: Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
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