// app/profile/page.tsx  (or pages/profile.tsx if using Pages Router)
"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router=useRouter()

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;
  const handleLogin=()=>{
    router.push("/login")
  }

  if (!session)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-xl">You are not logged in.</p>
        <button
          onClick={() => handleLogin()}
          className="px-6 py-2 text-white border rounded-lg hover:bg-neutral-800 transition cursor-pointer"
        >
          Log In
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className=" shadow-md rounded-lg p-8 flex flex-col items-center">
        <Image
          src={session.user?.image ?? ""}
          alt={session.user?.name ?? "User"}
          className="w-32 h-32 rounded-full mb-4"
          height={200}
          width={200}
        />
        <h1 className="text-2xl font-semibold mb-2">{session.user?.name}</h1>
        <p className="text-gray-600 mb-6">{session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
