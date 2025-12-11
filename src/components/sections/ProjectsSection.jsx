import ThreeDCarousel from '../ui/ThreeDCarousel'
import SectionTitle from '../ui/SectionTitle'
import { projects } from '../../data/content'

export default function ProjectsSection({ themeMode }) {
  const isUpside = themeMode === 'upside-down'
  const glowColor = isUpside ? '48, 86, 211' : '229, 9, 20'

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <SectionTitle label="Chapter 04" subtitle="Featured Experiments" />



      <div className="relative z-10 w-full flex justify-center mt-8">
        <ThreeDCarousel
          items={projects}
          glowColor={glowColor}
          isUpside={isUpside}
          autoRotate={true}
          rotateInterval={5000}
        />
      </div>
    </section>
  )
}
