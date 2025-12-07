import { Canvas } from '@react-three/fiber'
import InteractiveParticles from './InteractiveParticles'

const lightningBolts = [
  { id: 'bolt-a', left: '18%', tilt: -8, delay: 0.4, duration: 5.4 },
  { id: 'bolt-b', left: '46%', tilt: 4, delay: 1.8, duration: 6.8 },
  { id: 'bolt-c', right: '14%', tilt: -13, delay: 3.2, duration: 7.2 },
  { id: 'bolt-d', left: '32%', tilt: 2, delay: 4.6, duration: 5.8 }
]

export default function UpsideDownScene() {
  return (
    <div className="upside-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.2, 4], fov: 55 }}
        dpr={[1, 1.35]}
        eventSource={document.body}
        eventPrefix="client"
      >
        <color attach="background" args={['#050101']} />
        <ambientLight intensity={0.25} />
        <pointLight position={[2, 2, 2]} intensity={0.7} color="#83d8ff" />
        <pointLight position={[-3, -1, -2]} intensity={0.5} color="#3056d3" />

        <InteractiveParticles count={440} size={0.082} color="#ff9eb5" spread={[10, 5, 7]} />
        <InteractiveParticles count={340} size={0.062} color="#7dd3fc" spread={[12, 6, 10]} />
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
