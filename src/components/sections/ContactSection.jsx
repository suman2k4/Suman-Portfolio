import MagicBento, { ParticleCard } from '../ui/MagicBento'
import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'

export default function ContactSection({ themeMode }) {
  const [status, setStatus] = useState(null)
  const isUpside = themeMode === 'upside-down'
  const glowColor = isUpside ? '48, 86, 211' : '229, 9, 20'

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('Message dispatched through the Upside Down. I will respond soon!')
    event.currentTarget.reset()
  }

  return (
    <section id="contact" className="py-24">
      <SectionTitle label="Final Chapter" subtitle="Contact the Operator" />
      <MagicBento
        glowColor={glowColor}
        enableSpotlight={true}
        className="max-w-2xl mx-auto p-0 block"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <ParticleCard
            glowColor={glowColor}
            className="card card--border-glow glass-panel border border-white/10 p-8 w-full"
            enableTilt={false}
            enableMagnetism={false} // form inputs might be tricky with magnetism
            particleCount={12}
          >
            <form
              onSubmit={handleSubmit}
              className="relative z-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.4em]">
                  Name
                  <input
                    name="name"
                    required
                    className="input-field"
                    placeholder="Jane Hopper"
                  />
                </label>
                <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.4em]">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-field"
                    placeholder="jhopper@hawkinslab.io"
                  />
                </label>
              </div>
              <label className="mt-6 flex flex-col gap-2 text-xs uppercase tracking-[0.4em]">
                Message
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="input-field"
                  placeholder="Tell me about your next anomaly..."
                />
              </label>
              <motion.button
                type="submit"
                className="contact-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Me
              </motion.button>
              {status && <p className="mt-4 text-center text-stCream/70">{status}</p>}
            </form>
          </ParticleCard>
        </motion.div>
      </MagicBento>
    </section>
  )
}
