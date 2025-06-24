"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { User, BarChart3, Key, LogOut, Menu, X } from "lucide-react"
import { gsap } from "gsap"

const sidebarItems = [
  { icon: User, label: "Profile", path: "/dashboard/profile" },
  { icon: BarChart3, label: "Stats", path: "/dashboard/stats" },
  { icon: Key, label: "API Keys", path: "/dashboard/api-keys" },
]

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  const userName = localStorage.getItem("userName") || "User"
  const userEmail = localStorage.getItem("userEmail") || "user@example.com"

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sidebarRef.current, {
        x: -300,
        duration: 0.8,
        ease: "power3.out",
      })

      if (itemsRef.current?.children) {
        gsap.from(Array.from(itemsRef.current.children), {
          opacity: 0,
          x: -50,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    navigate("/signin")
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden glass-effect text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full w-80 glass-effect border-r border-white/20 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:z-auto`}
      >
        <div className="p-6">
          {/* User Profile Section */}
          <div className="flex items-center space-x-3 mb-8">
            <Avatar className="h-12 w-12 ring-2 ring-blue-400">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-semibold">{userName}</h3>
              <p className="text-gray-400 text-sm">{userEmail}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav ref={itemsRef} className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 glow-effect"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-blue-400" : "group-hover:text-white"}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
