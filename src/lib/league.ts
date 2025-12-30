import { supabase } from './supabaseClient'
import { Match, Standing, Team } from './types'

// --- Data Fetching ---

export const getStandings = async (ageGroup: string): Promise<Standing[]> => {
    // In a real scenario, this might come from a View, or be calculated on the fly.
    // For this implementation, we will fetch from a 'standings_view' that is auto-updated by triggers,
    // or simply calculate it from matches if the dataset is small.
    // Given the request for a SQL view, we'll assume 'standings_view' exists.

    const { data, error } = await supabase
        .from('standings_view')
        .select('*')
        .eq('age_group', ageGroup)
        .order('points', { ascending: false })
        .order('goal_difference', { ascending: false })
        .order('goals_for', { ascending: false })

    if (error) {
        console.error(`Error fetching standings for ${ageGroup}:`, error)
        return []
    }

    return data.map(mapDBStandingToStanding)
}

export const getMatches = async (ageGroup: string): Promise<Match[]> => {
    const { data, error } = await supabase
        .from('matches')
        .select(`
            *,
            home_team:teams!home_team_id(*),
            away_team:teams!away_team_id(*)
        `)
        .eq('age_group', ageGroup)
        .order('start_time', { ascending: true })

    if (error) {
        console.error(`Error fetching matches for ${ageGroup}:`, error)
        return []
    }

    return data.map(mapDBMatchToMatch)
}

export const getLiveMatches = async (): Promise<Match[]> => {
    const { data, error } = await supabase
        .from('matches')
        .select(`
            *,
            home_team:teams!home_team_id(*),
            away_team:teams!away_team_id(*)
        `)
        .eq('status', 'live')
        .order('start_time', { ascending: true })

    if (error) {
        console.error('Error fetching live matches:', error)
        return []
    }

    return data.map(mapDBMatchToMatch)
}


// --- Mappers ---

const mapDBMatchToMatch = (dbMatch: any): Match => {
    return {
        id: dbMatch.id,
        homeTeamId: dbMatch.home_team_id,
        awayTeamId: dbMatch.away_team_id,
        homeTeam: dbMatch.home_team ? mapDBTeamToTeam(dbMatch.home_team) : undefined,
        awayTeam: dbMatch.away_team ? mapDBTeamToTeam(dbMatch.away_team) : undefined,
        homeScore: dbMatch.home_score,
        awayScore: dbMatch.away_score,
        startTime: dbMatch.start_time,
        status: dbMatch.status,
        ageGroup: dbMatch.age_group,
        venue: dbMatch.venue
    }
}

const mapDBTeamToTeam = (dbTeam: any): Team => {
    return {
        id: dbTeam.id,
        name: dbTeam.name,
        shortName: dbTeam.short_name,
        logo: dbTeam.logo,
        ageGroup: dbTeam.age_group
    }
}

const mapDBStandingToStanding = (dbStanding: any): Standing => {
    return {
        teamId: dbStanding.team_id,
        teamName: dbStanding.team_name,
        played: dbStanding.played,
        won: dbStanding.won,
        drawn: dbStanding.drawn,
        lost: dbStanding.lost,
        goalsFor: dbStanding.goals_for,
        goalsAgainst: dbStanding.goals_against,
        goalDifference: dbStanding.goal_difference,
        points: dbStanding.points,
        form: dbStanding.form || [], // Fallback if column missing
        position: dbStanding.position || 0, // Should be calculated or row_number() in view
        isEliminated: dbStanding.is_eliminated
    }
}
