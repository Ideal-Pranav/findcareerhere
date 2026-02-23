"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, Clock, Award, ChevronRight, UserCircle } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

interface BookmarkItem {
  id: string
  career_id: string
  created_at: number
  // Career details joined
  career_option: string
  category: string
  salary_entry: number
  salary_senior: number
}

interface QuizResult {
  id: string
  results: string // JSON string
  created_at: number
  score: string // JSON string
}

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookmarksRes, quizRes] = await Promise.all([
          fetch('/api/bookmarks?userId=demo-user'),
          fetch('/api/quiz?userId=demo-user')
        ])

        const bookmarksData = await bookmarksRes.json()
        const quizData = await quizRes.json()

        setBookmarks(Array.isArray(bookmarksData) ? bookmarksData : [])
        setQuizResults(Array.isArray(quizData) ? quizData : [])
      } catch (error) {
        console.error("Failed to fetch dashboard data", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center gap-6 mb-12 p-8 rounded-2xl glass-card border-white/20 bg-gradient-to-r from-primary/10 to-transparent"
        >
          <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-background">
            <UserCircle className="h-12 w-12 text-primary" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-1">Student Profile</h1>
            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Demo Account
            </p>
          </div>
          <div className="ml-auto flex gap-4">
             <div className="text-center px-4 py-2 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold">{bookmarks.length}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Saved</div>
             </div>
             <div className="text-center px-4 py-2 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold">{quizResults.length}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Quizzes</div>
             </div>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <Tabs defaultValue="bookmarks" className="space-y-8">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="bookmarks" className="gap-2">
              <Bookmark className="h-4 w-4" /> Saved Careers
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" /> Activity History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookmarks">
            {bookmarks.length === 0 ? (
               <div className="text-center py-20 bg-card/30 rounded-xl border border-dashed">
                 <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                 <h3 className="text-xl font-semibold mb-2">No saved careers yet</h3>
                 <p className="text-muted-foreground mb-6">Explore careers and save them for later</p>
                 <Link href="/careers">
                   <Button>Explore Careers</Button>
                 </Link>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="glass-card hover:border-primary/50 transition-all h-full flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-destructive">
                             <Bookmark className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                        <CardTitle className="text-xl">{item.career_option}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <div className="space-y-4 mb-6 flex-1">
                          <div className="flex justify-between items-center text-sm">
                             <span className="text-muted-foreground">Entry Salary</span>
                             <span className="font-semibold">{formatCurrency(item.salary_entry)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                             <span className="text-muted-foreground">Senior Salary</span>
                             <span className="font-semibold">{formatCurrency(item.salary_senior)}</span>
                          </div>
                        </div>
                        <Link href={`/careers`}>
                          <Button className="w-full group" variant="outline">
                            View Roadmap 
                            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
             {quizResults.length === 0 ? (
                <div className="text-center py-20 bg-card/30 rounded-xl border border-dashed">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No recent activity</h3>
                  <Link href="/quiz">
                    <Button variant="outline">Take Assessment</Button>
                  </Link>
                </div>
             ) : (
                <div className="space-y-4">
                  {quizResults.map((result) => {
                    const matches = JSON.parse(result.results);
                    const topMatch = matches[0];
                    return (
                      <Card key={result.id} className="glass-card hover:bg-white/5 transition-colors">
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Award className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">Career Assessment Result</h4>
                            <p className="text-sm text-muted-foreground">
                              Top Match: <span className="text-primary font-medium">{topMatch.name}</span> ({topMatch.percentage}% Match)
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                             {new Date(result.created_at * 1000).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
             )}
          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}
