'use client'

import { Match } from '@/lib/types'
import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'

interface MatchCardProps {
    match: Match
}

export default function MatchCard({ match }: MatchCardProps) {
    const isLive = match.status === 'live'
    const isCompleted = match.status === 'completed'
    const isScheduled = match.status === 'scheduled'

    const formatTime = (timeString: string) => {
        return new Date(timeString).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    const formatDate = (timeString: string) => {
        return new Date(timeString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short'
        })
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all">
            {/* Header: Date/Status */}
            <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider flex justify-between items-center ${isLive ? 'bg-red-600/20 text-red-500' : 'bg-white/5 text-gray-400'
                }`}>
                <div className="flex items-center gap-2">
                    {isLive ? (
                        <>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-red-500">LIVE NOW</span>
                        </>
                    ) : (
                        <span>{formatDate(match.startTime)}</span>
                    )}
                </div>
                <div>{match.ageGroup}</div>
            </div>

            {/* Teams & Score */}
            <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                    {/* Home Team */}
                    <div className="flex-1 flex flex-col items-center gap-3 text-center">
                        <div className="relative w-12 h-12 md:w-16 md:h-16">
                            {match.homeTeam?.logo ? (
                                <Image
                                    src={match.homeTeam.logo}
                                    alt={match.homeTeam.name}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center text-xs text-gray-500 font-bold">
                                    {match.homeTeam?.shortName}
                                </div>
                            )}
                        </div>
                        <span className="font-bold text-sm md:text-base text-white leading-tight">
                            {match.homeTeam?.name || 'TBD'}
                        </span>
                    </div>

                    {/* Score / Time */}
                    <div className="flex flex-col items-center justify-center min-w-[80px]">
                        {!isScheduled ? (
                            <div className="text-3xl md:text-4xl font-black text-white tracking-widest flex items-center gap-2">
                                <span>{match.homeScore ?? 0}</span>
                                <span className="text-gray-600 text-xl">-</span>
                                <span>{match.awayScore ?? 0}</span>
                            </div>
                        ) : (
                            <div className="bg-white/10 px-3 py-1 rounded text-sm font-bold text-gold">
                                {formatTime(match.startTime)}
                            </div>
                        )}

                        {isCompleted && (
                            <span className="text-xs text-gray-500 font-bold uppercase mt-1">FT</span>
                        )}
                        {isLive && (
                            <span className="text-xs text-red-500 font-bold uppercase mt-1 animate-pulse">Playing</span>
                        )}
                    </div>

                    {/* Away Team */}
                    <div className="flex-1 flex flex-col items-center gap-3 text-center">
                        <div className="relative w-12 h-12 md:w-16 md:h-16">
                            {match.awayTeam?.logo ? (
                                <Image
                                    src={match.awayTeam.logo}
                                    alt={match.awayTeam.name}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center text-xs text-gray-500 font-bold">
                                    {match.awayTeam?.shortName}
                                </div>
                            )}
                        </div>
                        <span className="font-bold text-sm md:text-base text-white leading-tight">
                            {match.awayTeam?.name || 'TBD'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer: Venue */}
            {match.venue && (
                <div className="px-4 py-3 border-t border-white/5 bg-white/5 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="uppercase tracking-wide">{match.venue}</span>
                </div>
            )}
        </div>
    )
}
