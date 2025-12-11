import MagicBento, { ParticleCard } from '../ui/MagicBento'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { experience } from '../../data/content'
import { staggerChildren, fadeInUp } from '../../utils/animations'

export default function ExperienceSection({ themeMode }) {
  const isUpside = themeMode === 'upside-down'
  const glowColor = isUpside ? '48, 86, 211' : '229, 9, 20'
  const borderClass = isUpside ? 'border-stBlue/40' : 'border-stRed/40'

  return (
    <section id="experience" className="py-24">
      <SectionTitle label="Chapter 02" subtitle="Experience Timeline" />
      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className={`relative border-l pl-10 ${isUpside ? 'border-stBlue/20' : 'border-stRed/20'}`}
      >
        <div className={`absolute left-[-6px] top-0 h-full w-[2px] ${isUpside ? 'bg-gradient-to-b from-stBlue/60 via-stPurple/40 to-transparent' : 'bg-gradient-to-b from-stRed/60 via-stPurple/40 to-transparent'}`} />

        <MagicBento
          glowColor={glowColor}
          enableSpotlight={true}
          className="flex flex-col gap-10"
        >
          {experience.map((item, idx) => (
            <motion.div
              key={item.company}
              variants={fadeInUp}
              custom={idx * 0.15}
              className="w-full"
            >
              <ParticleCard
                className={`card card--border-glow glass-panel p-6 transition text-left w-full ${borderClass}`}
                glowColor={glowColor}
                enableTilt={false}
                particleCount={8}
              >
                <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between relative z-10">
                  <p className="text-sm uppercase tracking-[0.4em] theme-text-accent">{item.duration}</p>
                  <p className="text-xs text-stCream/60">{item.company}</p>
                </div>
                <h3 className="text-xl text-stCream relative z-10">{item.role}</h3>
                <p className="mt-3 text-stCream/70 relative z-10">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs tracking-[0.3em] text-stCream/60 relative z-10">
                  {item.stack.map((tech) => (
                    <span key={tech} className={`rounded-full border px-3 py-1 ${isUpside ? 'border-stBlue/30' : 'border-stRed/30'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </ParticleCard>
            </motion.div>
          ))}
        </MagicBento>
      </motion.div>
    </section>
  )
}
