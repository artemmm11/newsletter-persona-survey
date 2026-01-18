# Newsletter Persona Survey

An interactive 7-step survey that helps users discover their unique work persona. Built with Next.js 14, Tailwind CSS, and Framer Motion.

## Features

- **7-Step Survey Flow** - Guided experience with progress indicator
- **4 Trait Axes** - Vision, Structure, Speed, Empathy
- **8 Animal Personas** - Owl, Fox, Dolphin, Lion, Elephant, Hawk, Beaver, Octopus
- **Audience Analysis** - Personalized segment insights
- **Progress Persistence** - Auto-save to localStorage
- **Shareable Results** - Copy link to share your persona
- **Mobile-First Design** - Responsive and premium UI
- **Smooth Animations** - Framer Motion transitions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd newsletter-persona-survey

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

No environment variables required.

## Customization

### Editing Questions & Personas

All survey content is in a single config file:

```
src/config/survey.ts
```

This file contains:
- **questions** - Array of 7 questions with answer options and trait scores
- **personas** - Array of 8 animal personas with descriptions
- **audienceSegments** - Audience analysis segments

### Scoring System

Each answer adds points to 4 trait axes:
- **Vision** (0-21 max)
- **Structure** (0-21 max)
- **Speed** (0-21 max)
- **Empathy** (0-21 max)

Persona is determined by matching trait levels (high/medium/low) to ideal profiles.

### Adding a New Question

```typescript
{
  id: 'q8',
  question: 'Your question text?',
  answers: [
    { id: 'q8a', text: 'Answer A', scores: { vision: 2, speed: 1 } },
    { id: 'q8b', text: 'Answer B', scores: { structure: 3 } },
    // ...
  ],
},
```

### Adding a New Persona

```typescript
{
  id: 'tiger',
  name: 'The Tiger',
  emoji: '🐯',
  tagline: 'Your tagline',
  description: 'Description text...',
  traits: ['Trait1', 'Trait2'],
  strengths: ['Strength 1', 'Strength 2'],
  watchOuts: ['Watch-out 1'],
  nextSteps: ['Next step 1'],
  idealProfile: { vision: 'high', structure: 'low', speed: 'high', empathy: 'medium' },
},
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home/Hero page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   ├── survey/
│   │   └── page.tsx      # Survey flow
│   └── results/
│       └── page.tsx      # Results page
├── config/
│   └── survey.ts         # Questions, personas, segments
└── lib/
    ├── scoring.ts        # Scoring logic
    └── storage.ts        # localStorage helpers
```

## License

MIT
