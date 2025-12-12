import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function ThemeToggle({ mode, onToggle }) {
  const isUpsideDown = mode === 'upside-down'
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={`relative flex items-center w-20 h-8 rounded-full border border-white/20 p-1 transition-colors duration-300 ${isUpsideDown ? 'bg-stBlue/10 border-stBlue/30' : 'bg-stRed/10 border-stRed/30'}`}
      whileTap={{ scale: 0.95 }}
    >
      {/* Label Text - conditionally positioned */}
      <span className={`absolute text-[10px] font-bold tracking-wider pointer-events-none transition-all duration-300 ${isUpsideDown ? 'left-3 text-stBlue' : 'right-3 text-stRed'}`}>
        {isUpsideDown ? 'BLUE' : 'RED'}
      </span>

      {/* Sliding Circle Button */}
      <motion.div
        className={`h-6 w-6 rounded-full shadow-md z-10 ${isUpsideDown ? 'bg-stBlue' : 'bg-stRed'}`}
        initial={false}
        animate={{
          x: isUpsideDown ? 48 : 0, // Slide to right end (w-20 is 80px, minus padding/size)
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  )
}

ThemeToggle.propTypes = {
  mode: PropTypes.oneOf(['upside-down', 'normal']).isRequired,
  onToggle: PropTypes.func.isRequired
}
