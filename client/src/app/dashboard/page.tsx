"use client"

import { UserButton, useAuth } from "@clerk/nextjs"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth()
  const router = useRouter()
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/login")
    }
  }, [isLoaded, userId, router])

  // Show loading state or nothing while checking auth
  if (!isLoaded || !userId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">WorkoutPal Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </header>
      
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl space-y-8 text-center">
          <h2 className="text-4xl font-bold">Hello World!</h2>
          <p className="text-xl text-gray-600">
            Welcome to your protected dashboard. This page is only accessible after authentication.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button>Start Your Journey</Button>
          </div>
        </div>
      </main>
    </div>
  )
}