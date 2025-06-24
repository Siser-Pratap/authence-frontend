"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create floating particles
    const particles = Array.from({ length: 20 }, (_, i) => {
      const particle = document.createElement("div")
      particle.className = `absolute rounded-full opacity-20`

      // Random colors and sizes
      const colors = ["bg-blue-400", "bg-purple-400", "bg-cyan-400", "bg-pink-400", "bg-green-400"]
      const sizes = ["w-2 h-2", "w-3 h-3", "w-4 h-4", "w-1 h-1"]

      particle.classList.add(colors[Math.floor(Math.random() * colors.length+i)])
      particle.classList.add(...sizes[Math.floor(Math.random() * sizes.length+i)].split(" "))

      // Random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      container.appendChild(particle)
      return particle
    })

    // Animate particles
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: 10 + Math.random() * 20,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: i * 0.1,
      })

      gsap.to(particle, {
        opacity: 0.1 + Math.random() * 0.3,
        duration: 2 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: i * 0.2,
      })
    })

    return () => {
      particles.forEach((particle) => particle.remove())
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} />
}
