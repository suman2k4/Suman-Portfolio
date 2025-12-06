import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollToId } from '../../utils/scroll'
import ThemeToggle from '../ui/ThemeToggle'

const navLinks = [
  'home',
  'about',
  'experience',
  'skills',
  'projects',
  'certifications',
  'contact'
]

export default function Navbar({ themeMode, onToggleTheme }) {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.2, rootMargin: '-20% 0px -35% 0px' }
    )

    navLinks.forEach((link) => {
      const section = document.getElementById(link)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <>
      <motion.header
        className="fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-6xl rounded-full border border-white/20 bg-black/80 shadow-lg backdrop-blur-xl transition-all duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <nav className="relative flex items-center justify-between px-8 py-4">
          {/* Mobile: Burger Button (Left) */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="group relative flex h-8 w-8 flex-col items-center justify-center gap-1.5"
              aria-label="Toggle Menu"
            >
              <span
                className={`h-0.5 w-6 rounded-full bg-stCream transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                  }`}
              />
              <span
                className={`h-0.5 w-6 rounded-full bg-stCream transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''
                  }`}
              />
              <span
                className={`h-0.5 w-6 rounded-full bg-stCream transition-transform duration-300 ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                  }`}
              />
            </button>
          </div>

          {/* Logo: Centered on Mobile, Left on Desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex-none lg:mr-12">
            <button
              onClick={() => scrollToId('home')}
              className="font-display text-lg tracking-[0.2em] text-stRed title-outline"
            >
              SUMAN
            </button>
          </div>

          {/* Desktop Links: Centered */}
          <div className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link
              return (
                <button
                  key={link}
                  onClick={() => scrollToId(link)}
                  className={`relative rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-white' : 'text-stCream/70 hover:text-white'
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className={`absolute inset-0 -z-10 rounded-full shadow-[0_0_15px_rgba(229,9,20,0.5)] ${themeMode === 'upside-down'
                        ? 'bg-stBlue/80 shadow-[0_0_15px_rgba(48,86,211,0.5)]'
                        : 'bg-stRed/80 shadow-[0_0_15px_rgba(229,9,20,0.5)]'
                        }`}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {link}
                </button>
              )
            })}
          </div>

          {/* Right: Theme Toggle */}
          <div className="flex">
            <ThemeToggle mode={themeMode} onToggle={onToggleTheme} />
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay - Aligned Left below Burger */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-20 left-[5%] z-40 w-64 rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link
                return (
                  <button
                    key={link}
                    onClick={() => {
                      scrollToId(link)
                      setMobileMenuOpen(false)
                    }}
                    className={`relative w-full rounded-lg py-3 text-left pl-4 text-sm uppercase tracking-[0.2em] transition-all ${isActive
                      ? themeMode === 'upside-down'
                        ? 'bg-stBlue/20 text-white shadow-[0_0_10px_rgba(48,86,211,0.2)]'
                        : 'bg-stRed/20 text-white shadow-[0_0_10px_rgba(229,9,20,0.2)]'
                      : 'text-stCream/70 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {link}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

Navbar.propTypes = {
  themeMode: PropTypes.oneOf(['normal', 'upside-down']).isRequired,
  onToggleTheme: PropTypes.func.isRequired
}
