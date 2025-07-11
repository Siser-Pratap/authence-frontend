"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Menu, X, BookOpen } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-effect" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-lg">NPM Docs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/getting-started" className="text-gray-300 hover:text-white transition-colors">
              Getting Started
            </Link>
            <Link to="/documentation" className="text-gray-300 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link to="/examples" className="text-gray-300 hover:text-white transition-colors">
              Examples
            </Link>
            <Link to="/api" className="text-gray-300 hover:text-white transition-colors">
              API Reference
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass-effect rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/getting-started" className="text-gray-300 hover:text-white transition-colors">
                Getting Started
              </Link>
              <Link to="/documentation" className="text-gray-300 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link to="/examples" className="text-gray-300 hover:text-white transition-colors">
                Examples
              </Link>
              <Link to="/api" className="text-gray-300 hover:text-white transition-colors">
                API Reference
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
