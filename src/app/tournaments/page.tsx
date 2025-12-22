import { Suspense } from 'react'
import TournamentFilter from '@/components/TournamentFilter'
import TournamentGrid from '@/components/TournamentGrid'
import { mockEvents } from '@/lib/mockData'
import SafeImage from '@/components/SafeImage'

export default function TournamentsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero */}
            <div className="relative h-[50vh]">
                <SafeImage
                    src="/images/headers/page-hero.jpg"
                    alt="Tournaments hero"
                    fill
                    className="object-cover"
                    fallback="/window.svg"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container h-full flex items-center">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-black uppercase mb-4">Tournaments</h1>
                        <p className="text-white/90 text-lg max-w-2xl">
                            Explore upcoming and past VYL tournaments across India.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-black/80 border-t border-white/10">
                <div className="container py-8">
                    <Suspense fallback={<div className="h-16 bg-white/5 animate-pulse rounded" />}>
                        <TournamentFilter />
                    </Suspense>
                </div>
            </div>

            {/* Grid */}
            <div className="container py-12">
                <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-6 animate-pulse">
                            <div className="h-48 bg-white/10 rounded mb-4" />
                            <div className="h-6 bg-white/10 rounded mb-2" />
                            <div className="h-4 bg-white/10 rounded" />
                        </div>
                    ))}
                </div>}>
                    <TournamentGrid events={[...mockEvents].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())} />
                </Suspense>
            </div>
        </div>
    )
}
