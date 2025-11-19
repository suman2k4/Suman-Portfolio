import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomeHero from './components/sections/HomeHero'
import AboutSection from './components/sections/AboutSection'
import ExperienceSection from './components/sections/ExperienceSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import CertificationsSection from './components/sections/CertificationsSection'
import ContactSection from './components/sections/ContactSection'

export default function App() {
  const [themeMode, setThemeMode] = useState('normal')

  const sections = useMemo(
    () => [
      <HomeHero key="home" />,
      <AboutSection key="about" />,
      <ExperienceSection key="experience" />,
      <SkillsSection key="skills" />,
      <ProjectsSection key="projects" />,
      <CertificationsSection key="certifications" />,
      <ContactSection key="contact" />
    ],
    []
  )

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode
  }, [themeMode])

  const toggleTheme = () =>
    setThemeMode((prev) => (prev === 'normal' ? 'upside-down' : 'normal'))

  return (
    <div className={`app-shell ${themeMode === 'upside-down' ? 'theme-upside' : ''}`}>
      <Navbar themeMode={themeMode} onToggleTheme={toggleTheme} />
      <div className="grain-overlay" />
      <div className="glitch-overlay" />
      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24">
        {sections}
        <Footer />
      </main>
    </div>
  )
}
