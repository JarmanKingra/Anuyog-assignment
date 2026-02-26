"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

 return (
  <main className="min-h-screen text-[var(--text-main)] bg-[var(--bg-main)] [background:radial-gradient(circle_at_top_left,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.15),transparent_40%),var(--bg-main)]">

    {/* Navbar */}
    <nav className="flex justify-between items-center px-12 py-6">
      <div className="text-2xl font-bold">HabitFlow</div>

      <div className="flex items-center gap-8">
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-[var(--primary)] px-5 py-2 rounded-lg text-white hover:opacity-90 transition"
        >
          Sign In
        </button>
      </div>
    </nav>

    {/* Hero */}
    <section className="text-center mt-24 px-4">
      <h1 className="text-6xl font-bold leading-tight">
        Build Better Habits <br />
        <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
          Stay Consistent Every Day
        </span>
      </h1>

      <p className="max-w-xl mx-auto mt-6 text-lg text-[var(--text-muted)]">
        A simple and powerful habit tracking platform designed to help you build discipline, stay accountable, and achieve long-term goals.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <input
          type="email"
          placeholder="Your work email"
          className="w-64 px-4 py-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-default)] text-white outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <button
          onClick={() => router.push("/auth/register")}
          className="px-6 py-3 rounded-lg text-white bg-[image:var(--btn-primary)] hover:opacity-90 transition"
        >
          Start for free
        </button>
      </div>

      <p className="mt-4 text-sm text-[var(--text-light)]">
        No credit card required · Free forever for individuals
      </p>
    </section>

  </main>
);
}
