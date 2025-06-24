"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)


  useEffect(()=>{
    const ctx= gsap.context(() => {

      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
      }
      });

      gsap.to(imageRef.current, {
        y:-50, 
        scrollTrigger:{
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });


    }, containerRef);
    return () => ctx.revert();
  });

  

  return (
    <section ref={containerRef} className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div ref={imageRef} className="relative glass-effect rounded-2xl p-8 glow-effect">
          <img
            src="/placeholder.svg?height=800&width=1200"
            alt="NPM Package Documentation Dashboard"
            className="w-full h-auto rounded-lg"
          />

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-80 animate-bounce"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-60 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
