"use client"

import { useEffect, useState } from "react"
import { useComparisonStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, Trash2, ArrowLeft, ArrowRight } from "lucide-react"

import Link from "next/link"

interface CareerData {
  id: string
  category: string
  career_option: string
  salary_entry: number
  salary_senior: string | number
  min_age: string | number
  max_age: string | number
  top_colleges: string[]
  skills_required: string[]
  popular_exams: string[]
  passing_criteria_12th: string
  growth_rate?: string
  demand_level?: string
}

export default function ComparePage() {
  const { selectedCareers, removeCareer, clearComparison } = useComparisonStore()
  const [careers, setCareers] = useState<CareerData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCareers() {
      if (selectedCareers.length === 0) {
        setCareers([])
        setLoading(false)
        return
      }

      try {
        const fetchedCareers = await Promise.all(
          selectedCareers.map(async (id) => {
            // Note: API needs to support single fetch or we filter client side
            // Ideally we'd have a bulk fetch or single fetch. 
            // For now let's assume we can fetch all and filter or modify API.
            // Actually, existing API is list-based. We can fetch all and find, or fetch individual if we add endpoint.
            // Let's use the list endpoint and filter for now as it's simpler without changing backend yet.
             const allRes = await fetch('/api/careers')
             const allData = await allRes.json() as Array<{ [key: string]: unknown }>
             return allData.find((c: { [key: string]: unknown }) => c.id === id)
          })
        )
        setCareers((fetchedCareers.filter((c) => c !== undefined) as unknown) as CareerData[])
      } catch (error) {
        console.error("Failed to fetch comparison data", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCareers()
  }, [selectedCareers])

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center">Loading comparison...</div>
  }

  if (careers.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Compare Careers</h1>
        <p className="text-muted-foreground mb-8">Select careers to compare side-by-side.</p>
        <Link href="/careers">
          <Button size="lg">
            Browse Careers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
           <Link href="/careers" className="text-sm text-primary hover:underline mb-2 inline-flex items-center">
              <ArrowLeft className="mr-1 h-3 w-3" /> Back to Careers
           </Link>
          <h1 className="text-3xl font-bold">Compare Careers</h1>
        </div>
        <Button variant="destructive" size="sm" onClick={clearComparison}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Headers */}
         {careers.map((career) => (
            <Card key={career.id} className="relative glass-card border-t-4 border-t-primary">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
                onClick={() => removeCareer(career.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardHeader>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">{career.category}</div>
                <CardTitle className="text-xl">{career.career_option}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                   <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Salary Range</h4>
                   <div className="flex items-baseline gap-2">
                      <span className="font-medium">₹{(career.salary_entry/100000).toFixed(1)}L</span>
                      <span className="text-muted-foreground text-xs">-</span>
                      <span className="font-medium">
                        {typeof career.salary_senior === 'string' && career.salary_senior === 'Unlimited' 
                          ? 'Unlimited' 
                          : `₹${(Number(career.salary_senior)/100000).toFixed(1)}L`}
                      </span>
                   </div>
                </div>

                <div>
                   <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Eligibility</h4>
                   <p className="text-sm">{career.passing_criteria_12th}</p>
                </div>

                 <div>
                   <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Age Limit</h4>
                    <div className="text-sm flex gap-4">
                       <div>Min: {career.min_age}</div>
                       <div>Max: {career.max_age}</div>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Education</h4>
                    <ul className="text-sm list-disc list-inside text-muted-foreground">
                       {career.top_colleges.slice(0,3).map((college, i) => (
                         <li key={i} className="truncate">{college}</li>
                       ))}
                    </ul>
                </div>
                 
                 <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Key Skills</h4>
                     <div className="flex flex-wrap gap-1">
                       {career.skills_required.slice(0,4).map((skill, i) => (
                         <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-full">{skill}</span>
                       ))}
                     </div>
                </div>
              </CardContent>
            </Card>
         ))}

         {/* Add Placeholder if less than 3 */}
         {careers.length < 3 && (
            <Link href="/careers" className="block">
              <div className="h-full min-h-[400px] border-2 border-dashed border-muted-foreground/20 rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer p-8">
                 <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6" />
                 </div>
                 <h3 className="font-semibold mb-1">Add Career</h3>
                 <p className="text-sm text-center">Select another career to compare</p>
              </div>
            </Link>
         )}
      </div>
    </div>
  )
}
