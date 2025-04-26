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
import { AlertCircle, Search, Plus, Trash2, Loader2 } from "lucide-react"

export default function UsersPage() {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  
  const [users, setUsers] = useState<UserService.User[]>([])
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [actionInProgress, setActionInProgress] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [userToDelete, setUserToDelete] = useState<UserService.User | null>(null)
  const [createFormData, setCreateFormData] = useState<UserService.CreateUserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
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

  // Fetch users on component mount
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchUsers()
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

  // Function to fetch users from API
  const fetchUsers = async () => {
    try {
      setIsUserLoading(true)
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
      
      // Extract users from the wrapped response
      const users = responseData.data?.users || [];
      setUsers(users)
    } catch (err: any) {
      console.error("Error fetching users:", err)
      setError(err.message || "Failed to load users.")
    } finally {
      setIsUserLoading(false)
    }
  }

  // Handle create user form changes
  const handleCreateFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value })
  }

  // Handle create user form submit
  const handleCreateUser = async (e: React.FormEvent) => {
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
        throw new Error(responseData.message || 'Failed to create user');
      }

      setSuccess("User created successfully!")
      setCreateFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
      })
      fetchUsers() // Refresh user list
      setShowCreateDialog(false) // Close dialog
    } catch (err: any) {
      console.error("Error creating user:", err)
      setError(err.message || "Failed to create user")
    } finally {
      setActionInProgress(false)
    }
  }

  // Handle delete user
  const handleDeleteUser = async () => {
    if (!userToDelete) return

    setActionInProgress(true)
    try {
      setError(null)
      const token = localStorage.getItem("accessToken") || ""
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }

      setSuccess("User deleted successfully!")
      fetchUsers() // Refresh user list
      setShowDeleteDialog(false) // Close dialog
      setUserToDelete(null)
    } catch (err: any) {
      console.error("Error deleting user:", err)
      setError(err.message || "Failed to delete user")
    } finally {
      setActionInProgress(false)
    }
  }

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.role?.toLowerCase().includes(searchLower)
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
          <h1 className="text-2xl font-bold">Manage Users</h1>
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
                placeholder="Search users..."
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
              Create User
            </Button>
          </div>
          
          {isUserLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm text-gray-500">Loading users...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={user.role === "admin" ? "text-blue-600 font-medium" : ""}>
                            {user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : "User"}
                          </span>
                        </TableCell>
                        <TableCell>{isClient ? formatDate(user.createdAt) : ""}</TableCell>
                        <TableCell>{isClient ? formatDate(user.lastLogin) : ""}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setUserToDelete(user)
                              setShowDeleteDialog(true)
                            }}
                            disabled={actionInProgress || user.id === user?.id} 
                            title={user.id === user?.id ? "Cannot delete yourself" : "Delete user"}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      
      {/* Create User Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system. All fields are required.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreateUser} className="space-y-4 mt-4">
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
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={createFormData.role}
                onChange={handleCreateFormChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
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
                  "Create User"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the user <span className="font-semibold">{userToDelete?.firstName} {userToDelete?.lastName}</span> ({userToDelete?.email})? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={actionInProgress}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={actionInProgress}>
              {actionInProgress ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                </>
              ) : (
                "Delete User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}