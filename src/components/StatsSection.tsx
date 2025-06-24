"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Download, Star, Users, GitBranch } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const stats = [
  { icon: Download, label: "Downloads", value: 125000, suffix: "+" },
  { icon: Star, label: "GitHub Stars", value: 2400, suffix: "+" },
  { icon: Users, label: "Active Users", value: 15000, suffix: "+" },
  { icon: GitBranch, label: "Contributors", value: 45, suffix: "" },
]

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      tl.from(statsRef.current ? Array.from(statsRef.current.children) : [], {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
      })

      // Animate numbers
      stats.forEach((stat, index) => {
        gsap.to(
          { value: 0 },
          {
            value: stat.value,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              setAnimatedValues((prev) => {
                const newValues = [...prev]
                newValues[index] = Math.floor(this.targets()[0].value)
                return newValues
              })
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // useLayoutEffect(() => {
  //   if (!statsRef.current) return

  //   const ctx = gsap.context(() => {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top 70%",
  //         toggleActions: "play none none reverse",
  //       },
  //     })

  //     tl.from(Array.from(statsRef.current.children), {
  //       opacity: 0,
  //       y: 50,
  //       duration: 0.8,
  //       stagger: 0.2,
  //     })

  //     stats.forEach((stat, index) => {
  //       tl.to(
  //         { value: 0 },
  //         {
  //           value: stat.value,
  //           duration: 1.2,
  //           ease: "power2.out",
  //           onUpdate: function () {
  //             setAnimatedValues((prev) => {
  //               const newValues = [...prev]
  //               newValues[index] = Math.floor(this.targets()[0].value)
  //               return newValues
  //             })
  //           },
  //         },
  //         "<" // start at the same time as fade-in
  //       )
  //     })
  //   }, sectionRef)

  //   return () => ctx.revert()
  // }, [])
  
  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by <span className="gradient-text">Developers Worldwide</span>
          </h2>
          <p className="text-gray-300 text-lg">Join thousands of developers who rely on our package</p>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-6 text-center hover:glow-effect transition-all duration-300 group"
            >
              <stat.icon className="h-12 w-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-white mb-2">
                {animatedValues[index].toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
