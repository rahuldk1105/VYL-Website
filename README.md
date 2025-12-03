# Veeran Youth League (VYL) - Youth Football Website

A modern, responsive youth football website for Veeran Youth League (VYL), a CP Sports division based in Chennai. Built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- **Homepage**: Hero carousel, mission section, events showcase, and statistics
- **Tournament Finder**: Advanced filtering by sport, tier, and date
- **Event Details**: Comprehensive tournament information with registration
- **Photo Gallery**: Professional event photography with lightbox functionality
- **About Us**: Company information, team, and achievements
- **Legal Pages**: Privacy Policy and Terms of Service
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Performance Optimized**: Next.js Image optimization and lazy loading

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **CMS**: Sanity (configured but not integrated)
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── find-a-tournament/ # Tournament finder
│   ├── tournaments/       # Individual tournament pages
│   ├── gallery/          # Photo galleries
│   ├── about/            # About us page
│   ├── privacy/          # Privacy policy
│   └── terms/            # Terms of service
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Responsive navigation
│   ├── HeroCarousel.tsx   # Homepage hero carousel
│   ├── EventsCarousel.tsx # Events showcase
│   ├── TournamentFilter.tsx # Tournament filtering
│   └── TournamentGrid.tsx # Tournament cards
├── lib/                   # Utilities and data
│   ├── types.ts          # TypeScript interfaces
│   ├── mockData.ts       # Mock tournament data
│   └── galleryData.ts    # Mock gallery data
└── schemas/              # Sanity CMS schemas
```

## Key Features Implementation

### Tournament System
- Three-tier competition system: Lions (Elite), Tigers (Competitive), Panthers (Developmental)
- Advanced filtering by sport, tier, location, and date
- Detailed tournament pages with registration functionality
- Mock data for 6 different sports tournaments

### Photo Gallery
- Professional event photography showcase
- Interactive lightbox with keyboard navigation
- Category-based filtering
- Download and share functionality

### Responsive Design
- Mobile-first approach with TailwindCSS
- Smooth animations and transitions
- Optimized for all device sizes
- Professional color scheme matching brand guidelines

## Deployment

### Vercel Deployment

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import your repository to Vercel
3. Configure environment variables if needed
4. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Environment Variables

Create a `.env.local` file for local development:

```env
# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Sanity CMS (when ready to integrate)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

## Customization

### Color Scheme
The website uses VYL branding defined in `globals.css`:
- Primary: Black `#000000`
- Accent: Gold `#FFD60A`
- Background: White `#ffffff`

### Content Management
- Currently using mock data for demonstration
- Ready for Sanity CMS integration when needed
- GROQ queries prepared for dynamic content

## Performance Features

- Next.js Image optimization for all images
- Lazy loading for photo galleries
- Code splitting and optimization
- Static generation for fast page loads
- Responsive images with proper sizing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Veeran Youth League (VYL), CP Sports division. All rights reserved.

## Support

For support or questions, please contact:
- Email: info@vylleague.com
- Phone: +91 98765 43210

---

Built with ❤️ by the Maximevents Asia team
