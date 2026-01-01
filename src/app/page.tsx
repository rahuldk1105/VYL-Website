import HeroCarousel from '@/components/HeroCarousel'
import MissionSection from '@/components/MissionSection'
import EventsCarousel from '@/components/EventsCarousel'
import MadridTrials from '@/components/MadridTrials'

import { getEvents } from '@/lib/events'

export default async function Home() {
  const sharedMockEvents = await getEvents()

  // Mock data for demonstration
  const mockSlides = [
    {
      image: '/images/hero/hero-1.jpg',
      title: 'MADRID SPAIN INTERNATIONAL TRIALS',
      subtitle: 'Play in Spain. Gain International Exposure. Limited slots for U12, U14, U16.',
      ctaText: 'Register Now',
      ctaLink: '/trials/madrid-spain/register'
    },
    {
      image: '/images/hero/hero-2.jpg',
      title: 'VEERAN DEVELOPMENT LEAGUES',
      subtitle: 'Build your skills, compete weekly, and grow with India\'s premier youth football platform',
      ctaText: 'Join a League',
      ctaLink: '/tournaments'
    },
    {
      image: '/images/hero/hero-3.jpg',
      title: 'PROFESSIONAL YOUTH DEVELOPMENT',
      subtitle: 'Expert coaching, structured training, and competitive matches for ages 5-18',
      ctaText: 'Learn More',
      ctaLink: '/tournaments'
    },
    {
      image: '/images/hero/hero-4.jpg',
      title: 'INTERNATIONAL OPPORTUNITIES',
      subtitle: 'Showcase your talent on the global stage with our international exposure programs',
      ctaText: 'Explore Programs',
      ctaLink: '/trials/madrid-spain'
    }
  ]

  const mockMissionText = `The Veeran Football League was founded to create a strong and competitive platform for young football talent. With multiple successful youth leagues completed and international opportunities, Veeran continues to shape the future of Indian youth football.

These are our roots. This is Veeran Football.`

  const mockMissionImages = [
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
    'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b'
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

      {/* Featured Madrid Trials */}
      <MadridTrials />

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
