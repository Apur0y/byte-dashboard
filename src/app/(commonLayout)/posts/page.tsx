"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { Post } from "@/types/allTypes";
import PostCard from "@/components/reusable/PostCard";
import Loader from "@/components/Loader";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};



export default function PostsPage() {
  const [showError, setShowError] = useState(false);
  const {
    data: posts,
    loading,
    error
  } = useFetch<Post[]>( showError ? "https://jsonplaceholder.typicode.com/invalid-posts" : "https://jsonplaceholder.typicode.com/posts");

  const handleToggleError = () => {
    setShowError(!showError);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
         <Loader/>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Posts</h1>
          <p className="text-muted-foreground">Explore all blog posts and articles.</p>
        </div>
        <button
          onClick={handleToggleError}
          className="mt-4 px-4 py-2 bg-neutral-700 text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors cursor-pointer"
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
            <p className="text-muted-foreground">
              Explore all blog posts and articles.
            </p>
          </div>
          <button
            onClick={handleToggleError}
            className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-md hover:bg-destructive/20 transition-colors"
          >
            {showError ? "Load Valid Posts" : "Simulate Error"}
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          Found {posts?.length || 0} posts
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts?.map((post) => <PostCard key={post.id} post={post}/>)}
      </motion.div>
    </div>
  );
}
