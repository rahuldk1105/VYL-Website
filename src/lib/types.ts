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
  registrationUrlTeam?: string
  registrationUrlIndividual?: string
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