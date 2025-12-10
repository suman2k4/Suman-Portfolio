import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { aboutContent, heroContent } from '../../data/content'
import SectionTitle from '../ui/SectionTitle'
import TiltedCard from '../ui/TiltedCard'

export default function AboutSection({ themeMode }) {
  const portraitSrc =
    themeMode === 'upside-down' ? '/media/suman-portrait-blue.jpeg' : heroContent.portraitUrl

  return (
    <section id="about" className="py-24">
      <SectionTitle label="Chapter 01" subtitle="About the Explorer" />
      <div className="grid gap-8 md:grid-cols-12 items-stretch">
        {/* Left Column: Portrait */}
        <motion.div
          className="md:col-span-4 h-full min-h-[400px]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="neon-frame h-full w-full">
            <TiltedCard
              imageSrc={portraitSrc}
              altText={`${heroContent.name} portrait`}
              captionText={heroContent.role}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
            />
          </div>
        </motion.div>

        {/* Right Column: Text Content */}
        <motion.div
          className="md:col-span-8"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className={`glass-panel p-8 md:p-10 relative overflow-hidden group min-h-[400px] flex flex-col justify-center ${themeMode === 'upside-down' ? 'border-stBlue/40' : 'border-stRed/40'}`}>
            {/* Subtle Gradient Background for Depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />

            {/* Tag */}
            <div className="relative z-10 mb-6">
              <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.15em] text-stCream uppercase bg-white/5 rounded-full border border-white/10 shadow-sm backdrop-blur-sm">
                {aboutContent.tag}
              </span>
            </div>

            {/* Paragraphs */}
            <div className="relative z-10 space-y-5 text-stCream/80 leading-relaxed text-[15px] md:text-[16px]">
              {aboutContent.paragraphs.map((para, idx) => (
                <p key={idx} className="transition-colors duration-300 hover:text-stCream">
                  {para}
                </p>
              ))}
            </div>

            {/* Decorative Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-stRed/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
