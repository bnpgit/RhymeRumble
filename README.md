# RhymeRumble - Poetry Battle Platform

A full-stack web application where poets battle through words! Create themes with dualities, write poems, and let the community decide the winners.

## Features

### 🔐 Authentication & User Management
- Email/password authentication with Supabase Auth
- User profiles with avatar upload
- Protected routes and role-based access
- Password reset functionality

### 🎭 Poetry Battles
- Create themes with dual perspectives (e.g., "Fire: Friend or Foe")
- Write poems choosing a side or remaining neutral
- Real-time voting and like system
- Battle results and winner determination

### 👥 Social Features
- Friend system with requests and connections
- Activity feeds and notifications
- User discovery and recommendations
- Invite friends to battles

### 🏆 Gamification
- Points and leveling system
- Leaderboards (overall, monthly, battle wins)
- Achievement tracking
- User statistics and progress

### 📱 Modern UI/UX
- Responsive design (mobile-first)
- Clean, modern interface with Tailwind CSS
- Real-time updates with Supabase subscriptions
- Loading states and error handling

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Query** for state management and caching
- **Zustand** for global state
- **React Hook Form** for form handling
- **Lucide React** for icons

### Backend
- **Supabase** for database, auth, and real-time features
- **PostgreSQL** with Row Level Security (RLS)
- **Supabase Storage** for file uploads

### Testing
- **Vitest** for unit testing
- **React Testing Library** for component testing
- **jsdom** for DOM simulation

### Deployment
- **Netlify** for frontend hosting
- **Supabase** for backend services

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Netlify account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rhyme-rumble
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Run the migration script in the Supabase SQL editor:
     ```sql
     -- Copy and paste the contents of supabase/migrations/create_initial_schema.sql
     ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

### Database Setup

The application uses the following database schema:

- **profiles**: User information and stats
- **themes**: Poetry battle themes with dualities
- **poems**: User-submitted poems with side selection
- **poem_likes**: Like system for poems
- **friendships**: Social connections between users

All tables have Row Level Security (RLS) enabled for data protection.

### Testing

Run the test suite:
```bash
npm run test
```

Run tests with UI:
```bash
npm run test:ui
```

## Deployment

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

3. **Configure redirects**
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

### Environment Variables for Production

Set these in your Netlify dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## API Documentation

### Supabase Integration

#### Authentication
- Sign up: `supabase.auth.signUp()`
- Sign in: `supabase.auth.signInWithPassword()`
- Sign out: `supabase.auth.signOut()`
- Password reset: `supabase.auth.resetPasswordForEmail()`

#### Database Operations
- **Themes**: CRUD operations with real-time subscriptions
- **Poems**: Create, read, like/unlike functionality
- **Profiles**: User data management
- **Friendships**: Social connection management

#### Real-time Features
- Live updates for new poems and likes
- Real-time battle participation counts
- Activity feed updates

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Header, etc.)
│   ├── poems/          # Poem-related components
│   ├── profile/        # User profile components
│   ├── themes/         # Theme/battle components
│   └── ui/             # Base UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components
├── stores/             # Zustand stores
├── test/               # Test files
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@rhymerumble.com or create an issue in the GitHub repository.