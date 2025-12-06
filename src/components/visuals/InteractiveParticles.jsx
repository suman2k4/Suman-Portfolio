import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function InteractiveParticles({ count = 200, color = '#fff', size = 0.1, spread = 15 }) {
    const points = useRef()

    // Initial positions
    const [positions, initialPositions] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const init = new Float32Array(count * 3)

        const spreadX = Array.isArray(spread) ? spread[0] : spread
        const spreadY = Array.isArray(spread) ? spread[1] : spread
        const spreadZ = Array.isArray(spread) ? spread[2] : spread

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * spreadX
            const y = (Math.random() - 0.5) * spreadY
            const z = (Math.random() - 0.5) * spreadZ
            pos[i * 3] = x
            pos[i * 3 + 1] = y
            pos[i * 3 + 2] = z
            init[i * 3] = x
            init[i * 3 + 1] = y
            init[i * 3 + 2] = z
        }
        return [pos, init]
    }, [count, spread])

    useFrame((state) => {
        if (!points.current) return

        // Constant rotation
        points.current.rotation.y += 0.0005
        points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05

        // Mouse Interaction
        const { pointer, viewport } = state

        const mouseX = pointer.x * (viewport.width / 2)
        const mouseY = pointer.y * (viewport.height / 2)

        const positionsArray = points.current.geometry.attributes.position.array

        for (let i = 0; i < count; i++) {
            const ix = i * 3
            const iy = i * 3 + 1
            const iz = i * 3 + 2

            const px = positionsArray[ix]
            const py = positionsArray[iy]

            // Distance to mouse (approximate in local space)
            const dx = mouseX - px
            const dy = mouseY - py
            const dist = Math.sqrt(dx * dx + dy * dy)

            const ox = initialPositions[ix]
            const oy = initialPositions[iy]
            const oz = initialPositions[iz]

            let tx = ox
            let ty = oy
            let tz = oz

            // Repulsion radius
            if (dist < 4) {
                const force = (4 - dist) * 0.5
                tx -= (dx / dist) * force
                ty -= (dy / dist) * force
            }

            positionsArray[ix] += (tx - positionsArray[ix]) * 0.1
            positionsArray[iy] += (ty - positionsArray[iy]) * 0.1
            positionsArray[iz] += (tz - positionsArray[iz]) * 0.1
        }

        points.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color={color}
                size={size}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}
