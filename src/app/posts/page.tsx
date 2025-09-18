"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useFetch } from "@/hooks/useFetch"
import { Post } from "@/types/allTypes"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function PostsPage() {
  const [showError, setShowError] = useState(false)
  const {
    data: posts,
    loading,
    error
  } = useFetch<Post[]>(
    showError ? "https://jsonplaceholder.typicode.com/invalid-posts" : "https://jsonplaceholder.typicode.com/posts",
  )

  const handleToggleError = () => {
    setShowError(!showError)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          {/* <LoadingSpinner size="lg" /> */}Loading...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Posts</h1>
          <p className="text-muted-foreground">Explore all blog posts and articles.</p>
        </div>
        {/* <ErrorMessage message={error} onRetry={refetch} className="max-w-md" /> */}
        <button
          onClick={handleToggleError}
          className="mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
        >
          {showError ? "Load Valid Posts" : "Simulate Error"}
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Posts</h1>
            <p className="text-muted-foreground">Explore all blog posts and articles.</p>
          </div>
          <button
            onClick={handleToggleError}
            className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-md hover:bg-destructive/20 transition-colors"
          >
            {showError ? "Load Valid Posts" : "Simulate Error"}
          </button>
        </div>
        <div className="text-sm text-muted-foreground">Found {posts?.length || 0} posts</div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts?.map((post) => (
          <motion.div key={post.id} variants={cardVariants}>
            <Link href={`/posts/${post.id}`}>
              <div className="h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">Post #{post.id}</span>
                    <span className="text-xs text-muted-foreground">User {post.userId}</span>
                  </div>
                  <h3 className="font-semibold text-foreground line-clamp-2 capitalize">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.body}</p>
                  <div className="pt-2 border-t border-border">
                    <span className="text-xs text-primary hover:text-primary/80 transition-colors">Read more →</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
