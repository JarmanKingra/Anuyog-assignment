"use client";

import ProtectedRoute from "@/components/guards/protectedRoute";
import Navbar from "@/components/Layouts/navbar";

export default function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <Navbar/>
        <div>
        {children}
      </div>
    </ProtectedRoute>
  );
}
