import { Newspaper, Calendar, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'News & Updates | Veeran Youth League',
  description: 'Latest news, announcements, and updates from Veeran Youth League.'
}

export default function NewsPage() {
  const newsItems = [
    {
      id: 1,
      title: 'Madrid Spain International Trials Announced',
      date: 'December 2024',
      category: 'Announcements',
      excerpt: 'Veeran Youth League announces international trials in Madrid, Spain for U12, U14, and U16 age categories. Limited slots available.',
      link: '/#madrid-trials'
    },
    {
      id: 2,
      title: 'Veeran Winter Cup 2025 Registration Opens',
      date: 'December 2024',
      category: 'Tournaments',
      excerpt: 'Two days of endless energy and pure football. Register your team now for the biggest youth football event of the winter.',
      link: '/tournaments/veeran-winter-cup'
    },
    {
      id: 3,
      title: 'Face Recognition Gallery Feature Launched',
      date: 'December 2024',
      category: 'Features',
      excerpt: 'Find your photos instantly using our new AI-powered face recognition technology in tournament galleries.',
      link: '/gallery'
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      {/* Background Gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,160,0,0.1),transparent_50%)] z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(25,118,210,0.1),transparent_50%)] z-0 pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-12 px-4 border-b border-white/10 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-wider mb-6">
            <Newspaper className="w-4 h-4" />
            Latest Updates
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            News & Updates
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Stay updated with the latest announcements, tournaments, and developments from Veeran Youth League.
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:border-gold/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/20 px-2 py-1 rounded">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {item.excerpt}
              </p>
              <a
                href={item.link}
                className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:gap-3 transition-all"
              >
                Read More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/5 border border-white/10 rounded-2xl p-8">
            <Newspaper className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 mb-2">More news and updates coming soon</p>
            <p className="text-gray-500 text-sm">
              Follow us on social media to stay updated with the latest announcements
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
