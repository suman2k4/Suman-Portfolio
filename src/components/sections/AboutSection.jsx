import { useMemo } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { aboutContent, heroContent } from '../../data/content'
import SectionTitle from '../ui/SectionTitle'
import TypewriterTerminal from '../ui/TypewriterTerminal'

export default function AboutSection({ themeMode }) {
  const portraitSrc =
    themeMode === 'upside-down' ? '/media/suman-portrait-blue.jpeg' : heroContent.portraitUrl

  const terminalLines = useMemo(
    () => [
      `ROLE: ${heroContent.role}`,
      `LOCATION: ${heroContent.location}`,
      `SPECIALIZATION: ${aboutContent.specializations.join(' | ')}`
    ],
    []
  )

  return (
    <section id="about" className="py-24">
      <SectionTitle label="Chapter 01" subtitle="About the Explorer" />
      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          className="neon-frame"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="portrait-card">
            {portraitSrc ? (
              <img
                src={portraitSrc}
                alt={heroContent.portraitAlt || `${heroContent.name} portrait`}
                loading="lazy"
                className="portrait-card__img"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-center text-stCream/50">
                Portrait Placeholder
              </div>
            )}
            <div className="portrait-card__glow" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="space-y-6"
        >
          <p className="text-lg text-stCream/80">{aboutContent.paragraph}</p>
          <TypewriterTerminal lines={terminalLines} />
        </motion.div>
      </div>
    </section>
  )
}
