"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated, logout, isAdmin } = useAuth()
  const router = useRouter()
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Show loading state while checking auth
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b p-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold">WorkoutPal Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Welcome, {user?.firstName} {user?.lastName}
          </span>
          <Button variant="outline" onClick={() => logout()}>Sign Out</Button>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col p-6">
        {isAdmin ? (
          <div className="space-y-8">
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition cursor-pointer" onClick={() => router.push('/dashboard/users')}>
                  <h3 className="font-semibold text-lg mb-2">Manage Users</h3>
                  <p className="text-sm text-gray-600">Create, view, edit, and delete users</p>
                </div>
                <div className="border rounded-lg p-4 bg-green-50 hover:bg-green-100 transition cursor-pointer" onClick={() => router.push('/dashboard/admins')}>
                  <h3 className="font-semibold text-lg mb-2">Manage Admins</h3>
                  <p className="text-sm text-gray-600">Create new admin accounts</p>
                </div>
                <div className="border rounded-lg p-4 bg-purple-50 hover:bg-purple-100 transition cursor-pointer" onClick={() => router.push('/dashboard/analytics')}>
                  <h3 className="font-semibold text-lg mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600">View system usage and statistics</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Welcome to WorkoutPal</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your personal workout companion to track your fitness journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">My Workouts</h3>
                <p className="text-sm text-gray-600">View and manage your workout plans</p>
              </div>
              <div className="border rounded-lg p-4 bg-green-50 hover:bg-green-100 transition cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">Progress Tracking</h3>
                <p className="text-sm text-gray-600">Track your fitness progress over time</p>
              </div>
              <div className="border rounded-lg p-4 bg-orange-50 hover:bg-orange-100 transition cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">Profile Settings</h3>
                <p className="text-sm text-gray-600">Update your personal information</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}