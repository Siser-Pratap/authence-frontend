"use client"

import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ArrowRight, Download } from "lucide-react"
import { gsap } from "gsap"
s

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const particleRef = useRef<HTMLDivElement>(null)

  

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline();

       tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scaleY: 0.8,
        ease: "power3.out",
      })
      .from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")

      .from(buttonsRef.current ? Array.from(buttonsRef.current.children) : [],
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.3")
    

    gsap.to(heroRef.current, {
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }, heroRef)

    gsap.set(".particle", {
        x:()=> Math.random() * window.innerWidth,
        y:()=> Math.random() * window.innerHeight,
        opacity:()=> Math.random() * 0.5 + 0.1,
        scale:()=> Math.random() * 0.5 + 0.5,
    });

    gsap.to(".particle", {
        x:()=> Math.random() * window.innerWidth,
        y:()=> Math.random() * window.innerHeight,
        rotation: "+=15",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        opacity:0.2,
        yoyo: true,
        stagger: 0.1,
      });

    

  return () => {
      ctx.revert() 
    }
});


  

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        {[...Array(20)].map((_, i) => (
              <div
                key={i}
                ref={particleRef}
                className="particle absolute rounded-full top-1/4 bottom-1/4 left-0 bg-indigo-700 boundary opacity-10 animate-pulse"
                style={{
                  width: `${10 + i * 0.5 * 10 + 25}px`,
                  height: `${10 + i * 0.5* 10 + 25}px`,
                }}
              
            />
          ))
          }
      {/* Glowing orb */}
      {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-400 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div> */}

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
          <Link to="/getting-started">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg glow-effect group">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
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
