"use client"

import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-14 h-8" /> // Avoid hydration mismatch

  const isDark = theme === "dark"

  return (
    <div
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full cursor-pointer p-1 transition-colors duration-300 ${
        isDark ? "bg-slate-800 border border-slate-700" : "bg-sky-100 border border-sky-200"
      }`}
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        <Sun className="h-4 w-4 text-amber-500 opacity-50" />
        <Moon className="h-4 w-4 text-indigo-400 opacity-50" />
      </div>

      {/* Sliding Knob */}
      <motion.div
        className="w-6 h-6 rounded-full shadow-md flex items-center justify-center relative z-10"
        initial={false}
        animate={{
          x: isDark ? 32 : 0,
          backgroundColor: isDark ? "#1e293b" : "#ffffff", // slate-800 vs white
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className="h-4 w-4 text-indigo-400 fill-indigo-400/20" />
          ) : (
            <Sun className="h-4 w-4 text-amber-500 fill-amber-500/20" />
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
