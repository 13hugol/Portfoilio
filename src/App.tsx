import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import EducationSection from './components/EducationSection'
import ContactSection from './components/ContactSection'
import MatrixRain from './components/MatrixRain'

interface PortfolioData {
  personalInfo: {
    name: string
    title: string
    tagline: string
    location: string
    website: string
    email: string
    github: string
    linkedin: string
    avatar: string
  }
  bio: {
    summary: string
    philosophy: string
    about: string
  }
  achievements: Array<{
    title: string
    description: string
  }>
  skills: Record<string, string[]>
  projects: Array<{
    id: string
    title: string
    subtitle: string
    year: string
    liveUrl?: string
    repoUrl?: string
    description: string
    techStack: string[]
    features: string[]
    highlights: string
    performance?: string
  }>
  education: {
    degree: string
  }
  certifications: Array<{
    title: string
    description: string
  }>
  keywords: string[]
}

function App() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/portfolio-data.json')
        const portfolioData = await response.json()
        setData(portfolioData)
      } catch (error) {
        console.error('Error loading portfolio data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-pure-black flex items-center justify-center">
        <div className="text-matrix-green font-mono text-xl">Loading system...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-pure-black flex items-center justify-center">
        <div className="text-red-500 font-mono text-xl">Error loading portfolio data</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pure-black text-text-primary overflow-x-hidden">
      <MatrixRain />
      <Navigation />
      
      <main>
        <HeroSection data={data.personalInfo} />
        <AboutSection data={data.bio} achievements={data.achievements} />
        <SkillsSection skills={data.skills} />
        <ProjectsSection projects={data.projects} />
        <EducationSection 
          education={data.education} 
          certifications={data.certifications} 
        />
        <ContactSection contactInfo={data.personalInfo} />
      </main>
    </div>
  )
}

export default App