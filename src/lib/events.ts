import { Event } from './types'
import { mockEvents } from './mockData'

export const getEvents = async (): Promise<Event[]> => {
    // Return mockEvents sorted by start date
    return mockEvents.sort((a, b) => {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    })
}

export const getEventBySlug = async (slug: string): Promise<Event | null> => {
    // Find event by slug from mockData
    const event = mockEvents.find(e => e.slug.current === slug)
    return event || null
}
