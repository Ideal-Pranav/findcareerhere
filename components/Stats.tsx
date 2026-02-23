"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import * as React from "react"

export function Stats() {
  const stats = React.useMemo(() => [
    { value: 48, label: "Career Options", suffix: "+" },
    { value: 100, label: "Accuracy", suffix: "%" },
    { value: 12, label: "Categories", suffix: "+" },
    { value: 50, label: "Top Colleges", suffix: "+" },
  ], [])

  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const increment = stat.value / 50 // 50 steps for animation
      let current = 0

      return setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timers[index])
        }
        setCounts((prev) => {
          const next = [...prev]
          next[index] = Math.floor(current)
          return next
        })
      }, 30)
    })

    return () => timers.forEach(clearInterval)
  }, [stats])

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            By The Numbers
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-2">
                <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {counts[index]}{stat.suffix}
                </span>
              </div>
              <p className="text-muted-foreground text-lg font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
