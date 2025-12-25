import { supabase } from './supabaseClient'
import { Event } from './types'

export const getEvents = async (): Promise<Event[]> => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true })

    if (error) {
        console.error('Error fetching events:', error)
        return []
    }

    return data.map(mapDatabaseEventToEvent)
}

export const getEventBySlug = async (slug: string): Promise<Event | null> => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) {
        return null
    }

    return mapDatabaseEventToEvent(data)
}

// Helper to map snake_case DB columns to camelCase TS interface
const mapDatabaseEventToEvent = (dbEvent: any): Event => {
    return {
        _id: dbEvent.id,
        title: dbEvent.title,
        description: dbEvent.description,
        sport: dbEvent.sport,
        startDate: dbEvent.start_date,
        endDate: dbEvent.end_date,
        location: dbEvent.location,
        maxTeams: dbEvent.max_teams,
        registrationDeadline: dbEvent.registration_deadline,
        image: dbEvent.image,
        slug: { current: dbEvent.slug },
        features: dbEvent.features || [],
        matchFormats: dbEvent.match_formats || [],
        price: dbEvent.price,
        currency: dbEvent.currency,
        registrationUrl: dbEvent.registration_url,
        organizer: dbEvent.organizer,
        tagline: dbEvent.tagline,
        ageGroups: dbEvent.age_groups,
        matchRules: dbEvent.match_rules,
        matchSpecifications: dbEvent.match_specifications,
        merchandise: dbEvent.merchandise
    }
}
