"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useFetch } from "@/hooks/useFetch"
import { Post } from "@/types/allTypes"

interface PostDetailPageProps {
  params: {
    id: string
  }
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const {
    data: post,
    loading,
    error
  } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${params.id}`)

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          {/* <LoadingSpinner size="lg" /> */}
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <Link href="/posts" className="text-primary hover:text-primary/80 transition-colors text-sm">
            ← Back to Posts
          </Link>
        </div>
       
      </div>
    )
  }

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Link href="/posts" className="text-primary hover:text-primary/80 transition-colors text-sm">
          ← Back to Posts
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl"
      >
        <div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">Post #{post.id}</span>
              <span className="text-sm text-muted-foreground">By User {post.userId}</span>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl font-bold text-foreground capitalize leading-tight"
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="prose prose-invert max-w-none"
            >
              <p className="text-foreground leading-relaxed text-lg">{post.body}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-6 border-t border-border"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Published by User {post.userId}</div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Like
                  </button>
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
