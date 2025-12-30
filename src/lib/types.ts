export interface Event {
  _id: string
  title: string
  description: string
  sport: string
  startDate: string
  endDate: string
  location: string
  maxTeams: number
  registrationDeadline: string
  image: string
  slug: {
    current: string
  }
  features: string[]
  matchFormats: {
    name: string
    description: string
  }[]
  price: number
  currency: string
  registrationUrl?: string
  organizer?: string
  tagline?: string
  ageGroups?: {
    boys?: { category: string; bornOnOrAfter: string }[]
    girls?: { category: string; bornOnOrAfter: string }[]
  }
  matchRules?: {
    general: string[]
    standbyTime: number
  }
  matchSpecifications?: {
    category: string
    ballSize: number
    time: string
    subs: string
    players: string
  }[]
  merchandise?: {
    players: string[]
    champions: string[]
  }
}

export interface Gallery {
  _id: string
  title: string
  description: string
  event: string
  date: string
  location: string
  thumbnail: string
  slug: {
    current: string
  }
  images: {
    url: string
    caption: string
    photographer?: string
  }[]
  categories: string[]
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: 'news' | 'announcement' | 'story' | 'update'
  authorName: string
  authorImage?: string
  publishedAt: string
  isFeatured: boolean
  tags: string[]
  readTimeMinutes: number
}

export interface Team {
  id: string
  name: string
  shortName: string
  logo: string
  ageGroup: string
}

export interface Match {
  id: string
  homeTeamId: string
  awayTeamId: string
  homeTeam?: Team
  awayTeam?: Team
  homeScore: number | null
  awayScore: number | null
  startTime: string
  status: 'scheduled' | 'live' | 'completed'
  ageGroup: string
  venue?: string
}

export interface Standing {
  teamId: string
  teamName: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: string[] // 'W', 'D', 'L'
  position: number
  isEliminated?: boolean // For knockout context if needed
}