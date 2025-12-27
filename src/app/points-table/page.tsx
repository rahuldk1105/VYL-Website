'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Trophy, ArrowLeft, ChevronDown } from 'lucide-react'

// Points table data - Veeran Winter Cup
const leagueData = {
    'U-7': [
        { pos: 1, club: 'CP Sports', pl: 3, w: 3, d: 0, l: 0, pts: 6 },
        { pos: 2, club: 'Blue Panthers', pl: 3, w: 2, d: 1, l: 0, pts: 5 },
        { pos: 3, club: 'Tron Sports Academy', pl: 4, w: 1, d: 2, l: 1, pts: 4 },
        { pos: 4, club: 'Shadows FC', pl: 3, w: 1, d: 0, l: 2, pts: 2 },
        { pos: 5, club: 'Just Play', pl: 4, w: 1, d: 0, l: 3, pts: 2 },
        { pos: 6, club: 'Ten X United', pl: 3, w: 0, d: 1, l: 2, pts: 1 },
    ],
    'U-9': [
        { pos: 1, club: 'BKFC', pl: 4, w: 4, d: 0, l: 0, pts: 8 },
        { pos: 2, club: 'FC Marina', pl: 4, w: 2, d: 1, l: 1, pts: 5 },
        { pos: 3, club: 'MFC', pl: 3, w: 2, d: 0, l: 1, pts: 4 },
        { pos: 4, club: 'Just Play - A', pl: 3, w: 2, d: 0, l: 1, pts: 4 },
        { pos: 5, club: 'CP Sports', pl: 4, w: 1, d: 1, l: 2, pts: 3 },
        { pos: 6, club: 'Austin FC', pl: 4, w: 1, d: 0, l: 3, pts: 2 },
        { pos: 7, club: 'Bhavans', pl: 3, w: 1, d: 0, l: 2, pts: 2 },
        { pos: 8, club: 'Just Play - B', pl: 4, w: 0, d: 0, l: 4, pts: 0 },
    ],
    'U-11': [
        { pos: 1, club: 'Dream Chasers', pl: 3, w: 2, d: 1, l: 0, pts: 5 },
        { pos: 2, club: 'CP Sports', pl: 3, w: 2, d: 0, l: 1, pts: 4 },
        { pos: 3, club: "Beck'z FC", pl: 3, w: 2, d: 0, l: 1, pts: 4 },
        { pos: 4, club: 'Ziel United FC', pl: 2, w: 2, d: 0, l: 0, pts: 4 },
        { pos: 5, club: 'JDFC', pl: 3, w: 2, d: 0, l: 1, pts: 4 },
        { pos: 6, club: 'Bhavans', pl: 2, w: 1, d: 0, l: 1, pts: 2 },
        { pos: 7, club: 'Tron Sports Academy', pl: 3, w: 1, d: 0, l: 2, pts: 2 },
        { pos: 8, club: 'Just Play', pl: 2, w: 0, d: 1, l: 1, pts: 1 },
        { pos: 9, club: 'VPS', pl: 2, w: 0, d: 0, l: 2, pts: 0 },
        { pos: 10, club: 'Tiny Boots', pl: 1, w: 0, d: 0, l: 1, pts: 0 },
    ],
    'U-13': [
        { pos: 1, club: 'VPS', pl: 3, w: 2, d: 1, l: 0, pts: 5 },
        { pos: 2, club: 'Just Play', pl: 3, w: 2, d: 1, l: 0, pts: 5 },
        { pos: 3, club: 'Sana Model School', pl: 3, w: 2, d: 1, l: 0, pts: 5 },
        { pos: 4, club: "Beck'z FC", pl: 2, w: 0, d: 1, l: 1, pts: 1 },
        { pos: 5, club: 'HAL Jr. Boys', pl: 3, w: 0, d: 1, l: 2, pts: 1 },
        { pos: 6, club: 'Bhavans - A', pl: 3, w: 0, d: 1, l: 2, pts: 1 },
        { pos: 7, club: 'Bhavans - B', pl: 1, w: 0, d: 0, l: 1, pts: 0 },
    ],
    'U-15 Boys': [
        { pos: 1, club: 'Just Play', pl: 4, w: 4, d: 0, l: 0, pts: 8 },
        { pos: 2, club: 'VPS', pl: 3, w: 1, d: 1, l: 1, pts: 3 },
        { pos: 3, club: 'HAL Jr. Boys', pl: 2, w: 1, d: 1, l: 0, pts: 3 },
        { pos: 4, club: 'Bhavans', pl: 3, w: 1, d: 0, l: 2, pts: 2 },
        { pos: 5, club: 'CP Sports', pl: 3, w: 0, d: 0, l: 3, pts: 0 },
    ],
    'U-15 Girls': [
        { pos: 1, club: 'Just Play', pl: 3, w: 3, d: 0, l: 0, pts: 6 },
        { pos: 2, club: 'Christel House', pl: 2, w: 1, d: 0, l: 1, pts: 2 },
        { pos: 3, club: "Beck'z FC", pl: 3, w: 1, d: 0, l: 2, pts: 2 },
        { pos: 4, club: 'LMS', pl: 2, w: 0, d: 0, l: 2, pts: 0 },
    ],
}

const ageGroups = Object.keys(leagueData)

export default function PointsTablePage() {
    const [selectedGroup, setSelectedGroup] = useState<string>('U-7')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const tableData = leagueData[selectedGroup as keyof typeof leagueData]

    return (
        <div className="min-h-screen bg-[#1a5fb4] text-white">
            {/* Header */}
            <header className="relative py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>

                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Logo */}
                        <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0">
                            <div className="absolute inset-0 bg-[#1a5fb4] rounded-full flex items-center justify-center border-4 border-yellow-400">
                                <Trophy className="w-10 h-10 md:w-14 md:h-14 text-yellow-400" />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="text-2xl md:text-4xl font-black text-yellow-400 tracking-tight">
                                VEERAN WINTER CUP
                            </h1>
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-1">
                                LEAGUE TABLE
                            </h2>
                        </div>
                    </div>
                </div>
            </header>

            {/* Age Group Selector */}
            <div className="max-w-4xl mx-auto px-4 mb-6">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full md:w-64 flex items-center justify-between gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-xl font-bold hover:bg-white/20 transition-colors"
                    >
                        <span className="text-yellow-400">{selectedGroup}</span>
                        <ChevronDown className={`w-6 h-6 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full mt-2 w-full md:w-64 bg-[#0d3d8a] border border-white/20 rounded-xl overflow-hidden z-10 shadow-2xl"
                            >
                                {ageGroups.map((group) => (
                                    <button
                                        key={group}
                                        onClick={() => {
                                            setSelectedGroup(group)
                                            setIsDropdownOpen(false)
                                        }}
                                        className={`w-full px-6 py-3 text-left font-bold hover:bg-white/10 transition-colors ${selectedGroup === group ? 'bg-yellow-400 text-blue-900' : ''
                                            }`}
                                    >
                                        {group}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Age Group Title */}
            <motion.div
                key={selectedGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-4 mb-6"
            >
                <h3 className="text-5xl md:text-7xl font-black text-yellow-400 text-center">
                    {selectedGroup}
                </h3>
            </motion.div>

            {/* Points Table */}
            <div className="max-w-4xl mx-auto px-4 pb-12">
                <motion.div
                    key={selectedGroup}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="overflow-x-auto"
                >
                    {/* Table Header */}
                    <div className="bg-yellow-400 text-blue-900 rounded-t-xl">
                        <div className="grid grid-cols-[60px_1fr_60px_60px_60px_60px_80px] md:grid-cols-[80px_1fr_80px_80px_80px_80px_100px] items-center py-4 px-4 font-bold text-sm md:text-base">
                            <div className="text-center">POS</div>
                            <div>CLUB</div>
                            <div className="text-center">PL</div>
                            <div className="text-center">W</div>
                            <div className="text-center">D</div>
                            <div className="text-center">L</div>
                            <div className="text-center">PTS</div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="bg-[#0d3d8a] rounded-b-xl overflow-hidden">
                        {tableData.map((team, index) => (
                            <motion.div
                                key={team.club}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`grid grid-cols-[60px_1fr_60px_60px_60px_60px_80px] md:grid-cols-[80px_1fr_80px_80px_80px_80px_100px] items-center py-5 px-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors ${index === 0 ? 'bg-white/5' : ''
                                    }`}
                            >
                                <div className="text-center text-2xl md:text-3xl font-bold text-white">
                                    {team.pos}
                                </div>
                                <div className="font-bold text-sm md:text-lg uppercase tracking-wide">
                                    {team.club}
                                </div>
                                <div className="text-center text-lg md:text-xl">
                                    {team.pl}
                                </div>
                                <div className="text-center text-lg md:text-xl">
                                    {team.w}
                                </div>
                                <div className="text-center text-lg md:text-xl">
                                    {team.d}
                                </div>
                                <div className="text-center text-lg md:text-xl">
                                    {team.l}
                                </div>
                                <div className="text-center text-2xl md:text-3xl font-black text-yellow-400">
                                    {team.pts}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Legend */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm text-white/70">
                    <div className="flex items-center gap-2">
                        <span className="font-bold">POS</span>
                        <span>Position</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold">PL</span>
                        <span>Played</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold">W</span>
                        <span>Won</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold">D</span>
                        <span>Draw</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold">L</span>
                        <span>Lost</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold">PTS</span>
                        <span>Points</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-white/50 text-sm">
                        Last updated: December 2024
                    </p>
                    <p className="text-yellow-400 font-bold mt-2">
                        #VeeranWinterCup #YouthFootball
                    </p>
                </div>
            </div>
        </div>
    )
}
