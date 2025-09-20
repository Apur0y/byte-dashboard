import { Post } from '@/types/allTypes'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

interface IPost{
    post :Post
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
};



export default function PostCard({ post }: IPost) {
  return (
    <AnimatePresence>
      <motion.div
        key={post.id}
        className="bg-neutral-800 p-3 rounded-lg border border-transparent"
        variants={cardVariants}
        initial="hidden"  
        animate="visible"  
        exit="hidden"     
        whileHover={{ scale: 1.03, borderColor: "hsl(var(--primary))" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
            <Link href={`/posts/${post.id}`}>
              <div className="h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      Post #{post.id}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      User {post.userId}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground line-clamp-2 capitalize">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.body}
                  </p>
                  <div className="pt-2 border-t border-border">
                    <span className="text-xs text-primary hover:text-primary/80 transition-colors">
                      Read more →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
          </AnimatePresence>
  )
}
