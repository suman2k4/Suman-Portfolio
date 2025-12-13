import React, { useState, useEffect } from 'react'
import { AnimatedTabs } from '../ui/AnimatedTabs'
import SectionTitle from '../ui/SectionTitle'
import { certifications } from '../../data/content'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function CertificationsSection({ themeMode }) {
  const isUpside = themeMode === 'upside-down'
  const [activeTabId, setActiveTabId] = useState(null)

  useEffect(() => {
    if (!activeTabId && certifications.length > 0) {
      setActiveTabId(`cert-0`)
    }
  }, [activeTabId])

  const handleNext = () => {
    if (!activeTabId) return
    const currentIndex = parseInt(activeTabId.replace('cert-', ''))
    const nextIndex = (currentIndex + 1) % certifications.length
    setActiveTabId(`cert-${nextIndex}`)
  }

  const handlePrev = () => {
    if (!activeTabId) return
    const currentIndex = parseInt(activeTabId.replace('cert-', ''))
    const prevIndex = (currentIndex - 1 + certifications.length) % certifications.length
    setActiveTabId(`cert-${prevIndex}`)
  }

  // Helper to map certifications to tabs
  const tabs = certifications.map((cert, index) => {
    // Generate a shorter label for the tab button
    let label = cert.name
    if (label.includes('Azure AI')) label = 'Azure AI'
    else if (label.includes('Databases and SQL')) label = 'SQL & DB'
    else if (label.includes('Methodology')) label = 'DS Method'
    else if (label.includes('Tools for Data')) label = 'DS Tools'
    else if (label.includes('Crash Course')) label = 'Python Basics'
    else if (label.includes('Python for Data Science')) label = 'Python for AI'
    else if (label.includes('Python Project')) label = 'Python Project'
    else if (label.includes('Machine Learning A-Z')) label = 'ML A-Z'
    else if (label.length > 15) label = label.substring(0, 12) + '...'

    return {
      id: `cert-${index}`,
      label: label,
      content: (
        <div className="grid md:grid-cols-5 gap-8 w-full h-full items-center">
          {/* Visual Side */}
          <div className="md:col-span-2 h-64 w-full relative rounded-xl overflow-hidden border border-white/10 group bg-black/40 flex items-center justify-center">
            <div className={cn(
              "absolute inset-0 opacity-20 transition-opacity duration-500",
              isUpside ? "bg-stBlue" : "bg-stRed"
            )} />

            {/* Certificate Image or Abstract Fallback */}
            {cert.image ? (
              <img
                src={cert.image}
                alt={cert.name}
                className="absolute w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            ) : (
              <div className="absolute inset-0 bg-grain opacity-30 mix-blend-overlay" />
            )}

            {/* Year Overlay (only if no image, or as a subtle watermark) */}
            {!cert.image && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-display opacity-30 tracking-widest rotate-[-15deg]">
                  {cert.year}
                </div>
              </div>
            )}

            {/* Shine/Glow Effect on Hover */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none mix-blend-overlay",
              isUpside ? "bg-gradient-to-tr from-stBlue/0 via-stBlue to-stBlue/0" : "bg-gradient-to-tr from-stRed/0 via-stRed to-stRed/0"
            )} />

            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 transition-all duration-500 pointer-events-none",
              isUpside ? "group-hover:from-stBlue/20" : "group-hover:from-stRed/20"
            )}>
              <div className="uppercase tracking-[0.2em] text-xs font-semibold text-white/60 mb-1">
                {cert.issuer}
              </div>
              <div className="h-0.5 w-12 bg-white/30" />
            </div>
          </div>

          {/* Content Side */}
          <div className="md:col-span-3 flex flex-col gap-y-4">
            <div>
              <h2 className={cn(
                "text-2xl md:text-3xl font-display font-bold mb-2",
                isUpside ? "text-stBlue" : "text-stRed"
              )}>
                {cert.name}
              </h2>
              <p className="text-sm font-mono text-stCream/60 tracking-wider">
                ISSUED · {cert.issuer} · {cert.year}
              </p>
            </div>

            <p className="text-stCream/80 leading-relaxed text-sm md:text-base border-l-2 border-white/10 pl-4">
              {cert.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {cert.tags && cert.tags.map((tag) => (
                <span key={tag} className="text-[0.6rem] uppercase tracking-widest px-2 py-1 bg-white/5 rounded text-white/50 border border-white/5">
                  {tag}
                </span>
              ))}
            </div>

            {/* Navigation Buttons Row */}
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-4">
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className={cn(
                  "p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group",
                  isUpside ? "hover:border-stBlue/50 text-stBlue" : "hover:border-stRed/50 text-stRed"
                )}
                aria-label="Previous Certificate"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6" /></svg>
              </button>

              <div className="h-px flex-1 bg-white/5" />

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className={cn(
                  "p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group",
                  isUpside ? "hover:border-stBlue/50 text-stBlue" : "hover:border-stRed/50 text-stRed"
                )}
                aria-label="Next Certificate"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>

          </div>
        </div>
      ),
    }
  })

  return (
    <section id="certifications" className="py-24 relative z-10">
      <SectionTitle label="Chapter 05" subtitle="Credentials & Seals" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 mt-12"
      >
        <AnimatedTabs
          tabs={tabs}
          defaultTab={tabs[0]?.id}
          activeTab={activeTabId || undefined}
          onChange={setActiveTabId}
          themeMode={themeMode}
          className="w-full"
        />
      </motion.div>
    </section>
  )
}
