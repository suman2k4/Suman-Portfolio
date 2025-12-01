import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import NeonButton from '../ui/NeonButton'
import { heroContent } from '../../data/content'
import { scrollToId } from '../../utils/scroll'

export default function HomeHero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [enableParallax, setEnableParallax] = useState(false)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 12 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 12 })
  const moveX = useTransform(springX, [-200, 200], [-15, 15])
  const moveY = useTransform(springY, [-200, 200], [-15, 15])

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const evaluate = () => {
      setEnableParallax(pointerQuery.matches && !motionQuery.matches)
    }

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
      return undefined
    }

    const handleMove = (event) => {
      mouseX.set(event.clientX - window.innerWidth / 2)
      mouseY.set(event.clientY - window.innerHeight / 2)
    }
    let rafId
    const throttled = (event) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => handleMove(event))
    }
    window.addEventListener('pointermove', throttled, { passive: true })
    return () => {
      window.removeEventListener('pointermove', throttled)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [enableParallax, mouseX, mouseY])

  return (
    <section id="home" className="relative flex min-h-screen items-start md:items-center pt-10 md:pt-20">
      <motion.div
        style={enableParallax ? { x: moveX, y: moveY } : undefined}
        className="absolute inset-0 -z-10 opacity-30"
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(229,9,20,0.25),_transparent_55%)]" />
      </motion.div>
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:text-left">
        <motion.p
          className="text-sm uppercase tracking-[0.6em] text-stBlue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          Welcome to the Upside Down
        </motion.p>
        <motion.h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl title-outline flicker glitch"
          data-text={heroContent.name.toUpperCase()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1] }}
        >
          {heroContent.name}
        </motion.h1>
        <motion.p
          className="mt-5 text-lg text-stCream/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.6, duration: 1.1 }}
        >
          {heroContent.role} · {heroContent.highlights.join(' · ')}
        </motion.p>
        <motion.p
          className="mt-4 max-w-2xl text-base text-stCream/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9 }}
        >
          {heroContent.tagline}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col gap-4 text-xs uppercase tracking-[0.4em] md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <NeonButton onClick={() => scrollToId('projects')}>View Projects</NeonButton>
          <NeonButton variant="ghost" onClick={() => scrollToId('contact')}>
            Contact Me
          </NeonButton>
        </motion.div>
      </div>
    </section>
  )
}
