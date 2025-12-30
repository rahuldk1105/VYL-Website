import { supabase } from './supabaseClient'
import { BlogPost } from './types'

// Helper to map snake_case DB columns to camelCase TS interface
const mapDatabasePostToPost = (dbPost: any): BlogPost => {
    return {
        _id: dbPost.id,
        title: dbPost.title,
        slug: dbPost.slug,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        coverImage: dbPost.cover_image || '/images/headers/page-hero.jpg',
        category: dbPost.category,
        authorName: dbPost.author_name,
        authorImage: dbPost.author_image,
        publishedAt: dbPost.published_at,
        isFeatured: dbPost.is_featured,
        tags: dbPost.tags || [],
        readTimeMinutes: dbPost.read_time_minutes || 5
    }
}

export const getPosts = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })

    if (error) {
        console.error('Error fetching posts:', error)
        return []
    }

    return data.map(mapDatabasePostToPost)
}

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .lte('published_at', new Date().toISOString())
        .single()

    if (error) {
        console.error('Error fetching post:', error)
        return null
    }

    return mapDatabasePostToPost(data)
}

export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_featured', true)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })
        .limit(3)

    if (error) {
        console.error('Error fetching featured posts:', error)
        return []
    }

    return data.map(mapDatabasePostToPost)
}

export const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })

    if (error) {
        console.error('Error fetching posts by category:', error)
        return []
    }

    return data.map(mapDatabasePostToPost)
}

export const getRelatedPosts = async (currentSlug: string, category: string, limit: number = 3): Promise<BlogPost[]> => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .neq('slug', currentSlug)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching related posts:', error)
        return []
    }

    return data.map(mapDatabasePostToPost)
}
