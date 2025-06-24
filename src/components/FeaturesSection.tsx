"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Zap, Shield, Puzzle } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    icon: Code,
    title: "TypeScript First",
    description: "Built with TypeScript for better developer experience and type safety.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance with minimal bundle size and maximum efficiency.",
  },
  {
    icon: Shield,
    title: "Battle Tested",
    description: "Thoroughly tested with comprehensive test coverage and CI/CD pipeline.",
  },
  {
    icon: Puzzle,
    title: "Easy Integration",
    description: "Simple API design that integrates seamlessly with your existing codebase.",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.from(titleRef.current, {
  //       opacity: 0,
  //       y: 50,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: titleRef.current,
  //         start: "top 80%",
  //         toggleActions: "play none none reverse",
  //       },
  //     })

  //     gsap.from(cardsRef.current?.children, {
  //       opacity: 0,
  //       y: 50,
  //       duration: 0.8,
  //       stagger: 0.2,
  //       scrollTrigger: {
  //         trigger: cardsRef.current,
  //         start: "top 80%",
  //         toggleActions: "play none none reverse",
  //       },
  //     })
  //   }, sectionRef)

  //   return () => ctx.revert()
  // }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50, duration:0.2 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger:{
            trigger: titleRef.current,
          }
        }
      )

      gsap.fromTo(
        ".features",
        { opacity: 0, y: 50, duration:0 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger:{
            trigger: cardsRef.current,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Why Choose Our <span className="gradient-text">NPM Package</span>?
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect features rounded-xl p-6 hover:glow-effect transition-all duration-300 group cursor-pointer"
            >
              <feature.icon className="h-12 w-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
  }
