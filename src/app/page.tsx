"use client";
import PerformanceChart from "@/components/home/LoginUserChart";
import Statistics from "@/components/home/Statistics";
import { motion } from "framer-motion";
import { CiTimer } from "react-icons/ci";

const stats = [
  { label: "Total Posts", value: "150", change: "+12%", positive: true },
  { label: "Active Users", value: "1,234", change: "+8%", positive: true },
  { label: "Engagement Rate", value: "68%", change: "-2%", positive: false },
  { label: "Revenue", value: "$12,450", change: "+15%", positive: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  return (
    <div className="p-8 space-y-7">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Zettabyte Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor your application performance and user engagement in real-time.
        </p>
      </motion.div>

      <Statistics />
      <PerformanceChart />
      

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6  rounded-lg"
      >

        <div className="bg-neutral-800 p-3 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><CiTimer className="text-blue-500" />Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                action: "New user registered",
                time: "2 minutes ago",
                type: "user",
              },
              { action: "Post published", time: "5 minutes ago", type: "post" },
              {
                action: "System backup completed",
                time: "1 hour ago",
                type: "system",
              },
              {
                action: "Database optimized",
                time: "3 hours ago",
                type: "system",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-secondary/50  border-b "
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
                  <span className="text-sm text-foreground">
                    {activity.action}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="bg-neutral-800 p-3 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><CiTimer className="text-blue-500" />Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                action: "New user registered",
                time: "2 minutes ago",
                type: "user",
              },
              { action: "Post published", time: "5 minutes ago", type: "post" },
              {
                action: "System backup completed",
                time: "1 hour ago",
                type: "system",
              },
              {
                action: "Database optimized",
                time: "3 hours ago",
                type: "system",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-secondary/50  border-b"
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
                  <span className="text-sm text-foreground">
                    {activity.action}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* <FloatingActionButton  */}
    </div>
  );
}
