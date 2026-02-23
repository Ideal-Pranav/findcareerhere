"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CompareButton } from "@/components/CompareButton"
import { Badge } from "@/components/ui/badge"
import { Career } from "@/types/career"
import { formatCurrency } from "@/lib/utils"
import { ArrowRight, TrendingUp } from "lucide-react"
import { useState } from "react"

interface CareerCardProps {
  career: Career
  onViewDetails: (career: Career) => void
  index: number
}

const streamColors: Record<string, string> = {
  "Science (PCM)": "bg-blue-500/20 text-blue-300 border-blue-500/50",
  "Science (PCB)": "bg-teal-500/20 text-teal-300 border-teal-500/50",
  "Science (PCB/PCM)": "bg-cyan-500/20 text-cyan-300 border-cyan-500/50",
  "Commerce": "bg-green-500/20 text-green-300 border-green-500/50",
  "Arts": "bg-purple-500/20 text-purple-300 border-purple-500/50",
  "Any Stream": "bg-orange-500/20 text-orange-300 border-orange-500/50",
}

export function CareerCard({ career, onViewDetails, index }: CareerCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="h-full glass-card border-white/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group overflow-hidden relative">
        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-primary/10 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-2 gap-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
              {career.career_option}
            </CardTitle>
            <Badge
              className={`${streamColors[career.stream] || streamColors["Any Stream"]} border shrink-0`}
              variant="outline"
            >
              {career.stream.split(' (')[1]?.replace(')', '') || career.stream}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground line-clamp-2">
            {career.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Entry Salary:</span>
              <span className="font-semibold text-primary">
                {formatCurrency(career.salary_entry)}
              </span>
            </div>
            
            <Badge variant="secondary" className="text-xs">
              {career.category}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="relative z-10">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex gap-2 mt-auto pt-4 border-t border-white/10">
              <Button 
                variant="glow"
                className="flex-1 group/btn"
                onClick={() => onViewDetails(career)}
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
              <CompareButton careerId={career.id} />
            </div>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
