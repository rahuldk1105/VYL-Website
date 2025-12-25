import { MetadataRoute } from 'next'
import { mockEvents } from '@/lib/mockData'

// In a real app, you'd fetch this from your API/CMS
const BASE_URL = 'https://www.veeranyouthleague.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const tournaments = mockEvents.map((event) => ({
        url: `${BASE_URL}/tournaments/${event.slug.current}`,
        lastModified: new Date(event.startDate),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/tournaments`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        ...tournaments,
    ]
}
