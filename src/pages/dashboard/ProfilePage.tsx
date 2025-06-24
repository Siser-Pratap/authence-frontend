"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { User, Mail, Calendar, Crown, Shield, Edit } from "lucide-react"
import { gsap } from "gsap"

export default function ProfilePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const userName = localStorage.getItem("userName") || "John Doe"
  const userEmail = localStorage.getItem("userEmail") || "john@example.com"

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current?.children) {
        gsap.from(Array.from(containerRef.current.children), {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        })
      }

      if (cardsRef.current?.children) {
        gsap.from(Array.from(cardsRef.current.children), {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-2 glass-effect border-white/20 glow-effect">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-400" />
              Personal Information
            </CardTitle>
            <CardDescription className="text-gray-400">Your account details and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 ring-4 ring-blue-400/50">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-white">{userName}</h3>
                <p className="text-gray-400">Software Developer</p>
                <Badge className="mt-2 bg-green-600/20 text-green-400 border-green-600/50">Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-white">{userName}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="text-white">{userEmail}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Member Since</label>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="text-white">January 2024</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Account Type</label>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center">
                  <Crown className="h-4 w-4 text-yellow-400 mr-2" />
                  <p className="text-white">Pro Plan</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan & Security Card */}
        <div className="space-y-6">
          <Card className="glass-effect border-white/20 glow-effect">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Crown className="h-5 w-5 mr-2 text-yellow-400" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-600/50">
                  <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                  <p className="text-yellow-400">$29/month</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>API Calls</span>
                    <span className="text-white">100,000/month</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Rate Limit</span>
                    <span className="text-white">1000/min</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Support</span>
                    <span className="text-white">Priority</span>
                  </div>
                </div>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">Upgrade Plan</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/20 glow-effect">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-400" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Two-Factor Auth</span>
                <Badge className="bg-green-600/20 text-green-400 border-green-600/50">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Last Login</span>
                <span className="text-white text-sm">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Password</span>
                <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:text-white">
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
