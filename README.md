# HabitFlow - Habit Tracker PWA

A Progressive Web App for tracking daily habits and building streaks, built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## Phase 1: Foundation UI & Routing

This is Phase 1 of the HabitFlow project, focusing on:
- ✅ Next.js 14 App Router setup
- ✅ TypeScript configuration
- ✅ Tailwind CSS integration
- ✅ Mobile-first responsive design
- ✅ Core routing structure (Splash, Login, Signup, Dashboard)
- ✅ Foundational UI components
- ✅ PWA manifest and service worker setup

### What's NOT Included (Phase 2+)
- Authentication logic
- LocalStorage/Database integration
- Habit creation and management
- Streak calculations
- API endpoints
- Advanced PWA features

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home (splash screen)
│   ├── login/page.tsx     # Login page
│   ├── signup/page.tsx    # Signup page
│   └── dashboard/page.tsx # Dashboard page
├── components/
│   ├── auth/              # Auth components
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── habits/            # Habit components (Phase 2+)
│   ├── shared/            # Shared components
│   │   ├── SplashScreen.tsx
│   │   └── ProtectedRoute.tsx
├── lib/                   # Utility functions
│   ├── auth.ts           # Auth utilities (Phase 2+)
│   ├── habits.ts         # Habit utilities (Phase 2+)
│   ├── storage.ts        # Storage utilities (Phase 2+)
│   ├── streaks.ts        # Streak utilities (Phase 2+)
│   ├── slug.ts           # URL slug utilities
│   ├── validators.ts     # Form validators
│   └── constants.ts      # App constants
├── types/                # TypeScript types
│   ├── auth.ts
│   └── habit.ts
public/
├── icons/               # PWA icons
└── manifest.json        # PWA manifest
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

## Available Routes

- `/` - Splash Screen (Welcome)
- `/login` - Login Page
- `/signup` - Signup Page
- `/dashboard` - Dashboard (placeholder)

## Testing

Test IDs for Phase 1 implementation:

### Splash Screen
- `data-testid="splash-screen"`

### Login Form
- `data-testid="auth-login-email"`
- `data-testid="auth-login-password"`
- `data-testid="auth-login-submit"`

### Signup Form
- `data-testid="auth-signup-email"`
- `data-testid="auth-signup-password"`
- `data-testid="auth-signup-submit"`

### Dashboard
- `data-testid="dashboard-page"`

## Design

The UI follows a mobile-first responsive design with:
- Minimum viewport width: 320px
- Clean, minimal aesthetic
- Purple accent colors (#7c3aed)
- Consistent spacing and typography
- Accessible form inputs and labels

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies

- **Framework**: Next.js 14.2.3
- **UI Library**: React 18.3.1
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.1
- **Package Manager**: npm

## License

MIT

## Version

2.4.0 - Calm Tech Edition
