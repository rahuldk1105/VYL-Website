import { Event } from './types'

export const mockEvents: Event[] = [
  {
    _id: '1',
    title: 'Elite Football Championship 2024',
    description: 'Premier football tournament featuring top teams from across Asia. Compete for the championship title and showcase your talent.',
    sport: 'Football',
    tier: 'Lions',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    location: 'Chennai, Tamil Nadu',
    maxTeams: 32,
    registrationDeadline: '2024-02-28',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
    slug: { current: 'elite-football-championship-2024' },
    features: [
      'Professional referees',
      'Live streaming',
      'Trophy ceremony',
      'Player awards',
      'Medical support'
    ],
    matchFormats: [
      { name: 'Group Stage', description: 'Round-robin format with 8 groups of 4 teams' },
      { name: 'Knockout Stage', description: 'Single elimination from quarterfinals to final' }
    ],
    price: 1500,
    currency: 'INR'
  },
  {
    _id: '2',
    title: 'Basketball Premier League',
    description: 'High-intensity basketball tournament for elite teams. Experience professional-level competition and facilities.',
    sport: 'Football',
    tier: 'Tigers',
    startDate: '2024-04-20',
    endDate: '2024-04-22',
    location: 'Bengaluru, Karnataka',
    maxTeams: 24,
    registrationDeadline: '2024-04-05',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
    slug: { current: 'basketball-premier-league' },
    features: [
      'Professional courts',
      'Electronic scoring',
      'Video analysis',
      'Coaching clinics',
      'Player statistics'
    ],
    matchFormats: [
      { name: 'Preliminary Round', description: 'Pool play with 6 groups of 4 teams' },
      { name: 'Championship Bracket', description: 'Single elimination tournament' }
    ],
    price: 1200,
    currency: 'INR'
  },
  {
    _id: '3',
    title: 'Youth Tennis Open',
    description: 'Developmental tennis tournament for young athletes. Perfect platform to gain competitive experience.',
    sport: 'Football',
    tier: 'Panthers',
    startDate: '2024-05-10',
    endDate: '2024-05-12',
    location: 'New Delhi, Delhi',
    maxTeams: 16,
    registrationDeadline: '2024-04-25',
    image: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
    slug: { current: 'youth-tennis-open' },
    features: [
      'Professional coaching',
      'Skill development',
      'Parent workshops',
      'Equipment support',
      'Progress tracking'
    ],
    matchFormats: [
      { name: 'Round Robin', description: 'Guaranteed matches for all participants' },
      { name: 'Consolation Draw', description: 'Additional matches for eliminated players' }
    ],
    price: 800,
    currency: 'INR'
  },
  {
    _id: '4',
    title: 'Volleyball Beach Championship',
    description: 'Exciting beach volleyball tournament on pristine sands. Team up and compete in a tropical paradise.',
    sport: 'Football',
    tier: 'Tigers',
    startDate: '2024-06-15',
    endDate: '2024-06-17',
    location: 'Hyderabad, Telangana',
    maxTeams: 20,
    registrationDeadline: '2024-05-31',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
    slug: { current: 'volleyball-beach-championship' },
    features: [
      'Beach facilities',
      'Professional setup',
      'Beach activities',
      'Team bonding',
      'Sunset events'
    ],
    matchFormats: [
      { name: 'Pool Play', description: 'Round-robin within pools' },
      { name: 'Knockout', description: 'Single elimination finals' }
    ],
    price: 1000,
    currency: 'INR'
  },
  {
    _id: '5',
    title: 'Badminton Masters Cup',
    description: 'Prestigious badminton tournament for competitive players. Showcase your skills on the international stage.',
    sport: 'Football',
    tier: 'Lions',
    startDate: '2024-07-08',
    endDate: '2024-07-10',
    location: 'Kolkata, West Bengal',
    maxTeams: 28,
    registrationDeadline: '2024-06-23',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
    slug: { current: 'badminton-masters-cup' },
    features: [
      'Olympic-standard courts',
      'Professional umpires',
      'Live streaming',
      'Player lounge',
      'Equipment testing'
    ],
    matchFormats: [
      { name: 'Qualifying Rounds', description: 'Preliminary elimination matches' },
      { name: 'Main Draw', description: 'Single elimination tournament' }
    ],
    price: 1300,
    currency: 'INR'
  },
  {
    _id: '6',
    title: 'Swimming Elite Meet',
    description: 'Competitive swimming meet for elite athletes. Set personal bests and compete for medals.',
    sport: 'Football',
    tier: 'Tigers',
    startDate: '2024-08-12',
    endDate: '2024-08-14',
    location: 'Ahmedabad, Gujarat',
    maxTeams: 15,
    registrationDeadline: '2024-07-28',
    image: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
    slug: { current: 'swimming-elite-meet' },
    features: [
      'Olympic pool',
      'Electronic timing',
      'Medal ceremony',
      'Coaching analysis',
      'Recovery facilities'
    ],
    matchFormats: [
      { name: 'Heats', description: 'Qualifying races by event' },
      { name: 'Finals', description: 'Championship races for qualifiers' }
    ],
    price: 900,
    currency: 'INR'
  }
]
