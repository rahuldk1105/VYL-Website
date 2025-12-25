import HeroCarousel from '@/components/HeroCarousel'
import EventsCarousel from '@/components/EventsCarousel'

import { mockEvents as sharedMockEvents } from '@/lib/mockData'

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

  // Transform shared events to the format expected by EventsCarousel
  const displayEvents = sharedMockEvents.map(event => ({
    _id: event._id,
    title: event.title,
    slug: event.slug.current,
    heroImage: event.image,
    logo: '/veeran_logo.png', // Default logo
    startDate: event.startDate,
    endDate: event.endDate,
    location: event.location,
    tagline: event.tagline || (new Date(event.endDate) < new Date() ? 'Completed' : 'Registrations Open')
  }))

  const upcomingEvents = displayEvents.filter(e => new Date(e.endDate) >= new Date())
  const pastEvents = displayEvents.filter(e => new Date(e.endDate) < new Date())

  return (
    <div className="min-h-screen">
      <HeroCarousel slides={mockSlides} />

      {/* <MissionSection
        missionText={mockMissionText}
        missionImages={mockMissionImages}
      /> */}

      <EventsCarousel
        events={upcomingEvents}
        title="Upcoming Events"
        description="Discover our next tournaments for 5–18 year olds across India"
      />

      <EventsCarousel
        events={pastEvents}
        title="Past Events"
        description="Check out our previously completed tournaments and leagues"
      />
    </div>
  )
}
