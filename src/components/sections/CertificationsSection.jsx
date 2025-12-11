import MagicBento, { ParticleCard } from '../ui/MagicBento'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { certifications } from '../../data/content'

export default function CertificationsSection({ themeMode }) {
  const isUpside = themeMode === 'upside-down'
  const glowColor = isUpside ? '48, 86, 211' : '229, 9, 20'
  const borderClass = isUpside ? 'border-stBlue/40' : 'border-stRed/40'

  return (
    <section id="certifications" className="py-24">
      <SectionTitle label="Chapter 05" subtitle="Credentials & Seals" />
      <MagicBento
        glowColor={glowColor}
        enableSpotlight={true}
        className="grid gap-6 md:grid-cols-3 max-w-none p-0"
      >
        {certifications.map((cert, idx) => (
          <motion.a
            key={cert.name}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="block h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: idx * 0.05 }}
          >
            <ParticleCard
              glowColor={glowColor}
              className={`card card--border-glow glass-panel rotate-[-1deg] rounded-xl border ${borderClass} p-5 transition hover:-translate-y-2 hover:rotate-1 h-full block`}
              enableTilt={false}
              particleCount={6}
            >
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.4em] theme-text-accent">{cert.issuer}</p>
                <h3 className="mt-3 text-lg text-stCream">{cert.name}</h3>
                <p className="mt-2 text-stCream/60">Issued · {cert.year}</p>
                {cert.description && <p className="mt-3 text-sm text-stCream/70">{cert.description}</p>}
                {cert.tags && cert.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 text-[0.55rem] uppercase tracking-[0.3em] text-stCream/60">
                    {cert.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 text-[0.6rem] uppercase tracking-[0.5em] verify-link">Verify →</div>
              </div>
            </ParticleCard>
          </motion.a>
        ))}
      </MagicBento>
    </section>
  )
}
