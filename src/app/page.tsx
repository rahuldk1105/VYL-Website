import HeroCarousel from '@/components/HeroCarousel'
import MissionSection from '@/components/MissionSection'
import EventsCarousel from '@/components/EventsCarousel'

export default function Home() {
  // Mock data for demonstration
  const mockSlides = [
    {
      image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
      title: 'India’s Premier Youth Football',
      subtitle: 'Organizing year-round VYL tournaments across India',
      ctaText: 'Find Tournament',
      ctaLink: '/find-a-tournament'
    },
    {
      image: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
      title: 'Veeran Youth League (VYL)',
      subtitle: 'A CP Sports division based in Chennai, Tamil Nadu',
      ctaText: 'Learn More',
      ctaLink: '/about'
    }
  ]

  const mockMissionText = `We are dedicated to creating exceptional football experiences that bring athletes, families, and communities together across India. Our mission is to organize world-class youth tournaments that inspire excellence, foster sportsmanship, and create lasting memories.

Through our tiered competition system (Lions, Tigers, Panthers), athletes of all skill levels find the perfect environment to grow and excel.`

  const mockMissionImages = [
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
    'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b'
  ]

  const mockEvents = [
    {
      _id: '1',
      title: 'Summer Championship',
      slug: 'summer-championship',
      heroImage: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
      logo: '/veeran_logo.png',
      startDate: '2024-06-15',
      endDate: '2024-06-17',
      location: 'Chennai, Tamil Nadu',
      tier: 'lions',
      tagline: 'Premier summer sports competition'
    },
    {
      _id: '2',
      title: 'Youth Invitational',
      slug: 'youth-invitational',
      heroImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
      logo: '/veeran_logo.png',
      startDate: '2024-07-20',
      endDate: '2024-07-22',
      location: 'Bengaluru, Karnataka',
      tier: 'tigers',
      tagline: 'Young athletes showcase their talent'
    },
    {
      _id: '3',
      title: 'Regional Finals',
      slug: 'regional-finals',
      heroImage: 'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
      logo: '/veeran_logo.png',
      startDate: '2024-08-10',
      endDate: '2024-08-12',
      location: 'Mumbai, Maharashtra',
      tier: 'panthers',
      tagline: 'Elite competition for top athletes'
    }
  ]


  return (
    <div className="min-h-screen">
      <HeroCarousel slides={mockSlides} />
      
      <MissionSection 
        missionText={mockMissionText}
        missionImages={mockMissionImages}
      />
      
      <EventsCarousel events={mockEvents} />
    </div>
  )
}
