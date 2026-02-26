"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";

export default function NotificationBanner() {
  const { message, type, clear } = useNotificationStore();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(clear, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, clear]);

  if (!message) return null;

  return (
  <div
    className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg min-w-[280px] flex justify-between items-center z-[9999] text-sm
    sm:top-4
    max-[480px]:top-3 max-[480px]:left-3 max-[480px]:right-3 max-[480px]:translate-x-0 max-[480px]:min-w-0 max-[480px]:w-auto max-[480px]:text-[13px]
    ${
      type === "success"
        ? "bg-[#e6f9f0] text-[#13795b]"
        : type === "error"
        ? "bg-[#fdecea] text-[#b42318]"
        : "bg-[#eef2ff] text-[#3730a3]"
    }`}
  >
    <span>{message}</span>

    <button
      onClick={clear}
      className="ml-4 bg-none border-none cursor-pointer text-base max-[480px]:text-lg max-[480px]:pl-2"
    >
      ✕
    </button>
  </div>
);
}
