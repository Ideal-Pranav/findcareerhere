"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Glow effect layer */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[49] blur-sm"
        style={{ 
          scaleX,
          background: "linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 50%, rgba(236, 72, 153, 0.8) 100%)"
        }}
      />
      {/* Main progress bar with shadow */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
        style={{ scaleX }}
      />
    </>
  )
}

