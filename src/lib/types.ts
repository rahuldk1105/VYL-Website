export interface Event {
  _id: string
  title: string
  description: string
  sport: string
  tier: 'Lions' | 'Tigers' | 'Panthers'
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