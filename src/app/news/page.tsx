'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, Megaphone, BookOpen, Bell, Loader2 } from 'lucide-react'
import BlogCard from '@/components/BlogCard'
import { BlogPost } from '@/lib/types'
import { getPosts } from '@/lib/posts'

const categories = [
    { id: 'all', label: 'All', icon: Newspaper },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'announcement', label: 'Announcements', icon: Megaphone },
    { id: 'story', label: 'Stories', icon: BookOpen },
    { id: 'update', label: 'Updates', icon: Bell },
]

export default function NewsPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('all')

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            const data = await getPosts()
            setPosts(data)
            setLoading(false)
        }
        fetchPosts()
    }, [])

    const filteredPosts = activeCategory === 'all'
        ? posts
        : posts.filter(post => post.category === activeCategory)

    const featuredPost = filteredPosts.find(post => post.isFeatured) || filteredPosts[0]
    const regularPosts = filteredPosts.filter(post => post._id !== featuredPost?._id)

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-[45vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-5" />

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Newspaper className="w-8 h-8 text-gold" />
                            <span className="text-gold font-bold uppercase tracking-widest text-sm">Latest Updates</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4">
                            News & Stories
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Stay updated with tournament announcements, player stories, and all the latest from Veeran Youth League.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="sticky top-16 md:top-24 z-30 bg-black/95 backdrop-blur-lg border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
                        {categories.map((category) => {
                            const Icon = category.icon
                            const isActive = activeCategory === category.id
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${isActive
                                            ? 'bg-gold text-black'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {category.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-gold animate-spin" />
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Newspaper className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-400 mb-2">No posts found</h2>
                        <p className="text-gray-500">Check back later for updates!</p>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Featured Post */}
                            {featuredPost && (
                                <div className="mb-12">
                                    <BlogCard post={featuredPost} featured />
                                </div>
                            )}

                            {/* Regular Posts Grid */}
                            {regularPosts.length > 0 && (
                                <>
                                    <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-gold rounded-full" />
                                        More Articles
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {regularPosts.map((post, index) => (
                                            <BlogCard key={post._id} post={post} index={index} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}
