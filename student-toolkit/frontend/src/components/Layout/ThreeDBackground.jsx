<<<<<<< HEAD
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Float } from '@react-three/drei'
import * as THREE from 'three'

const Particles = () => {
  const particles = Array.from({ length: 100 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ],
    color: i % 3 === 0 ? '#8A2BE2' : i % 3 === 1 ? '#4169E1' : '#FF10F0',
    scale: Math.random() * 0.5 + 0.1,
  }))

  return (
    <>
      {particles.map((particle, index) => (
        <Float key={index} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[particle.scale]} position={particle.position}>
            <meshStandardMaterial color={particle.color} emissive={particle.color} emissiveIntensity={0.2} />
          </Sphere>
        </Float>
      ))}
    </>
  )
}

const ThreeDBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <color attach="background" args={['#1E1E2E']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8A2BE2" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#4169E1" />
        <Particles />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

=======
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Float } from '@react-three/drei'
import * as THREE from 'three'

const Particles = () => {
  const particles = Array.from({ length: 100 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ],
    color: i % 3 === 0 ? '#8A2BE2' : i % 3 === 1 ? '#4169E1' : '#FF10F0',
    scale: Math.random() * 0.5 + 0.1,
  }))

  return (
    <>
      {particles.map((particle, index) => (
        <Float key={index} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[particle.scale]} position={particle.position}>
            <meshStandardMaterial color={particle.color} emissive={particle.color} emissiveIntensity={0.2} />
          </Sphere>
        </Float>
      ))}
    </>
  )
}

const ThreeDBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <color attach="background" args={['#1E1E2E']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8A2BE2" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#4169E1" />
        <Particles />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
export default ThreeDBackground