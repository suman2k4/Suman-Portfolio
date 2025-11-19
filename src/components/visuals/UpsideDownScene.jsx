import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'

function Spores() {
  const ref = useRef()
  const positions = useMemo(() => {
    const pts = []
    for (let i = 0; i < 300; i += 1) {
      pts.push((Math.random() - 0.5) * 8)
      pts.push((Math.random() - 0.5) * 4)
      pts.push((Math.random() - 0.5) * 6)
    }
    return new Float32Array(pts)
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.0015
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 4) * 0.1
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#e50914" size={0.08} sizeAttenuation depthWrite={false} />
    </Points>
  )
}

export default function UpsideDownScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[2, 2, 2]} intensity={0.8} color="#ff1a3c" />
        <Spores />
      </Canvas>
    </div>
  )
}
