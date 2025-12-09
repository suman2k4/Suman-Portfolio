import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { heroContent } from '../../data/content'
import { scrollToId } from '../../utils/scroll'

export default function HomeHero({ themeMode }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [enableParallax, setEnableParallax] = useState(false)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 12 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 12 })
  const moveX = useTransform(springX, [-200, 200], [-15, 15])
  const moveY = useTransform(springY, [-200, 200], [-15, 15])

  const isUpside = themeMode === 'upside-down'

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const evaluate = () => setEnableParallax(pointerQuery.matches && !motionQuery.matches)
    evaluate()
    pointerQuery.addEventListener('change', evaluate)
    motionQuery.addEventListener('change', evaluate)
    return () => {
      pointerQuery.removeEventListener('change', evaluate)
      motionQuery.removeEventListener('change', evaluate)
    }
  }, [])

  useEffect(() => {
    if (!enableParallax) {
      mouseX.set(0)
      mouseY.set(0)
      return
    }
    const handleMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    const throttled = (e) => {
      requestAnimationFrame(() => handleMove(e))
    }
    window.addEventListener('pointermove', throttled)
    return () => window.removeEventListener('pointermove', throttled)
  }, [enableParallax, mouseX, mouseY])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }
    }
  }

  const streakVariants = {
    hidden: { opacity: 0, height: '0%' },
    visible: {
      opacity: 1,
      height: '70%',
      transition: { duration: 1.5, ease: 'easeOut', delay: 0.2 }
    }
  }

  const chips = [
    'AI & Data Science Graduate',
    'Generative AI',
    'Machine Learning',
    'Python Solutions'
  ]

  // Dynamic Styles based on Theme
  const streakGradient = isUpside
    ? 'linear-gradient(to bottom, rgba(48, 86, 211, 0.5), transparent)'
    : 'linear-gradient(to bottom, rgba(255,0,100,0.28), transparent)'

  const chipBg = isUpside
    ? 'radial-gradient(circle at top, rgba(48, 86, 211, 0.3), rgba(0,0,0,0.4))'
    : 'radial-gradient(circle at top, rgba(255,0,80,0.18), rgba(0,0,0,0.4))'

  const chipShadow = isUpside
    ? 'drop-shadow(0 0 10px rgba(48, 86, 211, 0.35))'
    : 'drop-shadow(0 0 10px rgba(255,0,80,0.15))'

  const primaryBtnBg = isUpside
    ? 'radial-gradient(circle at top, #4cc9f0, #3056d3)'
    : 'radial-gradient(circle at top, #ff335f, #b00030)'

  const primaryBtnShadow = isUpside
    ? '0 0 30px rgba(48, 86, 211, 0.55)'
    : '0 0 30px rgba(255, 0, 60, 0.55)'

  const primaryBtnHoverShadow = isUpside
    ? '0 0 40px rgba(76, 201, 240, 0.8)'
    : '0 0 40px rgba(255, 0, 80, 0.8)'

  return (
    <motion.section
      id="home"
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Parallax Background */}
      <motion.div
        style={enableParallax ? { x: moveX, y: moveY } : undefined}
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
      >
        <div className="h-full w-full hero-glow" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl p-8 md:p-12 lg:p-16">
        {/* Light Streak */}
        <motion.div
          className="absolute hidden md:block"
          variants={streakVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'absolute',
            top: '15%',
            width: '1px',
            background: streakGradient,
            left: '40px',
            transition: 'background 0.5s ease'
          }}
        />

        <motion.div
          className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left md:pl-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full border"
            style={{
              backgroundColor: 'rgba(10, 10, 20, 0.7)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <span className="text-xs md:text-[13px] font-medium tracking-[0.25em] text-white/55 uppercase">
              Welcome to the Upside Down
            </span>
          </motion.div>

          {/* Main Name */}
          <motion.h1
            className="mt-2 text-4xl sm:text-5xl md:text-6xl title-outline flicker glitch"
            data-text={heroContent.name.toUpperCase()}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1.2, ease: [0.45, 0, 0.55, 1] }
              }
            }}
          >
            {heroContent.name}
          </motion.h1>

          {/* Skill Chips */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center md:justify-start gap-3 w-full"
            style={{ filter: chipShadow, transition: 'filter 0.5s ease' }}
          >
            {chips.map((chip, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full border text-[13px] font-medium tracking-[0.04em] text-white/92 transition-[background]"
                style={{
                  background: chipBg,
                  borderColor: 'rgba(255,255,255,0.12)',
                }}
              >
                {chip}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[580px] text-[15px] md:text-[16px] leading-[1.7] font-normal"
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            Aspiring AI and Data Science graduate crafting applied ML, Generative AI, and automation projects for real teams.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <motion.button
              onClick={() => window.open('/SumanS_Resume.pdf', '_blank')}
              whileHover={{ scale: 1.03, y: -1, boxShadow: primaryBtnHoverShadow }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full uppercase text-[13px] font-semibold tracking-[0.12em] text-white transition-all duration-300"
              style={{
                background: primaryBtnBg,
                boxShadow: primaryBtnShadow
              }}
            >
              View Resume
            </motion.button>

            <motion.button
              onClick={() => scrollToId('contact')}
              whileHover={{ scale: 1.03, borderColor: 'rgba(91, 43, 255, 0.5)', boxShadow: '0 0 25px rgba(91, 43, 255, 0.25)' }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border uppercase text-[13px] font-semibold tracking-[0.12em] text-white/90 transition-transform duration-300"
              style={{
                background: 'linear-gradient(120deg, rgba(20,20,40,0.9), rgba(30,0,40,0.9))',
                borderColor: 'rgba(255,255,255,0.24)'
              }}
            >
              Contact Me
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  )
}
