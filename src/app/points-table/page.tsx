'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, Trophy, Calendar } from 'lucide-react'
import { Standing, Match } from '@/lib/types'
import { getStandings, getMatches } from '@/lib/league'
import MatchCard from '@/components/MatchCard'

const ageGroups = ['U-7', 'U-9', 'U-11', 'U-13', 'U-15 Boys', 'U-15 Girls']

export default function PointsTablePage() {
    const [selectedGroup, setSelectedGroup] = useState<string>('U-7')
    const [activeTab, setActiveTab] = useState<'standings' | 'matches'>('standings')

    const [standings, setStandings] = useState<Standing[]>([])
    const [matches, setMatches] = useState<Match[]>([])
    const [loading, setLoading] = useState(true)
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

    const fetchData = async () => {
        setLoading(true)
        try {
            const [standingsData, matchesData] = await Promise.all([
                getStandings(selectedGroup),
                getMatches(selectedGroup)
            ])
            setStandings(standingsData)
            setMatches(matchesData)
            setLastUpdated(new Date())
        } catch (error) {
            console.error('Failed to fetch data', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()

        // Auto refresh live data every minute
        const interval = setInterval(fetchData, 60000)
        return () => clearInterval(interval)
    }, [selectedGroup])

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="py-8 px-4 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-5xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>

                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Veeran Logo */}
                        <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                            <Image
                                src="/veeran_logo.png"
                                alt="Veeran Youth League"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="text-2xl md:text-4xl font-black text-yellow-400 tracking-tight">
                                VEERAN WINTER CUP
                            </h1>
                            <div className="flex items-center gap-4 mt-2">
                                <h2 className="text-xl md:text-3xl font-black text-white tracking-tight">
                                    SEASON 2025
                                </h2>
                                {/* Live Indicator */}
                                <div className="flex items-center gap-2 px-3 py-1 bg-red-600/20 rounded-full border border-red-600/30">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Updates Live</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Controls Section */}
            <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-xl">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Age Groups */}
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                            {ageGroups.map((group) => (
                                <button
                                    key={group}
                                    onClick={() => setSelectedGroup(group)}
                                    className={`px-4 py-2 font-bold text-sm whitespace-nowrap rounded-full transition-all ${selectedGroup === group
                                            ? 'bg-yellow-400 text-black'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    {group}
                                </button>
                            ))}
                        </div>

                        {/* Tabs */}
                        <div className="flex bg-white/10 p-1 rounded-lg self-start md:self-auto">
                            <button
                                onClick={() => setActiveTab('standings')}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'standings' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Trophy className="w-4 h-4" />
                                Standings
                            </button>
                            <button
                                onClick={() => setActiveTab('matches')}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'matches' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Calendar className="w-4 h-4" />
                                Matches
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 py-8 min-h-[50vh]">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <RefreshCw className="w-8 h-8 text-yellow-400 animate-spin mb-4" />
                            <p className="text-gray-400 text-sm uppercase tracking-widest">Loading Data</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`${selectedGroup}-${activeTab}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Standings View */}
                            {activeTab === 'standings' && (
                                <>
                                    {standings.length === 0 ? (
                                        <div className="text-center py-20 text-gray-500">
                                            No standings data available yet for {selectedGroup}
                                        </div>
                                    ) : (
                                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                            {/* Table Header */}
                                            <div className="bg-yellow-400 text-black">
                                                <div className="grid grid-cols-[50px_1fr_40px_40px_40px_40px_40px_40px_60px] md:grid-cols-[70px_1fr_60px_60px_60px_60px_60px_60px_80px] items-center py-3 md:py-4 px-3 md:px-4 font-bold text-xs md:text-sm uppercase tracking-tight">
                                                    <div className="text-center">Pos</div>
                                                    <div>Team</div>
                                                    <div className="text-center hidden md:block">P</div>
                                                    <div className="text-center">P</div>
                                                    <div className="text-center">W</div>
                                                    <div className="text-center">D</div>
                                                    <div className="text-center">L</div>
                                                    <div className="text-center hidden md:block">GD</div>
                                                    <div className="text-center text-base">Pts</div>
                                                </div>
                                            </div>

                                            {/* Table Body */}
                                            <div className="divide-y divide-white/5 bg-gray-900/50">
                                                {standings.map((team, index) => (
                                                    <div
                                                        key={team.teamId}
                                                        className={`grid grid-cols-[50px_1fr_40px_40px_40px_40px_40px_40px_60px] md:grid-cols-[70px_1fr_60px_60px_60px_60px_60px_60px_80px] items-center py-3 md:py-4 px-3 md:px-4 hover:bg-white/5 transition-colors ${team.isEliminated ? 'opacity-50 grayscale' : ''
                                                            }`}
                                                    >
                                                        <div className="text-center font-bold text-gray-400">{index + 1}</div>
                                                        <div className="font-bold text-sm md:text-base flex items-center gap-3">
                                                            {team.teamName}
                                                            {team.isEliminated && <span className="bg-red-500/20 text-red-500 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">OUT</span>}
                                                        </div>
                                                        <div className="text-center text-gray-400 hidden md:block">{team.played}</div>
                                                        <div className="text-center font-medium md:hidden">{team.played}</div>
                                                        <div className="text-center text-gray-300">{team.won}</div>
                                                        <div className="text-center text-gray-300">{team.drawn}</div>
                                                        <div className="text-center text-gray-300">{team.lost}</div>
                                                        <div className="text-center text-gray-400 hidden md:block">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</div>
                                                        <div className="text-center text-lg md:text-xl font-black text-yellow-400">{team.points}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Legend */}
                                    <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-gray-500 uppercase tracking-wider font-medium">
                                        <span>P - Played</span>
                                        <span>W - Won</span>
                                        <span>D - Drawn</span>
                                        <span>L - Lost</span>
                                        <span>GD - Goal Diff</span>
                                        <span>Pts - Points</span>
                                    </div>
                                </>
                            )}

                            {/* Matches View */}
                            {activeTab === 'matches' && (
                                <div className="space-y-4">
                                    {matches.length === 0 ? (
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                                            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                            <h3 className="text-xl font-bold text-gray-400">No matches found</h3>
                                            <p className="text-gray-500 mt-2">No fixtures scheduled for this group yet.</p>
                                        </div>
                                    ) : (
                                        matches.map((match) => (
                                            <MatchCard key={match.id} match={match} />
                                        ))
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Info */}
                <div className="mt-12 text-center border-t border-white/10 pt-8">
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Last Updated</p>
                    <p className="text-white font-mono text-sm opacity-60">
                        {lastUpdated.toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'medium' })}
                    </p>
                </div>
            </div>
        </div>
    )
}
