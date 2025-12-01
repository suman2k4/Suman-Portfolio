import { useMemo } from 'react'

const sporeCount = 60
const lightningStrikes = [
  { id: 'l-a', left: '18%', delay: 1.2 },
  { id: 'l-b', left: '62%', delay: 2.4 }
]

export default function StrangerBackground() {
  const spores = useMemo(
    () =>
      Array.from({ length: sporeCount }).map((_, idx) => ({
        id: idx,
        x: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 6,
        drift: -2 + Math.random() * 4,
        scale: 0.6 + Math.random() * 0.7
      })),
    []
  )

  return (
    <div className="stranger-bg" aria-hidden="true">
      <div className="stranger-bg__sky" />
      <div className="stranger-bg__stars" />
      <div className="stranger-bg__moon" />
      <div className="stranger-bg__ridge" />
      <div className="stranger-bg__trees" />
      <div className="stranger-bg__fog" />
      <div className="stranger-bg__spores">
        {spores.map((spore) => (
          <span
            key={spore.id}
            className="stranger-spore"
            style={{
              left: `${spore.x}%`,
              animationDelay: `${spore.delay}s`,
              animationDuration: `${spore.duration}s`,
              width: `${spore.size}px`,
              height: `${spore.size}px`,
              '--drift-x': `${spore.drift}vw`,
              '--spore-scale': spore.scale
            }}
          />
        ))}
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
