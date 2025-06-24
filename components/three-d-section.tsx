"use client"

import { Suspense, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text3D } from "@react-three/drei"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[-2, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.6} roughness={0.3} />
      </mesh>
    </Float>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <FloatingCube />
      <FloatingSphere />
      <Text3D font="/fonts/Inter_Bold.json" size={0.5} height={0.1} position={[0, 1.5, 0]}>
        NPM
        <meshStandardMaterial color="#06b6d4" />
      </Text3D>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      <Environment preset="city" />
    </>
  )
}

export function ThreeDSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(canvasRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interactive <span className="gradient-text">3D Experience</span>
          </h2>
          <p className="text-gray-300 text-lg">Explore our package capabilities in an immersive 3D environment</p>
        </div>

        <div ref={canvasRef} className="h-96 glass-effect rounded-2xl overflow-hidden">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  )
}
