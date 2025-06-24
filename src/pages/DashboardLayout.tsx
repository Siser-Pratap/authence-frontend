"use client"

import { useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { DashboardSidebar } from "@/components/DashboardSideBar"
import { BackgroundAnimation } from "@/components/ui/BackgroundAnimation"

export default function DashboardLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      navigate("/signin")
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex">
      <BackgroundAnimation />
      <DashboardSidebar />
      <main className="flex-1 md:ml-0 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
