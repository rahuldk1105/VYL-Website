import { Event } from './types'

export const mockEvents: Event[] = [
  {
    _id: '1',
    title: 'VYL Season 1',
    description: 'The inaugural season of the Veeran Youth League, setting the standard for youth football in Tamil Nadu. A resounding success with top teams competing for the first-ever VYL trophy.',
    sport: 'Football',

    startDate: '2023-08-10',
    endDate: '2023-08-12',
    location: 'Chennai, Tamil Nadu',
    maxTeams: 16,
    registrationDeadline: '2023-07-25',
    image: '/images/tournaments/vyl-season-1.png',
    slug: { current: 'vyl-season-1' },
    features: [
      'Professional referees',
      'Live streaming',
      'Trophy ceremony',
      'Player awards',
      'Medical support'
    ],
    matchFormats: [
      { name: 'Group Stage', description: 'Round-robin format' },
      { name: 'Knockout Stage', description: 'Semi-finals and Final' }
    ],
    price: 1500,
    currency: 'INR'
  },
  {
    _id: '2',
    title: 'VYL Season 2',
    description: 'Building on the success of Season 1, VYL Season 2 brought even more intensity and skill. An unforgettable tournament that showcased the rising stars of football.',
    sport: 'Football',

    startDate: '2024-01-20',
    endDate: '2024-01-22',
    location: 'Chennai, Tamil Nadu',
    maxTeams: 20,
    registrationDeadline: '2024-01-05',
    image: '/images/tournaments/vyl-season-2.jpg',
    slug: { current: 'vyl-season-2' },
    features: [
      'Expanded bracket',
      'Scouting opportunities',
      'Enhanced media coverage',
      'Skill challenges',
      'Gala awards night'
    ],
    matchFormats: [
      { name: 'League Phase', description: 'Groups of 4 teams' },
      { name: 'Championship Bracket', description: 'Top 2 from each group advance' }
    ],
    price: 1500,
    currency: 'INR'
  },
  {
    _id: '3',
    title: 'Veeran Juniors League',
    description: 'A dedicated league for our younger talents to shine. The Veeran Juniors League focused on grassroots development and the pure joy of the game.',
    sport: 'Football',

    startDate: '2024-05-15',
    endDate: '2024-05-17',
    location: 'Chennai, Tamil Nadu',
    maxTeams: 12,
    registrationDeadline: '2024-05-01',
    image: '/images/tournaments/juniors-league.jpg',
    slug: { current: 'veeran-juniors-league' },
    features: [
      'Age-appropriate coaching',
      'Focus on fundamentals',
      'Participation medals',
      'Family fun zone',
      'Development workshops'
    ],
    matchFormats: [
      { name: 'Friendlies', description: 'Emphasis on playing time' },
      { name: 'Mini-Tournament', description: 'Short format matches' }
    ],
    price: 1000,
    currency: 'INR'
  },
  {
    _id: '4',
    title: 'Veeran Winter Cup',
    description: 'The upcoming prestigious winter tournament. Join us for the Veeran Winter Cup and compete against the best. Registrations are now OPEN!',
    sport: 'Football',

    startDate: '2025-12-27',
    endDate: '2025-12-28',
    location: 'HAL Stadium, Bangalore',
    maxTeams: 32,
    registrationDeadline: '2025-12-15',
    image: '/images/tournaments/winter-cup-2025.jpg',
    slug: { current: 'veeran-winter-cup' },
    organizer: 'Veeran Football League',
    tagline: 'Two days. Endless energy. Pure football.',
    features: [
      'Championship Trophy',
      'Professional Scouts',
      'Live Streaming on YouTube',
      'Winter Festival Atmosphere'
    ],
    ageGroups: {
      boys: [
        { category: 'U-7', bornOnOrAfter: '2018-01-01' },
        { category: 'U-9', bornOnOrAfter: '2016-01-01' },
        { category: 'U-11', bornOnOrAfter: '2014-01-01' },
        { category: 'U-13', bornOnOrAfter: '2012-01-01' },
        { category: 'U-15', bornOnOrAfter: '2010-01-01' },
        { category: 'U-17', bornOnOrAfter: '2008-01-01' }
      ],
      girls: [
        { category: 'U-15 Girls', bornOnOrAfter: '2010-01-01' },
        { category: 'U-17 Girls', bornOnOrAfter: '2008-01-01' },
        { category: 'Senior Girls', bornOnOrAfter: 'Open' }
      ]
    },
    matchRules: {
      general: [
        'Player ID verification (Aadhaar or valid ID) is mandatory',
        'Verification marking must be worn throughout the tournament',
        'Organizer reserves the right to amend rules if required'
      ],
      standbyTime: 30
    },
    matchSpecifications: [
      { category: 'U-7', ballSize: 3, time: '10-2-10', subs: 'Rolling', players: '5+3' },
      { category: 'U-9', ballSize: 4, time: '10-2-10', subs: 'Rolling', players: '5+3' },
      { category: 'U-11', ballSize: 4, time: '10-2-10', subs: 'Rolling', players: '7+5' },
      { category: 'U-13', ballSize: 5, time: '10-2-10', subs: 'Rolling', players: '7+5' },
      { category: 'U-15', ballSize: 5, time: '10-2-10', subs: 'Rolling', players: '7+5' },
      { category: 'U-17', ballSize: 5, time: '10-2-10', subs: 'Rolling', players: '7+5' },
      { category: 'Senior Girls', ballSize: 5, time: '10-2-10', subs: 'Rolling', players: '7+5' }
    ],
    merchandise: {
      players: [
        'Official participation medal',
        'Team jersey',
        'Premium kit bag',
        'Professional team photoshoot'
      ],
      champions: [
        'Championship trophy awarded on final celebration day'
      ]
    },
    matchFormats: [
      { name: 'League-cum-Knockout', description: 'Minimum 5 matches per team guaranteed' }
    ],
    price: 2000,
    currency: 'INR',
    registrationUrl: '/register/team'
  },
  {
    _id: '5',
    title: 'Veeran Development League',
    description: 'A dedicated Youth Football League designed for development. Featuring a double league format and a minimum of 10 matches per team.',
    sport: 'Football',

    startDate: '2025-02-01',
    endDate: '2025-02-28',
    location: 'CP Sports Academy @ VELS, Old Pallavaram, Chennai - 600117',
    maxTeams: 32, // Placeholder
    registrationDeadline: '2025-01-31',
    image: '/images/tournaments/veeran-development-league.png',
    slug: { current: 'veeran-development-league' },
    organizer: 'Veeran Football League',
    tagline: 'Development First. Competition Second.',
    features: [
      'Minimum 10 matches guaranteed',
      'Double League Format',
      'Age-appropriate formats (3v3 to 7v7)',
      'Professional venue'
    ],
    ageGroups: {
      boys: [
        { category: 'U-7', bornOnOrAfter: 'TBD' },
        { category: 'U-9', bornOnOrAfter: 'TBD' },
        { category: 'U-10', bornOnOrAfter: 'TBD' },
        { category: 'U-12', bornOnOrAfter: 'TBD' }
      ]
    },
    matchSpecifications: [
      { category: 'U-7', ballSize: 3, time: 'Coming Soon', subs: 'Rolling', players: '3-a-side' },
      { category: 'U-9', ballSize: 4, time: 'Coming Soon', subs: 'Rolling', players: '5-a-side' },
      { category: 'U-10', ballSize: 4, time: 'Coming Soon', subs: 'Rolling', players: '5-a-side' },
      { category: 'U-12', ballSize: 5, time: 'Coming Soon', subs: 'Rolling', players: '7-a-side' }
    ],
    matchFormats: [
      { name: 'Double League', description: 'Minimum 10 matches per team' }
    ],
    price: 0, // Coming Soon
    currency: 'INR',
    registrationUrl: '/register/team'
  }
]
