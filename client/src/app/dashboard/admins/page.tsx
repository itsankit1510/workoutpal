"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import * as UserService from "@/lib/services/user-service"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertCircle, Search, Plus, Shield, Loader2 } from "lucide-react"

export default function AdminsPage() {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  
  const [admins, setAdmins] = useState<UserService.User[]>([])
  const [isAdminLoading, setIsAdminLoading] = useState(true)
  const [actionInProgress, setActionInProgress] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [createFormData, setCreateFormData] = useState<UserService.CreateUserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "admin", // Default to admin role
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Add state for client-side rendering
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }

    // Redirect to dashboard if not admin
    if (!isLoading && isAuthenticated && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isLoading, isAuthenticated, isAdmin, router])

  // Fetch admins on component mount
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchAdmins()
    }
  }, [isAuthenticated, isAdmin])

  // Format date safely with client-side rendering
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Never";
    if (!isClient) return ""; // Return empty during server render
    
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return "Invalid date";
    }
  }

  // Function to fetch admin users from API
  const fetchAdmins = async () => {
    try {
      setIsAdminLoading(true)
      setError(null)
      const token = localStorage.getItem("accessToken") || ""
      
      // Handle the wrapped response
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch users');
      }
      
      // Extract users from the wrapped response and filter for admins
      const users = responseData.data?.users || [];
      const adminUsers = users.filter((user: UserService.User) => user.role === "admin");
      setAdmins(adminUsers)
    } catch (err: any) {
      console.error("Error fetching admin users:", err)
      setError(err.message || "Failed to load admin users.")
    } finally {
      setIsAdminLoading(false)
    }
  }

  // Handle create admin form changes
  const handleCreateFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value })
  }

  // Handle create admin form submit
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setActionInProgress(true)
    
    try {
      const token = localStorage.getItem("accessToken") || ""
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createFormData),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create admin');
      }

      setSuccess("Admin user created successfully!")
      setCreateFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "admin",
      })
      fetchAdmins() // Refresh admin list
      setShowCreateDialog(false) // Close dialog
    } catch (err: any) {
      console.error("Error creating admin user:", err)
      setError(err.message || "Failed to create admin user")
    } finally {
      setActionInProgress(false)
    }
  }

  // Filter admins based on search term
  const filteredAdmins = admins.filter((admin) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      admin.firstName?.toLowerCase().includes(searchLower) ||
      admin.lastName?.toLowerCase().includes(searchLower) ||
      admin.email?.toLowerCase().includes(searchLower)
    )
  })

  // Show loading state while checking auth
  if (isLoading || !isAuthenticated || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b p-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/dashboard")} className="text-gray-600 hover:text-gray-900">
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Manage Administrators</h1>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-center gap-2 text-red-600">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-600">
            {success}
          </div>
        )}
        
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Button onClick={() => setShowCreateDialog(true)} disabled={actionInProgress}>
              {actionInProgress ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}{" "}
              Create Admin
            </Button>
          </div>
          
          {isAdminLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm text-gray-500">Loading administrators...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Last Login</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmins.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No admin users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-500" />
                          {admin.firstName} {admin.lastName}
                          {admin.id === user?.id && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-2">(You)</span>}
                        </TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{isClient ? formatDate(admin.createdAt) : ""}</TableCell>
                        <TableCell>{isClient ? formatDate(admin.lastLogin) : ""}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      
      {/* Create Admin Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Admin</DialogTitle>
            <DialogDescription>
              Add a new administrator to the system. All fields are required.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreateAdmin} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={createFormData.firstName}
                  onChange={handleCreateFormChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={createFormData.lastName}
                  onChange={handleCreateFormChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={createFormData.email}
                onChange={handleCreateFormChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={createFormData.password}
                onChange={handleCreateFormChange}
                required
                minLength={8}
              />
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)} disabled={actionInProgress}>
                Cancel
              </Button>
              <Button type="submit" disabled={actionInProgress}>
                {actionInProgress ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                  </>
                ) : (
                  "Create Admin"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}