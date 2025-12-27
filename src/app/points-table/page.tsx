'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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

    const tableData = leagueData[selectedGroup as keyof typeof leagueData]

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="py-8 px-4">
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
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-1">
                                LEAGUE TABLE
                            </h2>
                        </div>
                    </div>
                </div>
            </header>

            {/* Age Group Buttons */}
            <div className="max-w-5xl mx-auto px-4 mb-8">
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {ageGroups.map((group) => (
                        <button
                            key={group}
                            onClick={() => setSelectedGroup(group)}
                            className={`px-4 md:px-6 py-2 md:py-3 font-bold text-sm md:text-base transition-all ${selectedGroup === group
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            {group}
                        </button>
                    ))}
                </div>
            </div>

            {/* Age Group Title */}
            <motion.div
                key={selectedGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto px-4 mb-6"
            >
                <h3 className="text-5xl md:text-7xl font-black text-yellow-400 text-center">
                    {selectedGroup}
                </h3>
            </motion.div>

            {/* Points Table */}
            <div className="max-w-5xl mx-auto px-4 pb-12">
                <motion.div
                    key={selectedGroup}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="overflow-x-auto"
                >
                    {/* Table Header */}
                    <div className="bg-yellow-400 text-black">
                        <div className="grid grid-cols-[50px_1fr_50px_50px_50px_50px_70px] md:grid-cols-[70px_1fr_70px_70px_70px_70px_90px] items-center py-3 md:py-4 px-3 md:px-4 font-bold text-xs md:text-base">
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
                    <div className="bg-white text-black">
                        {tableData.map((team, index) => (
                            <motion.div
                                key={team.club}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`grid grid-cols-[50px_1fr_50px_50px_50px_50px_70px] md:grid-cols-[70px_1fr_70px_70px_70px_70px_90px] items-center py-4 md:py-5 px-3 md:px-4 border-b-2 border-black/10 last:border-b-0 ${index === 0 ? 'bg-yellow-50' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    }`}
                            >
                                <div className="text-center text-xl md:text-2xl font-black">
                                    {team.pos}
                                </div>
                                <div className="font-bold text-xs md:text-base uppercase tracking-wide">
                                    {team.club}
                                </div>
                                <div className="text-center text-base md:text-lg font-medium">
                                    {team.pl}
                                </div>
                                <div className="text-center text-base md:text-lg font-medium">
                                    {team.w}
                                </div>
                                <div className="text-center text-base md:text-lg font-medium">
                                    {team.d}
                                </div>
                                <div className="text-center text-base md:text-lg font-medium">
                                    {team.l}
                                </div>
                                <div className="text-center text-xl md:text-2xl font-black text-yellow-600">
                                    {team.pts}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Legend */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm text-white/60">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-yellow-400">POS</span>
                        <span>Position</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-yellow-400">PL</span>
                        <span>Played</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-yellow-400">W</span>
                        <span>Won</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-yellow-400">D</span>
                        <span>Draw</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-yellow-400">L</span>
                        <span>Lost</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-yellow-400">PTS</span>
                        <span>Points</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-white/40 text-sm">
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
