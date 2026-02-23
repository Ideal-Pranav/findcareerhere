"use client"

import { motion } from "framer-motion"
import { Sparkles, LayoutDashboard } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useComparisonStore } from "@/lib/store"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const selectedCount = useComparisonStore((state) => state.selectedCareers.length)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Sparkles className="h-6 w-6 text-primary" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="h-6 w-6 text-primary/50" />
              </motion.div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Career Finder
            </h1>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/quiz" className="text-sm font-medium hover:text-primary transition-colors">
              Take Quiz
            </Link>
            <Link href="/colleges" className="text-sm font-medium hover:text-primary transition-colors">
              Colleges
            </Link>
            <Link href="/scholarships" className="text-sm font-medium hover:text-primary transition-colors">
              Scholarships
            </Link>
            <Link href="/salary-calculator" className="text-sm font-medium hover:text-primary transition-colors">
              Salary Calculator
            </Link>
            <Link href="/compare" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
              Compare
              {selectedCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                  {selectedCount}
                </span>
              )}
            </Link>
            <Link href="/careers" className="text-sm font-medium hover:text-primary transition-colors">
              Explore Careers
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link 
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "text-muted-foreground hover:text-primary"
              )}
            >
              <LayoutDashboard className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
