"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiHome } from "react-icons/hi";
import { FcDocument } from "react-icons/fc";
import { BiUser } from "react-icons/bi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const navigation = [
  { name: "Dashboard", href: "/", icon: HiHome },
  { name: "Posts", href: "/posts", icon: FcDocument },
  { name: "Users", href: "/users", icon: BiUser },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-card border-r border-border z-50 "
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold text-primary"
            >
              Zettabyte
            </motion.h1>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
        >
          {
            isCollapsed ? (
              //  <ChevronRightIcon className="w-4 h-4" />
              <MdKeyboardDoubleArrowLeft />
            ) : (
              <MdKeyboardDoubleArrowLeft className="rotate-180" />
            )
            //  <ChevronLeftIcon className="w-4 h-4" />
          }
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative ${
                isActive
                  ? "bg-neutral-800 text-primary-foreground"
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}

        <Link href={"/login"}>
          <button className="mt-7 border px-5 py-2 rounded-md cursor-pointer">
            Log Out
          </button>
        </Link>
      </nav>
    </motion.div>
  );
}
