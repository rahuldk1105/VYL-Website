import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { getPostBySlug, getRelatedPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import { BlogPost } from '@/lib/types'

interface Props {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} - Veeran Youth League`,
        description: post.excerpt,
        openGraph: {
            images: [post.coverImage],
        },
    }
}

export default async function BlogPostPage({ params }: Props) {
    const post = await getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = await getRelatedPosts(post.slug, post.category)

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-20">
                    <div className="container mx-auto px-4">
                        <Link
                            href="/news"
                            className="inline-flex items-center text-white/80 hover:text-gold transition-colors mb-6 text-sm uppercase tracking-wider font-bold"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to News
                        </Link>

                        <div className="max-w-4xl">
                            <span className="inline-block px-3 py-1 bg-gold text-black text-xs font-black uppercase tracking-wider rounded-full mb-4">
                                {post.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base text-gray-300">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                                        {post.authorImage ? (
                                            <Image src={post.authorImage} alt={post.authorName} width={32} height={32} />
                                        ) : (
                                            <User className="w-4 h-4" />
                                        )}
                                    </div>
                                    <span className="font-semibold text-white">{post.authorName}</span>
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
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Share Sidebar (Desktop) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 flex flex-col gap-4">
                            <span className="text-xs font-bold uppercase text-gray-500 mb-2">Share</span>
                            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all group">
                                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all group">
                                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all group">
                                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold hover:text-black flex items-center justify-center transition-all group">
                                <Share2 className="w-5 h-5 text-gray-400 group-hover:text-black" />
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                            {post.content.split('\n').map((paragraph, index) => {
                                // Basic markdown-like parsing for the MVP
                                if (paragraph.startsWith('## ')) {
                                    return <h2 key={index} className="text-3xl mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
                                }
                                if (paragraph.startsWith('### ')) {
                                    return <h3 key={index} className="text-2xl mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
                                }
                                if (paragraph.startsWith('- ')) {
                                    return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>
                                }
                                if (paragraph.trim() === '') return <br key={index} />

                                return <p key={index} className="mb-4 text-gray-300 leading-relaxed theme-dependent-text">{paragraph}</p>
                            })}
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-400 hover:bg-white/10 transition-colors cursor-default">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Sidebar / Related */}
                    <aside className="lg:col-span-3 space-y-8">
                        {/* Newsletter CTA or something could go here */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-bold uppercase mb-2">Join the League</h3>
                            <p className="text-gray-400 text-sm mb-4">Register your team for the next season and compete with the best.</p>
                            <Link href="/register" className="block w-full py-2 bg-gold text-black text-center font-bold uppercase text-sm rounded hover:bg-white transition-colors">
                                Register Now
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
                <div className="bg-white/5 border-t border-white/10 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost, index) => (
                                <BlogCard key={relatedPost._id} post={relatedPost} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
