"use client";

import { useEffect, useState } from "react";
import { clientServer } from "@/lib/index";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/store/notificationStore";
import ButtonSpinner from "@/components/loaders/longSpinnerLoader";


export default function LoginPage() {
  const router = useRouter();
  const loginStore = useAuthStore((s) => s.login);
  const token = useAuthStore((s) => s.token);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const notify = useNotificationStore((s) => s.show);

  useEffect(() => {
    if (token && isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [token, isLoggedIn]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      notify("Email and password are required", "error");
      return;
    }
    try {
      setLoading(true);
      const res = await clientServer.post("api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      const user = res.data.user;

      if (!token || !user) {
        notify("Unexpected server response", "error");
        return;
      }

      loginStore(token, user);

      notify("Login successful 🎉", "success");
      router.push("/dashboard");
    } catch (err) {
      notify(err.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
    <div className="w-full max-w-md p-8 rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">

      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        Login
      </h1>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          className="px-4 py-3 text-sm rounded-lg border border-gray-300 outline-none focus:border-black transition"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="px-4 py-3 text-sm rounded-lg border border-gray-300 outline-none focus:border-black transition"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="mt-2 py-3 text-base font-semibold rounded-lg bg-black text-white hover:bg-gray-800 transition disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? <ButtonSpinner text="Logging in..." /> : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a href="/auth/register" className="text-black font-medium">
          Register
        </a>
      </div>
    </div>
  </div>
);
}
