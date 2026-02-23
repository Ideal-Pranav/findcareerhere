"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { usePathname } from "next/navigation"
import type { Points as PointsType } from "three"

function generateSphere(count: number, radius: number) {
  const points = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random())
    const theta = Math.random() * 2 * Math.PI
    const phi = Math.acos(2 * Math.random() - 1)
    
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)
    
    points[i * 3] = x
    points[i * 3 + 1] = y
    points[i * 3 + 2] = z
  }
  return points
}

interface StarsProps {
  [key: string]: unknown
}

function Stars(props: StarsProps) {
  const ref = useRef<PointsType>(null)
  const [sphere] = useState<Float32Array>(() => generateSphere(1500, 1.2))

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x -= 0.005
      ref.current.rotation.y -= 0.0067
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#888888"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function ParticleField() {
   return (
      <group>
        <Stars />
      </group>
   )
}

export function Background3D() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isHome) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  )
}
