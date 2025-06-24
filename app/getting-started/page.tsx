"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    title: "Installation",
    description: "Install the package using your preferred package manager",
    code: "npm install your-awesome-package\n# or\nyarn add your-awesome-package\n# or\npnpm add your-awesome-package",
  },
  {
    title: "Import",
    description: "Import the package in your project",
    code: 'import { AwesomeFunction } from "your-awesome-package";\n\n// or using CommonJS\nconst { AwesomeFunction } = require("your-awesome-package");',
  },
  {
    title: "Basic Usage",
    description: "Start using the package with a simple example",
    code: 'const result = AwesomeFunction({\n  option1: "value1",\n  option2: true,\n  option3: 42\n});\n\nconsole.log(result);',
  },
]

export default function GettingStartedPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(stepsRef.current?.children, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <main ref={containerRef} className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Getting <span className="gradient-text">Started</span>
        </h1>

        <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Follow these simple steps to integrate our NPM package into your project and start building amazing
          applications.
        </p>

        <div ref={stepsRef} className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="glass-effect rounded-xl p-8 hover:glow-effect transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {index + 1}
                </div>
                <h2 className="text-2xl font-bold text-white">{step.title}</h2>
              </div>

              <p className="text-gray-300 mb-6">{step.description}</p>

              <div className="relative">
                <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
                  <code className="text-green-400">{step.code}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 bg-gray-800 border-gray-600 hover:bg-gray-700"
                  onClick={() => copyToClipboard(step.code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-effect rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">You're All Set!</h3>
          <p className="text-gray-300 mb-6">
            Congratulations! You've successfully installed and configured the package. Now you can explore the full
            documentation to unlock all features.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Explore Documentation</Button>
        </div>
      </div>
    </main>
  )
}
