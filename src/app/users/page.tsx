"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useFetch } from "@/hooks/useFetch"
import { User } from "@/types/allTypes"

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
}

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showError, setShowError] = useState(false)

  const {
    data: users,
    loading,
    error
  } = useFetch<User[]>(
    showError ? "https://jsonplaceholder.typicode.com/invalid-users" : "https://jsonplaceholder.typicode.com/users",
  )

  const handleToggleError = () => {
    setShowError(!showError)
  }

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
  }

  const handleCloseModal = () => {
    setSelectedUser(null)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          {/* <LoadingSpinner size="lg" /> */}
          Loading...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Users</h1>
          <p className="text-muted-foreground">Manage and view user information.</p>
        </div>
        {/* <ErrorMessage message={error} onRetry={refetch} className="max-w-md" /> */}
        <button
          onClick={handleToggleError}
          className="mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
        >
          {showError ? "Load Valid Users" : "Simulate Error"}
        </button>
      </div>
    )
  }

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Users</h1>
            <p className="text-muted-foreground">Manage and view user information.</p>
          </div>
          <button
            onClick={handleToggleError}
            className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-md hover:bg-destructive/20 transition-colors"
          >
            {showError ? "Load Valid Users" : "Simulate Error"}
          </button>
        </div>
        <div className="text-sm text-muted-foreground">{users?.length || 0} users registered</div>
      </motion.div>

      <div>
        <div className="overflow-x-auto">
          <motion.table variants={tableVariants} initial="hidden" animate="visible" className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <motion.tr
                  key={user.id}
                  variants={rowVariants}
                  onClick={() => handleUserClick(user)}
                  className="border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">@{user.username}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-foreground">{user.email}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-foreground">{user.company.name}</div>
                      <div className="text-sm text-muted-foreground">{user.company.catchPhrase}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-foreground">{user.phone}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>

      {/* <Modal isOpen={!!selectedUser} onClose={handleCloseModal} title="User Details">
        {selectedUser && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">{selectedUser.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">{selectedUser.name}</h3>
              <p className="text-muted-foreground">@{selectedUser.username}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground">{selectedUser.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <p className="text-foreground">{selectedUser.phone}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Website</label>
                <p className="text-foreground">{selectedUser.website}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="text-foreground">
                  {selectedUser.address.street}, {selectedUser.address.suite}
                  <br />
                  {selectedUser.address.city}, {selectedUser.address.zipcode}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Company</label>
                <div className="space-y-1">
                  <p className="text-foreground font-medium">{selectedUser.company.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.company.catchPhrase}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.company.bs}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Send Message
              </button>
              <button className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        )}
      </Modal> */}
    </div>
  )
}
