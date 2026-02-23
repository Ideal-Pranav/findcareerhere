"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Building2, TrendingUp, ExternalLink } from "lucide-react"
import { PageHeader } from "@/components/PageHeader"

interface College {
  id: string
  name: string
  location: string
  rating: number
  fees_range: string
  placement_avg: string
  website: string
  image: string
  career_category: string
  admission_process: string
}

const CATEGORIES = [
  "All",
  "Engineering & Tech",
  "Healthcare & Medicine",
  "Business & Management",
  "Law & Governance",
  "Design & Arts"
]

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  useEffect(() => {
    async function fetchColleges() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.append("search", search)
        if (category && category !== "All") params.append("category", category)

        const res = await fetch(`/api/colleges?${params.toString()}`)
        const data = await res.json()
        setColleges(data)
      } catch (error) {
        console.error("Failed to fetch colleges", error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchColleges, 300)
    return () => clearTimeout(timer)
  }, [search, category])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-8 mb-8">
        <PageHeader 
          title="Find Your Dream College" 
          description="Discover top-rated institutes with detailed insights on fees, placements, and rankings."
          icon={<Building2 className="h-6 w-6 text-primary" />}
        />

        {/* Search & Filters Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl glass-card">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name 'IIT' or location 'Delhi'..."
              className="pl-10 h-10 bg-background/50 border-white/10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[200px] bg-background/50 border-white/10">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[300px] rounded-xl bg-card/50 animate-pulse" />
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-20 bg-card/30 rounded-xl border border-dashed">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors group overflow-hidden">
                  <div className="h-40 bg-muted relative overflow-hidden">
                    {/* College Image */}
                    {college.image && (
                      <img 
                        src={college.image} 
                        alt={college.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                    {!college.image && (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white/10 select-none">
                        {college.name.substring(0, 2)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-2 py-1 rounded-md flex items-center text-xs font-bold text-primary">
                      <Star className="h-3 w-3 mr-1 fill-primary" />
                      {college.rating}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge variant="secondary" className="mb-2 bg-primary/20 hover:bg-primary/30 text-primary-foreground border-none">
                        {college.career_category.split('&')[0]}
                      </Badge>
                      <h3 className="text-xl font-bold leading-tight">{college.name}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      {college.location}
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 border-y border-border/50">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Fees</div>
                        <div className="font-semibold text-sm">{college.fees_range}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Placement</div>
                        <div className="font-semibold text-sm text-green-500 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {college.placement_avg}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/50">
                       <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Admission Process</div>
                       <div className="font-semibold text-sm truncate" title={college.admission_process}>
                         {college.admission_process || "N/A"}
                       </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 pt-0">
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/90 px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
