import { Gallery } from './types'

export const mockGalleries: Gallery[] = [
  {
    _id: '1',
    title: 'Elite Football Championship 2024',
    description: 'Action shots from VYL tournaments featuring top youth teams across India.',
    event: 'Elite Football Championship 2024',
    date: '2024-03-15',
    location: 'Chennai, Tamil Nadu',
    thumbnail: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
    slug: { current: 'elite-football-championship-2024' },
    categories: ['Football', 'Action', 'Teams'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
        caption: 'Intense match action during the championship',
        photographer: 'John Smith'
      },
      {
        url: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
        caption: 'Team celebration after scoring',
        photographer: 'Sarah Johnson'
      },
      {
        url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
        caption: 'Goalkeeper making a crucial save',
        photographer: 'Mike Chen'
      },
      {
        url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
        caption: 'Fans cheering in the stadium',
        photographer: 'Lisa Wong'
      },
      {
        url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&h=800&fit=crop',
        caption: 'Trophy presentation ceremony',
        photographer: 'David Brown'
      }
    ]
  },
  {
    _id: '2',
    title: 'Youth Football Premier League',
    description: 'High-energy moments from VYL youth football league matches.',
    event: 'Youth Football Premier League',
    date: '2024-04-20',
    location: 'Bengaluru, Karnataka',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
    slug: { current: 'basketball-premier-league' },
    categories: ['Basketball', 'Action', 'Indoor'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
        caption: 'Player going for a slam dunk',
        photographer: 'Alex Rodriguez'
      },
      {
        url: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
        caption: 'Team huddle during timeout',
        photographer: 'Maria Garcia'
      },
      {
        url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
        caption: 'Three-point shot attempt',
        photographer: 'Kevin Lee'
      },
      {
        url: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
        caption: 'Defensive play at the net',
        photographer: 'Anna Kim'
      }
    ]
  },
  {
    _id: '3',
    title: 'Youth Football Open',
    description: 'Young athletes showcasing their talent at VYL youth football events.',
    event: 'Youth Football Open',
    date: '2024-05-10',
    location: 'New Delhi, Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
    slug: { current: 'youth-tennis-open' },
    categories: ['Tennis', 'Youth', 'Development'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
        caption: 'Young player serving',
        photographer: 'Tom Wilson'
      },
      {
        url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
        caption: 'Coach giving instructions',
        photographer: 'Emma Davis'
      },
      {
        url: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
        caption: 'Youth players group photo',
        photographer: 'James Park'
      }
    ]
  },
  {
    _id: '4',
    title: 'Youth Football Championship',
    description: 'Stunning youth football action shots from VYL championship matches.',
    event: 'Youth Football Championship',
    date: '2024-06-15',
    location: 'Hyderabad, Telangana',
    thumbnail: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
    slug: { current: 'volleyball-beach-championship' },
    categories: ['Volleyball', 'Beach', 'Outdoor'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
        caption: 'Beach volleyball spike',
        photographer: 'Carlos Mendez'
      },
      {
        url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
        caption: 'Sunset beach volleyball match',
        photographer: 'Sophie Turner'
      },
      {
        url: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
        caption: 'Team celebration on the beach',
        photographer: 'Ryan Johnson'
      }
    ]
  },
  {
    _id: '5',
    title: 'Football Masters Cup',
    description: 'Elite youth football players competing at VYL masters cup.',
    event: 'Football Masters Cup',
    date: '2024-07-08',
    location: 'Kolkata, West Bengal',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
    slug: { current: 'badminton-masters-cup' },
    categories: ['Badminton', 'Indoor', 'Elite'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
        caption: 'Smash shot during finals',
        photographer: 'Zhang Wei'
      },
      {
        url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
        caption: 'Players shaking hands',
        photographer: 'Linda Chang'
      },
      {
        url: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
        caption: 'Trophy presentation',
        photographer: 'Robert Lim'
      }
    ]
  },
  {
    _id: '6',
    title: 'Football Elite Meet',
    description: 'Elite youth football matches captured at VYL elite meet.',
    event: 'Football Elite Meet',
    date: '2024-08-12',
    location: 'Ahmedabad, Gujarat',
    thumbnail: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
    slug: { current: 'swimming-elite-meet' },
    categories: ['Swimming', 'Aquatic', 'Elite'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
        caption: 'Freestyle sprint finish',
        photographer: 'Michael Torres'
      },
      {
        url: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
        caption: 'Medal ceremony',
        photographer: 'Jessica Chen'
      },
      {
        url: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
        caption: 'Diving start sequence',
        photographer: 'David Kim'
      }
    ]
  }
]
