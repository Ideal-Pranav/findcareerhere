"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { CareerMatch } from "@/data/quiz-questions"

interface QuizResultsProps {
  matches: CareerMatch[]
  onRetake: () => void
}

export function QuizResults({ matches, onRetake }: QuizResultsProps) {
  if (!matches || matches.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4">No matches found</h2>
        <p className="mb-4">It seems we couldn&apos;t find any career matches based on your answers.</p>
        <Button onClick={onRetake}>Retake Quiz</Button>
      </div>
    )
  }

  const topMatch = matches[0]

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Your Career Matches!</h1>
        <p className="text-xl text-muted-foreground">
          Based on your responses, here are your top 5 career recommendations
        </p>
      </motion.div>

      {/* Top Match Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="glass-card border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Best Match</span>
            </div>
            <CardTitle className="text-3xl">{topMatch.careerName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Match Score</span>
                <span className="text-2xl font-bold text-primary">
                  {topMatch.matchPercentage}%
                </span>
              </div>
              <Progress value={topMatch.matchPercentage} className="h-3" />
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 rounded-lg bg-background/50">
                <div className="text-2xl font-bold text-primary">{topMatch.score.interests}%</div>
                <div className="text-xs text-muted-foreground">Interests</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/50">
                <div className="text-2xl font-bold text-primary">{topMatch.score.skills}%</div>
                <div className="text-xs text-muted-foreground">Skills</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/50">
                <div className="text-2xl font-bold text-primary">{topMatch.score.preferences}%</div>
                <div className="text-xs text-muted-foreground">Preferences</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/50">
                <div className="text-2xl font-bold text-primary">{topMatch.score.lifestyle}%</div>
                <div className="text-xs text-muted-foreground">Lifestyle</div>
              </div>
            </div>

            <Link href={`/careers?selected=${topMatch.careerId}`}>
              <Button className="w-full" size="lg">
                Explore This Career
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Other Matches */}
      <div className="space-y-4 mb-8">
        {matches.slice(1).map((match, index) => (
          <motion.div
            key={match.careerId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className="glass-card hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-semibold">
                        #{index + 2}
                      </div>
                      <h3 className="text-xl font-semibold">{match.careerName}</h3>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Progress value={match.matchPercentage} className="flex-1 h-2" />
                      <span className="text-lg font-bold text-primary min-w-[4ch]">
                        {match.matchPercentage}%
                      </span>
                    </div>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>Interests: {match.score.interests}%</span>
                      <span>•</span>
                      <span>Skills: {match.score.skills}%</span>
                      <span>•</span>
                      <span>Preferences: {match.score.preferences}%</span>
                    </div>
                  </div>
                  <Link href={`/careers?selected=${match.careerId}`}>
                    <Button variant="outline" size="sm">
                      View Details
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={onRetake} size="lg">
          <TrendingUp className="mr-2 h-4 w-4" />
          Retake Quiz
        </Button>
        <Link href="/careers">
          <Button size="lg">
            Browse All Careers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
