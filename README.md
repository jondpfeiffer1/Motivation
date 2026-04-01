# MotivateMe 🔥

**Your daily dose of motivation, not distraction.**

MotivateMe is a mobile app that replaces doomscrolling on social media with curated, personalized motivational content. Instead of opening Instagram and getting pulled into negativity, open MotivateMe and get videos, quotes, and a daily plan tailored to what you're going through.

## Features

- **Personalized Content** — Tell us what you're dealing with (anxiety, career, relationships, etc.) and we'll match content to you
- **Daily Motivational Videos** — Curated from the best motivational creators across the web
- **Quotes & Affirmations** — Daily inspiration matched to your journey, with a prompt to speak them out loud
- **Daily Planner** — Structure your day with morning routines, goals, and check-ins
- **Growth Tracker** — Streaks, milestones, and progress visualization
- **Mood Check-ins** — Tell us how you're feeling and we'll adapt your content
- **Finite by Design** — No infinite scroll. Get your daily motivation and go live your life.

## Tech Stack

- **React Native** + **Expo** (SDK 54) — Cross-platform iOS & Android
- **TypeScript** — Type-safe development
- **Expo Router** — File-based navigation
- **Zustand** — Lightweight state management
- **Supabase** — Backend (auth, database, storage)
- **YouTube Data API** — Motivational video sourcing

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app on your phone (for testing)

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase and YouTube API keys

# Start the development server
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS) to run on your phone.

## Project Structure

```
app/                    # Screens (Expo Router file-based routing)
  (onboarding)/         # Welcome, profile setup, preferences
  (tabs)/               # Main app tabs (feed, quotes, planner, progress, profile)
  video/[id].tsx        # Video player screen
components/             # Reusable UI components
lib/                    # Utilities (Supabase, YouTube API, content engine, notifications)
stores/                 # Zustand state management stores
types/                  # TypeScript type definitions
constants/              # Categories, seed quotes, sample videos, theme
```

## Content Categories

Anxiety, Depression, Career Growth, Relationships, Self-Love, Fitness & Health, Financial Goals, Grief & Loss, Recovery, Student Life, Parenting, Spirituality

## License

MIT
