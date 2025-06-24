"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "../components/ui/button"
import { Search, Book, Code, Settings, Zap } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const docSections = [
  {
    icon: Book,
    title: "API Reference",
    description: "Complete API documentation with examples",
    items: ["Functions", "Classes", "Types", "Interfaces"],
  },
  {
    icon: Code,
    title: "Examples",
    description: "Real-world usage examples and code snippets",
    items: ["Basic Usage", "Advanced Patterns", "Integration Examples", "Best Practices"],
  },
  {
    icon: Settings,
    title: "Configuration",
    description: "Configuration options and customization",
    items: ["Default Config", "Custom Options", "Environment Variables", "Plugins"],
  },
  {
    icon: Zap,
    title: "Advanced Features",
    description: "Advanced features and optimization techniques",
    items: ["Performance Tips", "Caching", "Error Handling", "Debugging"],
  },
]

export default function DocumentationPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".doc-section", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".doc-sections",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Comprehensive documentation to help you make the most of our NPM package
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="doc-sections grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {docSections.map((section, index) => (
            <div
              key={index}
              className="doc-section glass-effect rounded-xl p-8 hover:glow-effect transition-all duration-300 group cursor-pointer"
            >
              <section.icon className="h-12 w-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-3">{section.title}</h3>
              <p className="text-gray-300 mb-6">{section.description}</p>

              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Start Guide */}
        <div className="glass-effect rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Quick Reference</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Basic Example</h3>
              <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-green-400">
                  {`import { createInstance } from 'your-package';

const instance = createInstance({
  apiKey: 'your-api-key',
  debug: true
});

const result = await instance.process({
  data: 'example data',
  options: { format: 'json' }
});

console.log(result);`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Configuration</h3>
              <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-blue-400">
                  {`interface Config {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  debug?: boolean;
  retries?: number;
}

const config: Config = {
  apiKey: process.env.API_KEY,
  timeout: 5000,
  debug: false
};`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center glass-effect rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Need More Help?</h3>
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for? Check out our GitHub repository or join our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">View on GitHub</Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
