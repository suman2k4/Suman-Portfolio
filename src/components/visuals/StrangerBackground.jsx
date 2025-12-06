import { Canvas } from '@react-three/fiber'
import InteractiveParticles from './InteractiveParticles'

const lightningStrikes = [
  { id: 'l-a', left: '18%', delay: 1.2 },
  { id: 'l-b', left: '62%', delay: 2.4 }
]

export default function StrangerBackground() {
  return (
    <div className="stranger-bg" aria-hidden="true">
      <div className="stranger-bg__sky" />
      <div className="stranger-bg__stars" />
      {/* Moon and Ridge removed as per request */}
      <div className="stranger-bg__trees" />
      <div className="stranger-bg__fog" />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ alpha: true, antialias: false }}
          eventSource={document.body}
          eventPrefix="client"
        >
          <InteractiveParticles count={120} color="#ffffff" size={0.12} spread={14} />
        </Canvas>
      </div>

      <div className="stranger-bg__lightning">
        {lightningStrikes.map((bolt) => (
          <span key={bolt.id} className="stranger-bolt" style={{ left: bolt.left, animationDelay: `${bolt.delay}s` }} />
        ))}
      </div>
      <div className="stranger-bg__scanlines" />
    </div>
  )
}
