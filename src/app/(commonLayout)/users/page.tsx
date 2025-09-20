"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/allTypes";
import { RxCrossCircled } from "react-icons/rx";
import Loader from "@/components/Loader";
interface LabelProps {
  children: React.ReactNode;
}

interface DetailsProps {
  label: string;
  value: string | number | null;
}

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const outRef =useRef<HTMLDivElement>(null)

  const {
    data: users,
    loading
  } = useFetch<User[]>( "https://jsonplaceholder.typicode.com/users");

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (outRef.current && !outRef.current.contains(event.target as Node)) {
  
        setSelectedUser(null); 
      } else {
     
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outRef]);



    if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
         <Loader/>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Users</h1>
            <p className="text-muted-foreground">
              Manage and view user information.
            </p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {users?.length || 0} users registered
        </div>
      </motion.div>

      <div className="overflow-hidden">
        <div className="">
          <motion.table
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className="w-full  "
          >
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Company
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody >
              {users?.map((user) => (
                <motion.tr
                  key={user.id}
                  variants={rowVariants}
                  onClick={() => handleUserClick(user)}
                  className="border-b border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-foreground">
                        {user.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        @{user.username}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-foreground">{user.email}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-foreground">{user.company.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.company.catchPhrase}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-foreground">{user.phone}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>

   

{selectedUser && (
  <AnimatePresence>
    <motion.div
      key="user-modal"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }} // 👈 closing animation
      transition={{
        duration: 0.4,
        ease: "easeInOut",
        type: "spring",
        stiffness: 120,
      }}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 overflow-y-auto"
    >
      <motion.div
        ref={outRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }} // 👈 content fade/scale out
        transition={{ duration: 0.3 }}
        className="bg-background rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg relative"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-red-700 transition-colors cursor-pointer"
          onClick={handleCloseModal}
          aria-label="Close"
        >
          <RxCrossCircled className="size-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto shadow-md border">
              <span className="text-3xl font-bold text-primary">
                {selectedUser.name.charAt(0)}
              </span>
            </div>
            <span className="absolute bottom-1 right-1 block w-4 h-4 rounded-full bg-green-500 ring-2 ring-background"></span>
          </div>

          <h2 className="text-2xl font-bold mt-4 text-foreground">
            {selectedUser.name}
          </h2>
          <p className="text-muted-foreground text-sm">
            @{selectedUser.username}
          </p>
        </div>

        {/* Details */}
        <div className="grid gap-5 text-sm">
          <DetailBlock label="Email" value={selectedUser.email} />
          <DetailBlock label="Phone" value={selectedUser.phone} />
          <DetailBlock label="Website" value={selectedUser.website} />

          <div>
            <Label>Address</Label>
            <p className="text-foreground">
              {selectedUser.address.street}, {selectedUser.address.suite}
              <br />
              {selectedUser.address.city}, {selectedUser.address.zipcode}
            </p>
          </div>

          <div>
            <Label>Company</Label>
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                {selectedUser.company.name}
              </p>
              <p className="text-muted-foreground">
                {selectedUser.company.catchPhrase}
              </p>
              <p className="text-muted-foreground">{selectedUser.company.bs}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}

    </div>
  );
}

const Label = ({ children }: LabelProps) => (
  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
    {children}
  </label>
);

const DetailBlock = ({ label, value }: DetailsProps) => (
  <div>
    <Label>{label}</Label>
    <p className="text-foreground">{value}</p>
  </div>
);
