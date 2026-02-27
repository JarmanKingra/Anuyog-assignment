"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Habits", path: "/myHabits" },
  ];

  return (
    <nav className="w-full bg-blue-950  px-6 py-4 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1
          onClick={() => router.push("/dashboard")}
          className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
        >
          Consistency Tracker
        </h1>

        {/* For Laptiop Sized */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`cursor-pointer transition-colors duration-200 ${
                pathname === item.path
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
          <button
              onClick={() => {
                    logout();
                    router.replace("/auth/login");
                  }}
              className={`cursor-pointer transition-colors duration-200 text-gray-400`}
            >
              Logout
            </button>
        </div>

        {/* Mobile Hamburger icon */}
        <button
          className="md:hidden text-gray-300 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* For Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                router.push(item.path);
                setOpen(false);
              }}
              className={`text-left cursor-pointer  ${
                pathname === item.path
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
          <button
              onClick={() => {
                    logout();
                    router.replace("/auth/login");
                  }}
              className={`text-left cursor-pointer transition-colors duration-200 text-gray-400`}
            >
              Logout
            </button>
        </div>
      )}
    </nav>
  );
}