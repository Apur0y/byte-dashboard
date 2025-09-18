"use client"
import Statistics from "@/components/home/Statistics"
import { motion } from "framer-motion"


const stats = [
  { label: "Total Posts", value: "150", change: "+12%", positive: true },
  { label: "Active Users", value: "1,234", change: "+8%", positive: true },
  { label: "Engagement Rate", value: "68%", change: "-2%", positive: false },
  { label: "Revenue", value: "$12,450", change: "+15%", positive: true },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}


export default function Home() {
  return (
        <div className="p-8">
         
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Zettabyte Dashboard</h1>
        <p className="text-muted-foreground">Monitor your application performance and user engagement in real-time.</p>
      </motion.div>

 <Statistics/>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <div  className="text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center justify-center gap-1">
                  <span className={`text-sm font-medium ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div>
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          {/* <AnimatedChart /> */}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: "New user registered", time: "2 minutes ago", type: "user" },
              { action: "Post published", time: "5 minutes ago", type: "post" },
              { action: "System backup completed", time: "1 hour ago", type: "system" },
              { action: "Database optimized", time: "3 hours ago", type: "system" },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "user"
                        ? "bg-blue-500"
                        : activity.type === "post"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <span className="text-sm text-foreground">{activity.action}</span>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* <FloatingActionButton  */}
    </div>

  );
}
