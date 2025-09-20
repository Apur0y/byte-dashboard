"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiHome } from "react-icons/hi";
import { FcDocument } from "react-icons/fc";
import { BiUser } from "react-icons/bi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const navigation = [
  { name: "Dashboard", href: "/", icon: HiHome },
  { name: "Posts", href: "/posts", icon: FcDocument },
  { name: "Users", href: "/users", icon: FaUsers },
  { name: "Profile", href: "/profile", icon: BiUser },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const refDiv=useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const handleOutside=(event:MouseEvent)=>{
      if(refDiv && !refDiv.current?.contains(event.target as Node)){
        setIsCollapsed(true)
      }
    }
    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };

  },[])

  return (
    <motion.div
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onHoverStart={()=>setIsCollapsed(false)}
      ref={refDiv}
      className={`fixed left-0 top-0 h-full bg-card  z-50  ${isCollapsed? "":"bg-black"}`}
    >
      <div className={`flex items-center justify-between p-4  `}>
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold text-primary bg-black"
            >
              Zettabyte
            </motion.h1>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer bg-neutral-600/50"
        >
          {
            isCollapsed ? (
              
              <MdKeyboardDoubleArrowLeft />
            ) : (
              <MdKeyboardDoubleArrowLeft className="rotate-180" />
            )
           
          }
        </button>
      </div>

      <nav className={`p-4 space-y-2 bg-black ${isCollapsed? "hidden md:flex flex-col":""}`}>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={()=>setIsCollapsed(true)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative ${
                isActive
                  ? "bg-neutral-800 text-primary-foreground"
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`${isCollapsed? "hidden md:flex":""}`}>

              <item.icon className="w-5 h-5 flex-shrink-0" />
              </div>
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

     
      </nav>
    </motion.div>
  );
}
