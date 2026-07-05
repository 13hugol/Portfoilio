export interface StudioData {
  brand: {
    name: string
    tagline: string
    location: string
    address: string
    phone: string
    email: string
    founded: number
    manifesto: string
    social: {
      instagram: string
      tiktok: string
      youtube: string
    }
    stats: {
      coaches: string
      members: string
      transformations: string
      years: string
    }
  }
  hero: {
    headline: string
    subhead: string
    cta: string
    ctaSecondary: string
  }
  curriculum: CurriculumProgram[]
  coaches: Coach[]
  stories: MemberStory[]
}

export interface CurriculumProgram {
  id: string
  title: string
  goal: string
  duration: string
  frequency: string
  summary: string
  pillars: string[]
  methods: string[]
}

export interface Coach {
  id: string
  name: string
  title: string
  specialty: string
  years: number
  certifications: string[]
  background: string
  achievements: string[]
}

export interface MemberStory {
  id: string
  name: string
  image: string
  program: string
  goal: string
  before: string
  after: string
  results: string[]
  quote: string
}
