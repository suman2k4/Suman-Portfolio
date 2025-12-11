import MagicBento, { ParticleCard } from '../ui/MagicBento'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { skills } from '../../data/content'

export default function SkillsSection({ themeMode }) {
  const isUpside = themeMode === 'upside-down'
  const glowColor = isUpside ? '48, 86, 211' : '229, 9, 20'
  const borderClass = isUpside ? 'border-stBlue/40' : 'border-stRed/40'

  return (
    <section id="skills" className="py-24">
      <SectionTitle label="Chapter 03" subtitle="Skill Matrix" />
      <MagicBento
        glowColor={glowColor}
        enableSpotlight={true}
        className="grid gap-8 md:grid-cols-3 max-w-none p-0"
      >
        {skills.map((group) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <ParticleCard
              glowColor={glowColor}
              className={`card card--border-glow glass-panel p-6 w-full h-full ${borderClass}`}
              enableTilt={false}
              particleCount={5}
            >
              <div className="relative z-10 block">
                <p className="text-sm uppercase tracking-[0.4em] theme-text-accent">{group.category}</p>
                <div className="mt-5 space-y-4">
                  {group.items.map((skill) => (
                    <div key={skill.label} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-stCream/70">
                        <span>{skill.label}</span>
                        <span>{skill.note}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-stRed via-stPurple to-stBlue"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeInOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ParticleCard>
          </motion.div>
        ))}
      </MagicBento>
    </section>
  )
}
