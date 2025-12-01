import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'

function Spores({ count = 400, color = '#e50914', size = 0.08, spread = [8, 4, 6], speed = 0.0012 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pts = []
    for (let i = 0; i < count; i += 1) {
      pts.push((Math.random() - 0.5) * spread[0])
      pts.push((Math.random() - 0.5) * spread[1])
      pts.push((Math.random() - 0.5) * spread[2])
    }
    return new Float32Array(pts)
  }, [count, spread])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y += speed
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 5) * 0.15
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  )
}

const lightningBolts = [
  { id: 'bolt-a', left: '18%', tilt: -8, delay: 0.4, duration: 5.4 },
  { id: 'bolt-b', left: '46%', tilt: 4, delay: 1.8, duration: 6.8 },
  { id: 'bolt-c', right: '14%', tilt: -13, delay: 3.2, duration: 7.2 },
  { id: 'bolt-d', left: '32%', tilt: 2, delay: 4.6, duration: 5.8 }
]

export default function UpsideDownScene() {
  return (
    <div className="upside-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.2, 4], fov: 55 }} dpr={[1, 1.35]}>
        <color attach="background" args={['#01030a']} />
        <ambientLight intensity={0.25} />
        <pointLight position={[2, 2, 2]} intensity={0.7} color="#83d8ff" />
        <pointLight position={[-3, -1, -2]} intensity={0.5} color="#ff1a3c" />
        <Spores count={440} size={0.082} color="#ff9eb5" spread={[10, 5, 7]} speed={0.0014} />
        <Spores count={340} size={0.062} color="#7dd3fc" spread={[12, 6, 10]} speed={0.001} />
      </Canvas>
      <div className="upside-scene__fog" />
      <div className="upside-scene__lightning">
        {lightningBolts.map((bolt) => (
          <span
            key={bolt.id}
            className="bolt"
            style={{
              left: bolt.left,
              right: bolt.right,
              '--bolt-delay': `${bolt.delay}s`,
              '--bolt-duration': `${bolt.duration}s`,
              '--bolt-tilt': `${bolt.tilt}deg`
            }}
          />
        ))}
      </div>
    </div>
  )
}
