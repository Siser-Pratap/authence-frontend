"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import { gsap } from "gsap"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          buttonsRef.current?.children,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.3",
        )

      // Floating animation for the hero section
      gsap.to(heroRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-16">
      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-400 rounded-full opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Enhance <span className="gradient-text">Development Efficiency</span> with
          <br />
          Our NPM Package
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          A powerful, lightweight, and feature-rich NPM package designed to streamline your development workflow. Built
          with modern TypeScript, comprehensive documentation, and developer-first approach.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg glow-effect group">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg group"
          >
            <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Install Package
          </Button>
        </div>

        {/* Installation command */}
        <div className="mt-12 glass-effect rounded-lg p-4 max-w-md mx-auto">
          <code className="text-green-400 text-sm">npm install your-awesome-package</code>
        </div>
      </div>
    </section>
  )
}
