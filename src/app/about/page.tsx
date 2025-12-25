import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Trophy, Users, Globe, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: "About Us - Grassroot Football Development",
  description: "Learn about Veeran Youth League's mission to develop grassroots football in India. We organize premium leagues and tournaments to foster young talent.",
  keywords: ["grassroots football india", "football development chennai", "youth sports mission", "football event organizers", "sports management india"],
}


export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: 'Former professional athlete with 15+ years in sports event management.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Expert in tournament logistics and venue management across Asia.'
    },
    {
      name: 'Lisa Wong',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop',
      bio: 'Digital marketing specialist focused on sports and entertainment.'
    }
  ]

  const values = [
    {
      icon: <Trophy className="w-8 h-8 text-gold" />,
      title: 'Excellence',
      description: 'We strive for excellence in every event we organize, ensuring world-class experiences for all participants.'
    },
    {
      icon: <Users className="w-8 h-8 text-gold" />,
      title: 'Community',
      description: 'Building strong sporting communities and fostering connections between athletes, teams, and fans.'
    },
    {
      icon: <Globe className="w-8 h-8 text-gold" />,
      title: 'Global Reach',
      description: 'Connecting sports enthusiasts across Asia and creating international opportunities for competition.'
    },
    {
      icon: <Star className="w-8 h-8 text-gold" />,
      title: 'Innovation',
      description: 'Using cutting-edge technology and creative approaches to enhance the sporting experience.'
    }
  ]

  const achievements = [
    { number: '500+', label: 'Events Organized' },
    { number: '50,000+', label: 'Athletes Participated' },
    { number: '15', label: 'Countries Covered' },
    { number: '98%', label: 'Client Satisfaction' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-br from-primary-dark to-blue-900">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About Veeran Youth League (VYL)
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Based in Chennai, leading youth football tournaments across India since 2015.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            At VYL, we are dedicated to elevating youth football experiences across India.
            Our mission is to organize world-class tournaments that inspire athletes, unite communities,
            and showcase incredible grassroots talent.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We believe in the power of sport to transform lives, build character, and create lasting memories.
            Through our meticulously planned events, we provide platforms for athletes to compete at their highest level
            while fostering sportsmanship and camaraderie.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and help us deliver exceptional experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence in sports event management.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {achievement.number}
              </div>
              <div className="text-gray-600 font-medium">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to making every event a success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-lg text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Partner with Us?</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
            Let&apos;s work together to create an unforgettable sports event that exceeds your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link href="/contact" className="px-8 py-3 bg-gold text-primary-dark font-semibold rounded-lg hover:bg-yellow-400 transition-colors text-center">
              Contact Us
            </Link>
            <Link href="/tournaments" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-dark transition-colors text-center">
              View Our Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
