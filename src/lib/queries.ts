import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroCarousel[] {
      image,
      title,
      subtitle,
      ctaText,
      ctaLink
    },
    missionText,
    missionImages[]
  }
`

export const eventsQuery = groq`
  *[_type == "event"] | order(startDate asc) {
    _id,
    title,
    slug,
    heroImage,
    logo,
    startDate,
    endDate,
    location,
    tier,
    tagline,
    formats[]
  }
`

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroImage,
    logo,
    startDate,
    endDate,
    location,
    tier,
    tagline,
    description,
    formats[]
  }
`

export const galleryQuery = groq`
  *[_type == "gallery" && slug.current == $slug][0] {
    _id,
    title,
    event->,
    heroImage,
    dateRange,
    photos[] {
      image,
      caption,
      tags[]
    }
  }
`

export const galleriesQuery = groq`
  *[_type == "gallery"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    event->,
    heroImage,
    dateRange
  }
`