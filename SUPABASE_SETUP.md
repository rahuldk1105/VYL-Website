# Supabase Setup for Blog

To enable the News & Blog section, you need to create the `blog_posts` table in your Supabase project.

## 1. Run SQL Query
Go to your Supabase Dashboard -> **SQL Editor** -> **New Query** and run the following:

```sql
-- Create the blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'news',
  author_name TEXT NOT NULL DEFAULT 'VYL Team',
  author_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  read_time_minutes INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (allows everyone to read posts)
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (true);
  
-- Create index for faster slug lookups
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
```

## 2. Seed Sample Data (Optional)
Run this SQL to add some starter posts:

```sql
INSERT INTO blog_posts (title, slug, excerpt, content, category, author_name, is_featured, read_time_minutes, cover_image)
VALUES 
(
  'Veeran Winter Cup 2025: Registration Now Open', 
  'veeran-winter-cup-2025-registration-open', 
  'The biggest youth football tournament in Chennai is back! Register your team today for the Winter Cup 2025.', 
  '## The Stage is Set

We are thrilled to announce that registration for the **Veeran Winter Cup 2025** is now officially open! After the massive success of our previous seasons, we are raising the bar even higher this year.

### Tournament Details
- **Dates**: January 20-22, 2025
- **Venue**: VYL Arena, Chennai
- **Categories**: U-9, U-11, U-13, U-15
- **Format**: League cum Knockout

Teams from across South India are expected to participate, making this one of the most competitive platforms for young talents to showcase their skills.

### How to Register
Visit our [Tournaments](/tournaments) page to sign up. Early bird registrations close on December 31st!', 
  'announcement', 
  'Sarah Chen', 
  true, 
  3,
  'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&q=80'
),
(
  'Top 5 Moments from VYL Season 3', 
  'top-5-moments-vyl-season-3', 
  'From last-minute winners to incredible saves, here are the unforgettable highlights from our last season.', 
  '## A Season to Remember

Season 3 of the Veeran Youth League gave us moments that will be etched in our memories forever. Here are our top picks:

### 1. The U-13 Final Penalty Shootout
The tension was palpable as the Blue Panthers faced off against CP Sports. The shootout went to sudden death...

### 2. Rahul''s 30-Yard Screamer
In the group stages, young Rahul form the Dream Chasers unleashed a thunderbolt that left everyone speechless.

- High intensity matches
- Great sportsmanship
- Emerging talents

Stay tuned for more throwbacks!', 
  'story', 
  'Mike Ross', 
  false, 
  5,
  'https://images.unsplash.com/photo-1521412644187-dc1d7d314f76?w=800&q=80'
),
(
  'Why Grassroots Football Matters', 
  'why-grassroots-football-matters', 
  'Exploring the impact of youth development programs on the future of Indian football.', 
  '## Building the Foundation

Grassroots football is not just about the game; it''s about character building, discipline, and community. At VYL, we believe that every child deserves a platform to shine.

We have seen firsthand how organized competition helps young athletes develop:
- **Resilience**: Learning to handle wins and losses.
- **Teamwork**: Working together towards a common goal.
- **Discipline**: Regular training and preparation.

Join us in our mission to revolutionize youth football in India.', 
  'news', 
  'VYL Team', 
  false, 
  4,
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80'
);
```
