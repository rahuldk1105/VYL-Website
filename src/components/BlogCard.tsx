'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, User } from 'lucide-react'
import { BlogPost } from '@/lib/types'

interface BlogCardProps {
    post: BlogPost
    featured?: boolean
    index?: number
}

const categoryColors: Record<string, string> = {
    news: 'bg-blue-500',
    announcement: 'bg-gold text-black',
    story: 'bg-purple-500',
    update: 'bg-green-500',
}

const categoryLabels: Record<string, string> = {
    news: 'News',
    announcement: 'Announcement',
    story: 'Story',
    update: 'Update',
}

export default function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    if (featured) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Link
                    href={`/news/${post.slug}`}
                    className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-gold/50 transition-all duration-500"
                >
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative h-64 md:h-96 overflow-hidden">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 md:block hidden" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />

                            {/* Featured Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-gold text-black text-xs font-black uppercase tracking-wider rounded-full">
                                    Featured
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${categoryColors[post.category] || 'bg-white/20'}`}>
                                    {categoryLabels[post.category] || post.category}
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight group-hover:text-gold transition-colors">
                                {post.title}
                            </h2>

                            <p className="text-gray-400 mb-6 line-clamp-3">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{post.authorName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(post.publishedAt)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTimeMinutes} min read</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gold font-bold group-hover:gap-4 transition-all">
                                Read Article <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link
                href={`/news/${post.slug}`}
                className="group block h-full bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-gold/50 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${categoryColors[post.category] || 'bg-white/20'}`}>
                            {categoryLabels[post.category] || post.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-gold transition-colors leading-tight">
                        {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readTimeMinutes} min</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
