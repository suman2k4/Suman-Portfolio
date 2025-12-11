import MagicBento, { ParticleCard } from '../ui/MagicBento'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import NeonButton from '../ui/NeonButton'
import { projects } from '../../data/content'

export default function ProjectsSection({ themeMode }) {
  const isUpside = themeMode === 'upside-down'
  const glowColor = isUpside ? '48, 86, 211' : '229, 9, 20'

  return (
    <section id="projects" className="py-24">
      <SectionTitle label="Chapter 04" subtitle="Featured Experiments" />
      <MagicBento
        glowColor={glowColor}
        enableSpotlight={true}
        className="grid gap-8 md:grid-cols-2 max-w-none p-0"
      >
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            className="h-full"
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
          >
            <ParticleCard
              glowColor={glowColor}
              className="card card--border-glow relative overflow-hidden rounded-2xl border border-white/5 bg-black/40 p-6 shadow-lg h-full"
              enableTilt={false}
              particleCount={10}
            >
              <div className="absolute inset-0 pointer-events-none opacity-0 transition duration-500 hover:opacity-100" aria-hidden>
                <div className={`absolute inset-0 bg-gradient-to-tr ${isUpside ? 'from-stBlue/20 to-stPurple/20' : 'from-stRed/20 to-stBlue/20'} mix-blend-lighten`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_70%)]" />
              </div>
              <div className="relative z-10">
                <p className="text-sm uppercase tracking-[0.4em] theme-text-accent">{project.tags.join(' / ')}</p>
                <h3 className="mt-3 text-2xl text-stCream glitch" data-text={project.title}>
                  {project.title}
                </h3>
                <p className="mt-3 text-stCream/70">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-[0.65rem] tracking-[0.3em] text-stCream/60">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-[0.6rem] uppercase tracking-[0.4em]">
                  <NeonButton href={project.links.live || '#'}>View Details</NeonButton>
                  <NeonButton variant="ghost" href={project.links.github}>
                    GitHub
                  </NeonButton>
                </div>
              </div>
            </ParticleCard>
          </motion.div>
        ))}
      </MagicBento>
    </section>
  )
}
