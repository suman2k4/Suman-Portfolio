
import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import PropTypes from 'prop-types'

const StrangerThingsCursorSVG = ({ color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 50 50"
            fill="none"
            style={{ scale: 1.2, overflow: 'visible' }}
        >
            {/* Glow Filter */}
            <defs>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Main Arrow Body */}
            <path
                d="M5,5 L18,45 L24,30 L45,24 L5,5 Z"
                fill={`rgba(${color}, 0.15)`}
                stroke={`rgb(${color})`}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                filter="url(#neon-glow)"
            />

            {/* Inner Core */}
            <circle cx="20" cy="20" r="2" fill={`rgb(${color})`} filter="url(#neon-glow)" />

            {/* Trailing energy line (decorative) */}
            <line x1="24" y1="30" x2="18" y2="45" stroke={`rgba(${color}, 0.5)`} strokeWidth="1" />
        </svg>
    )
}

StrangerThingsCursorSVG.propTypes = {
    color: PropTypes.string.isRequired
}


export const SmoothCursor = ({
    themeMode,
    springConfig = {
        damping: 25, // Lower damping for a bit more "floaty" feel like supernatural
        stiffness: 300,
        mass: 0.8,
        restDelta: 0.001,
    },
}) => {
    const isUpside = themeMode === 'upside-down';
    const color = isUpside ? '48, 86, 211' : '229, 9, 20'; // Neon Blue : Neon Red

    const [isMoving, setIsMoving] = useState(false)
    const lastMousePos = useRef({ x: 0, y: 0 })
    const velocity = useRef({ x: 0, y: 0 })
    const lastUpdateTime = useRef(Date.now())
    const previousAngle = useRef(0)
    const accumulatedRotation = useRef(0)

    // Using useSpring from framer-motion directly as requested in similar fashion
    const cursorX = useSpring(0, springConfig)
    const cursorY = useSpring(0, springConfig)

    const rotation = useSpring(0, {
        ...springConfig,
        damping: 40,
        stiffness: 200,
    })

    const scale = useSpring(1, {
        ...springConfig,
        stiffness: 400,
        damping: 30,
    })

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        // Velocity Calculator
        const updateVelocity = (currentPos) => {
            const currentTime = Date.now()
            const deltaTime = currentTime - lastUpdateTime.current

            if (deltaTime > 0) {
                velocity.current = {
                    x: (currentPos.x - lastMousePos.current.x) / deltaTime,
                    y: (currentPos.y - lastMousePos.current.y) / deltaTime,
                }
            }

            lastUpdateTime.current = currentTime
            lastMousePos.current = currentPos
        }

        const smoothMouseMove = (e) => {
            const currentPos = { x: e.clientX, y: e.clientY }
            updateVelocity(currentPos)

            const speed = Math.sqrt(
                Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
            )

            cursorX.set(currentPos.x)
            cursorY.set(currentPos.y)

            // Calculate rotation based on movement direction
            if (speed > 0.1) {
                // -45 degrees offset because the arrow points top-left by default in SVG logic often, 
                // but here our path starts at 5,5. 
                // Standard cursor points top-left.
                // atan2(y, x) gives angle from X axis.
                const currentAngle =
                    Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90 + 135

                let angleDiff = currentAngle - previousAngle.current

                // Optimize rotation to take shortest path
                if (angleDiff > 180) angleDiff -= 360
                if (angleDiff < -180) angleDiff += 360

                accumulatedRotation.current += angleDiff
                rotation.set(accumulatedRotation.current)
                previousAngle.current = currentAngle

                // Slight squash effect on move
                scale.set(0.9)
                setIsMoving(true)

                const timeout = setTimeout(() => {
                    scale.set(1)
                    setIsMoving(false)
                }, 150)

                return () => clearTimeout(timeout)
            }
        }

        let rafId
        const throttledMouseMove = (e) => {
            if (rafId) return

            rafId = requestAnimationFrame(() => {
                smoothMouseMove(e)
                rafId = 0
            })
        }

        window.addEventListener("mousemove", throttledMouseMove)

        return () => {
            window.removeEventListener("mousemove", throttledMouseMove)
            document.body.style.cursor = "auto"
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [cursorX, cursorY, rotation, scale])

    return (
        <>
            <style>
                {`
                *, button, a, input, textarea {
                    cursor: none !important;
                }
            `}
            </style>
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%", // Center the SVG on the point
                    translateY: "-50%",
                    rotate: rotation,
                    scale: scale,
                    filter: `drop-shadow(0 0 8px rgba(${color}, 0.6))`,
                    willChange: "transform",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                }}
            >
                <StrangerThingsCursorSVG color={color} />
            </motion.div>
        </>
    )
}

SmoothCursor.propTypes = {
    themeMode: PropTypes.string.isRequired,
    springConfig: PropTypes.shape({
        damping: PropTypes.number,
        stiffness: PropTypes.number,
        mass: PropTypes.number,
        restDelta: PropTypes.number
    })
}

export default SmoothCursor;
