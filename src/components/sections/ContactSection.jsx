import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { ContactCard } from '../ui/ContactCard'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import NeonButton from '../ui/NeonButton'
import { Mail, MapPin, Linkedin, Github } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function ContactSection({ themeMode }) {
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setStatus('Signal transmitted successfully to the Upside Down!')
          form.current.reset()
        },
        (error) => {
          console.error('FAILED...', error.text)
          setStatus('Signal lost in the void. Please try again.')
        }
      )
      .finally(() => {
        setIsSubmitting(false)
        setTimeout(() => setStatus(null), 5000)
      })
  }

  return (
    <section id="contact" className="py-24 relative z-10">
      <SectionTitle label="Final Chapter" subtitle="Contact the Operator" />
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ContactCard
            themeMode={themeMode}
            title="Get in touch"
            description="Ready to collaborate on the next big anomaly? Whether it's AI, Data Science, or fighting Demogorgons, I'm just a signal away."
            contactInfo={[
              {
                icon: Github,
                label: 'GitHub',
                value: '@suman2k4',
                link: 'https://github.com/suman2k4'
              },
              {
                icon: Linkedin,
                label: 'LinkedIn',
                value: '/in/suman-s-',
                link: 'https://www.linkedin.com/in/suman-s-'
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'suman.technerd@gmail.com',
                link: 'mailto:suman.technerd@gmail.com'
              },
              {
                icon: MapPin,
                label: 'Location',
                value: 'Coimbatore, TN, IN',
                link: 'https://maps.google.com/?q=Coimbatore,TN,IN'
              }
            ]}
          >
            <form ref={form} onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-stCream/70 font-display">Name</label>
                <Input type="text" name="name" required placeholder="Jane Hopper" themeMode={themeMode} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-stCream/70 font-display">Email</label>
                <Input type="email" name="email" required placeholder="eleven@hawkins.lab" themeMode={themeMode} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-stCream/70 font-display">Message</label>
                <Textarea name="message" required placeholder="Describe the anomaly..." themeMode={themeMode} rows={4} />
              </div>

              <NeonButton type="submit" disabled={isSubmitting} className="w-full mt-2" themeMode={themeMode}>
                {isSubmitting ? 'Transmitting...' : 'Transmit Signal'}
              </NeonButton>

              {status && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-center text-stCream/60 mt-2 font-mono"
                >
                  {status}
                </motion.p>
              )}
            </form>
          </ContactCard>
        </motion.div>
      </div>
    </section>
  )
}
