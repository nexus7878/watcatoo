# WATCatoo — Premium Anime Streaming Landing Page

A cinematic, modern landing page for **WATCatoo**, built with React 18, TypeScript, Tailwind CSS, and Vite. Inspired by the discovery and streaming experiences of Crunchyroll and Netflix, with a bespoke dark-and-green aesthetic.

---

## 🎨 Brand Identity & Palette

- **Main Background**: `#080A09`
- **Secondary Background**: `#101411`
- **Card Background**: `#151A16`
- **Primary Green**: `#39E66B`
- **Secondary Green**: `#20C45A`
- **Primary Text**: `#F5F7F5`
- **Secondary Text**: `#A0AAA2`
- **Borders**: `#262D28`

The official WATCatoo wordmark logo is preserved in `public/watcatoo-logo.png` and served cleanly in the navigation bar and footer.

---

## ✨ Features Implemented

1. **Minimal Navigation Bar**:
   - Official WATCatoo wordmark with subtle hover animation.
   - Smooth-scrolling section links: `Home`, `Discover`, `Genres`.
   - Global interactive search modal (`/` keyboard shortcut or click) with live query filtering across anime titles, genres, and keywords.
   - "Sign In" button with early access VIP waitlist modal and email subscription.
   - Fully responsive layout with mobile drawer navigation and accessible keyboard focus states.

2. **Cinematic Hero Section**:
   - Ultra-wide 1920px Demon Slayer backdrop with multi-stop dark gradient masking for optimal text readability.
   - Headline: *"Your Next Anime Obsession."*
   - Supporting copy: *"Discover unforgettable worlds, legendary adventures, and stories that stay with you."*
   - Badges: `Featured Premiere`, `Simulcast in 4K`, audio formats (`SUB / DUB`), and genre pills.
   - Primary CTA: *Explore Anime* (smoothly scrolls to the trending section).
   - Secondary CTA: *Discover Your World* (smoothly scrolls to genres).
   - Interactive spotlight pills to toggle featured titles (Demon Slayer, One Piece, That Time I Got Reincarnated as a Slime, Daemons of the Shadow Realm).

3. **Trending Anime Row**:
   - Heading: *"Trending Now"*.
   - 2:3 aspect ratio poster cards for authentic keyart presentation.
   - Verified titles, genres, release years, and episode metadata.
   - Shimmer loading state and graceful fallback if artwork is blocked or unavailable.
   - Restrained hover states: gentle lift, green border glow (`#39E66B`), quick info overlay, and preview button.
   - Clicking any card opens the series detail modal with full synopsis, genre tags, and watchlist toggle.
   - Active genre filter pill with instant reset.

4. **Discover by Genre Section**:
   - Heading: *"Find Your Kind of Story"*.
   - 6 curated genre tiles: `Action`, `Fantasy`, `Romance`, `Adventure`, `Sci-Fi`, and `Mystery`.
   - Subtle image treatment with dark overlays and green hover accents.
   - Clicking any genre tile instantly filters the trending grid and smooth-scrolls to the results.

5. **Editorial Brand Statement**:
   - Minimalist layout with headline: *“Every world has a story.”*
   - Editorial reflection on discovery, imagination, and community.
   - 3 value pillars: *Uncut High-Definition*, *Global Simulcasts*, and *Curated by Fans*.

6. **New Dedicated Multi-Page Views**:
   - **Popular Page** (`#popular`): Global chart ranking with podium styling (#1 Solo Leveling, #2 Jujutsu Kaisen, #3 Demon Slayer), genre filter bar, and sort controls.
   - **Simulcast Calendar** (`#simulcasts`): Tokyo broadcast sync calendar with day-by-day tabs (Mon–Sun), air time badges, latest episode drop indicators, and studio labels.
   - **Browse Genres** (`#genres`): Thematic catalog corridors with count badges, dynamic hero category backdrops, and filtered series grids.
   - **Landing Page** (`#home`): Full cinematic brand landing page.

7. **Final Call-to-Action**:
   - Atmospheric banner with dark artwork watermark.
   - Headline: *"Ready for your next adventure?"*
   - Supporting copy: *"Find your next favourite story on WATCatoo."*
   - *Explore Anime* action button.

8. **Footer**:
   - WATCatoo wordmark, category navigation, copyright notice (`© 2026 WATCatoo Entertainment. All rights reserved.`).
   - Informative modal dialogs for `About WATCatoo`, `Privacy Policy`, `Terms of Service`, and `Licensing & Attribution`.

---

## 🚀 Local Run Instructions

### Prerequisites
- Node.js (v18+ or v20+)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
watcatoo-website/
├── public/
│   └── watcatoo-logo.png               # Official WATCatoo wordmark asset
├── src/
│   ├── components/
│   │   ├── AnimeDetailModal.tsx        # Series preview & synopsis modal
│   │   ├── AnimeImage.tsx              # Robust image component with fallback
│   │   ├── BrandStatement.tsx          # "Every world has a story." editorial section
│   │   ├── FinalCta.tsx                # Final CTA before footer
│   │   ├── Footer.tsx                  # Footer & policy modal triggers
│   │   ├── GenreSection.tsx            # 6 interactive genre discovery tiles
│   │   ├── HeroSection.tsx             # Cinematic hero with Demon Slayer artwork
│   │   ├── Navbar.tsx                  # Minimal top bar with search & navigation
│   │   ├── NoticeModal.tsx             # Early access waitlist & info modal
│   │   ├── SearchModal.tsx             # Live anime search modal (press '/' or ⌘K)
│   │   └── TrendingSection.tsx         # Trending Now poster row with filtering
│   ├── pages/
│   │   ├── HomePage.tsx                # Main cinematic discovery landing page
│   │   ├── PopularPage.tsx             # Global charts & leaderboard
│   │   ├── SimulcastsPage.tsx          # Tokyo broadcast schedule & lineup
│   │   └── GenresPage.tsx              # Thematic catalog & genre corridors
│   ├── data/
│   │   └── animeData.ts                # Centralized anime dataset from verified links
│   ├── App.tsx                         # Client-side router & modal state
│   ├── index.css                       # Brand CSS variables & tailwind directives
│   └── main.tsx                        # React DOM root entry
├── index.html                          # SEO metadata & Google Fonts
├── package.json
├── tailwind.config.js                  # Tailored brand color tokens
├── tsconfig.json
└── vite.config.ts
```
