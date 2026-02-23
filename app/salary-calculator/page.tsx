"use client"

import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, Building2, Briefcase } from "lucide-react"

// Simple adjustment factors
const CITIES = {
  "Tier 1 (Mumbai, Bengaluru, Delhi)": 1.4,
  "Tier 2 (Pune, Hyderabad, Chennai)": 1.2,
  "Tier 3 (Other Cities)": 1.0
}

const CAREERS = [
  { name: "Software Engineer", base: 450000 },
  { name: "Data Scientist", base: 600000 },
  { name: "Mechanical Engineer", base: 350000 },
  { name: "Civil Engineer", base: 300000 },
  { name: "Product Manager", base: 800000 },
  { name: "UI/UX Designer", base: 400000 },
  { name: "Chartered Accountant", base: 700000 },
  { name: "Investment Banker", base: 900000 },
  { name: "Digital Marketer", base: 300000 }
]

export default function SalaryCalculator() {
  const [career, setCareer] = useState(CAREERS[0].name)
  const [experience, setExperience] = useState([0])
  const [city, setCity] = useState("Tier 2 (Pune, Hyderabad, Chennai)")
  const [estimatedSalary, setEstimatedSalary] = useState(0)

  const calculateSalary = useCallback(() => {
    const selectedCareer = CAREERS.find(c => c.name === career) || CAREERS[0]
    const base = selectedCareer.base
    
    // Experience multiplier (approx 15% increment per year)
    const expMultiplier = 1 + (experience[0] * 0.15)
    
    // City adjustment
    const cityMultiplier = CITIES[city as keyof typeof CITIES]
    
    const total = base * expMultiplier * cityMultiplier
    setEstimatedSalary(Math.round(total))
  }, [career, experience, city])

  // Call calculateSalary when dependencies change
  useEffect(() => {
    calculateSalary()
  }, [calculateSalary])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
            <Calculator className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Salary Calculator
          </h1>
          <p className="text-xl text-muted-foreground">
            Estimate your potential earnings based on role, experience, and location.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Calculate Your Worth</CardTitle>
                <CardDescription>Adjust the parameters below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Career Select */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Role
                  </label>
                  <Select value={career} onValueChange={setCareer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Career" />
                    </SelectTrigger>
                    <SelectContent>
                      {CAREERS.map(c => (
                        <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" /> Experience
                    </label>
                    <span className="text-sm font-bold text-primary">{experience[0]} Years</span>
                  </div>
                  <Slider
                    value={experience}
                    onValueChange={setExperience}
                    max={30}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Fresher</span>
                    <span>15 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>

                {/* City Select */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Location
                  </label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select City Tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(CITIES).map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </CardContent>
            </Card>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
             <Card className="h-full bg-primary/5 border-primary/20 flex flex-col justify-center items-center text-center p-8">
               <div className="mb-2 text-muted-foreground font-medium uppercase tracking-wider">Estimated Annual Salary</div>
               <div className="text-5xl font-bold text-primary mb-2">
                 {formatCurrency(estimatedSalary)}
               </div>
               <div className="text-sm text-muted-foreground mb-8">
                 (Approximate gross annual income)
               </div>

               <div className="grid grid-cols-2 gap-4 w-full">
                 <div className="p-4 bg-background/50 rounded-lg">
                   <div className="text-sm text-muted-foreground mb-1">Monthly (In-hand approx)</div>
                   <div className="font-semibold text-lg">{formatCurrency(estimatedSalary / 12 * 0.85)}</div>
                 </div>
                 <div className="p-4 bg-background/50 rounded-lg">
                   <div className="text-sm text-muted-foreground mb-1">Weekly</div>
                   <div className="font-semibold text-lg">{formatCurrency(estimatedSalary / 52)}</div>
                 </div>
               </div>

               <Button className="mt-8 w-full" variant="outline">
                 Download Report
               </Button>
             </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
