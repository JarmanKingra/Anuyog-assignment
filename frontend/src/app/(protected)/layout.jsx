"use client";

import ProtectedRoute from "@/components/guards/protectedRoute";

export default function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
        <div>
        {children}
      </div>
    </ProtectedRoute>
  );
}
