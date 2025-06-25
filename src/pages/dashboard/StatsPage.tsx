"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { TrendingUp, TrendingDown, Activity, Users, Zap, Clock } from "lucide-react"
import { gsap } from "gsap"

const statsData = [
  {
    title: "Total API Calls",
    value: 45678,
    change: "+12.5%",
    trend: "up",
    icon: Activity,
    color: "blue",
  },
  {
    title: "Active Users",
    value: 1234,
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "green",
  },
  {
    title: "Response Time",
    value: 145,
    change: "-5.1%",
    trend: "down",
    icon: Clock,
    color: "purple",
    suffix: "ms",
  },
  {
    title: "Success Rate",
    value: 99.8,
    change: "+0.3%",
    trend: "up",
    icon: Zap,
    color: "yellow",
    suffix: "%",
  },
]

export default function Statspage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [animatedValues, setAnimatedValues] = useState(statsData.map(() => 0))

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
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        })
      }

      // Animate numbers
      statsData.forEach((stat, index) => {
        gsap.to(
          { value: 0 },
          {
            value: stat.value,
            duration: 2,
            ease: "power2.out",
            delay: 0.5 + index * 0.1,
            onUpdate: function () {
              setAnimatedValues((prev) => {
                const newValues = [...prev]
                newValues[index] = this.targets()[0].value
                return newValues
              })
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  const formatValue = (value: number, suffix?: string) => {
    if (suffix === "%") {
      return value.toFixed(1) + suffix
    }
    if (suffix === "ms") {
      return Math.round(value) + suffix
    }
    return Math.round(value).toLocaleString()
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-600/20 to-cyan-600/20 border-blue-600/50 text-blue-400",
      green: "from-green-600/20 to-emerald-600/20 border-green-600/50 text-green-400",
      purple: "from-purple-600/20 to-pink-600/20 border-purple-600/50 text-purple-400",
      yellow: "from-yellow-600/20 to-orange-600/20 border-yellow-600/50 text-yellow-400",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div ref={containerRef} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Statistics</h1>
        <p className="text-gray-400">Monitor your API usage and performance metrics</p>
      </div>

      {/* Stats Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="glass-effect border-white/20 hover:glow-effect transition-all duration-300 group"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {formatValue(animatedValues[index], stat.suffix)}
                  </p>
                  <div className="flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(stat.color)} group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-white/20 glow-effect">
          <CardHeader>
            <CardTitle className="text-white">API Usage Trend</CardTitle>
            <CardDescription className="text-gray-400">Daily API calls over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                  style={{
                    height: `${Math.random() * 80 + 20}%`,
                    width: "calc(100% / 30 - 4px)",
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 glow-effect">
          <CardHeader>
            <CardTitle className="text-white">Response Time</CardTitle>
            <CardDescription className="text-gray-400">Average response time over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-1">
              {Array.from({ length: 24 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-purple-600 to-pink-400 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                  style={{
                    height: `${Math.random() * 60 + 40}%`,
                    width: "calc(100% / 24 - 2px)",
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-effect border-white/20 glow-effect">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription className="text-gray-400">Latest API calls and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "2 minutes ago", event: "API call to /users endpoint", status: "success" },
              { time: "5 minutes ago", event: "Rate limit warning triggered", status: "warning" },
              { time: "12 minutes ago", event: "New API key generated", status: "info" },
              { time: "1 hour ago", event: "Bulk data export completed", status: "success" },
              { time: "2 hours ago", event: "System maintenance completed", status: "info" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-400"
                        : activity.status === "warning"
                          ? "bg-yellow-400"
                          : "bg-blue-400"
                    }`}
                  />
                  <span className="text-white">{activity.event}</span>
                </div>
                <span className="text-gray-400 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
