import HeroCarousel from '@/components/HeroCarousel'
import MissionSection from '@/components/MissionSection'
import EventsCarousel from '@/components/EventsCarousel'

export default function Home() {
  // Mock data for demonstration
  const mockSlides = [
    {
      image: '/images/hero/hero-1.jpg',
      title: 'VEERAN WINTER CUP 2025',
      subtitle: 'Two days. Endless energy. Pure football.',
      ctaText: 'Register Team',
      ctaLink: '/tournaments/veeran-winter-cup'
    },
    {
      image: '/images/hero/hero-2.jpg',
      title: 'COMPETE WITH THE BEST',
      subtitle: 'Join thousands of young athletes showcasing their talent on the biggest stage',
      ctaText: 'Join a League',
      ctaLink: '/tournaments'
    },
    {
      image: '/images/hero/hero-3.jpg',
      title: 'PROFESSIONAL TRAINING CAMPS',
      subtitle: 'Learn from expert coaches and take your game to the next level',
      ctaText: 'Find a Camp',
      ctaLink: '/tournaments'
    },
    {
      image: '/images/hero/hero-4.jpg',
      title: 'UNFORGETTABLE EXPERIENCES',
      subtitle: 'Travel, play, and grow with our exclusive football tours and events',
      ctaText: 'Explore Tours',
      ctaLink: '/tournaments'
    }
  ]

  const mockMissionText = `The Veeran Football League was founded to create a strong and competitive platform for young football talent. With multiple successful youth leagues completed, Veeran now presents its next chapter — the Veeran Winter Cup 2025.

These are our roots. This is Veeran Football.`

  const mockMissionImages = [
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
    'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b'
  ]

  const mockEvents = [
    {
      _id: '4',
      title: 'Veeran Winter Cup 2025',
      slug: 'veeran-winter-cup',
      heroImage: '/images/tournaments/winter-cup-2025.jpg',
      logo: '/veeran_logo.png',
      startDate: '2025-12-27',
      endDate: '2025-12-28',
      location: 'HAL Stadium, Bangalore',

      tagline: 'Registrations Open Now!'
    },
    {
      _id: '1',
      title: 'VYL Season 1',
      slug: 'vyl-season-1',
      heroImage: '/images/tournaments/vyl-season-1.png',
      logo: '/veeran_logo.png',
      startDate: '2024-07-01',
      endDate: '2024-07-03',
      location: 'Chennai, Tamil Nadu',

      tagline: 'Completed'
    },
    {
      _id: '2',
      title: 'VYL Season 2',
      slug: 'vyl-season-2',
      heroImage: '/images/tournaments/vyl-season-2.jpg',
      logo: '/veeran_logo.png',
      startDate: '2025-07-01',
      endDate: '2025-07-03',
      location: 'Chennai, Tamil Nadu',

      tagline: 'Completed'
    },
    {
      _id: '3',
      title: 'VYL Junior League',
      slug: 'veeran-juniors-league',
      heroImage: '/images/tournaments/juniors-league.jpg',
      logo: '/veeran_logo.png',
      startDate: '2025-09-01',
      endDate: '2025-09-03',
      location: 'Chennai, Tamil Nadu',

      tagline: 'Completed'
    }
  ]


  return (
    <div className="min-h-screen">
      <HeroCarousel slides={mockSlides} />

      {/* <MissionSection
        missionText={mockMissionText}
        missionImages={mockMissionImages}
      /> */}

      <EventsCarousel events={mockEvents} />
    </div>
  )
}
