# Case Study

A React application built with Vite, TypeScript, and following the Bulletproof React architecture.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 7** - Routing with lazy loading
- **TanStack Query** - Data fetching and caching
- **TanStack Table** - Headless table UI
- **Tailwind CSS v3** - Utility-first CSS framework
- **Shadcn UI** - Beautiful, accessible component system
- **Axios** - HTTP client
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Project Structure

```
src/
├── app/               # Application setup and routing
│   ├── providers.tsx  # App-level providers (React Query, Error Boundary)
│   ├── routes/        # Route definitions
│   └── index.tsx      # App entry point
├── components/        # Shared components
│   ├── ui/           # Basic UI components (Button, Spinner, etc.)
│   └── layouts/      # Layout components
├── features/          # Feature-based modules
│   └── users/        # Example feature
│       ├── api/      # API calls and hooks
│       ├── components/ # Feature-specific components
│       ├── routes/   # Feature routes
│       └── types/    # Feature types
├── lib/              # Third-party library configurations
├── hooks/            # Shared custom hooks
├── utils/            # Utility functions
├── types/            # Global type definitions
├── config/           # App configuration
├── stores/           # Global state stores
└── testing/          # Test utilities
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update environment variables in `.env` as needed

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Features

### Architecture Highlights

- **Feature-based organization** - Code organized by features, not technical layers
- **Lazy loading** - Routes are lazy loaded for better performance
- **Type safety** - Full TypeScript coverage
- **API abstraction** - Centralized API configuration with Axios
- **Query management** - TanStack Query for data fetching, caching, and synchronization
- **Error boundaries** - Global error handling

### Example Feature: Users

The project includes an example "Users" feature that demonstrates:
- API integration with TanStack Query
- Custom hooks for data fetching (`useUsers`)
- Custom hooks for mutations (`useCreateUser`)
- TanStack Table integration with custom columns
- Shadcn UI Card components
- Feature-specific components
- Lazy-loaded routes
- Tailwind CSS styling

## Development Guidelines

### Adding a New Feature

1. Create a new folder in `src/features/`
2. Follow the structure:
   - `api/` - API calls and React Query hooks
   - `components/` - Feature-specific components
   - `routes/` - Feature route components
   - `types/` - TypeScript types
   - `index.ts` - Public API exports

### Path Aliases

The project uses `@/` as an alias for `src/`:

```typescript
import { Button } from '@/components/ui/button';
import { useUsers } from '@/features/users';
```

### State Management

- **Server state**: TanStack Query (for API data)
- **Global client state**: Zustand (when needed)
- **Local component state**: React hooks

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Styling with Tailwind CSS

The project uses Tailwind CSS with a custom design system based on CSS variables:

```tsx
// Use semantic color classes
<div className="bg-background text-foreground" />
<Button variant="default">Primary Action</Button>
<Card className="border-border">...</Card>
```

See `TAILWIND_SHADCN.md` for detailed styling guide.

## UI Components

Pre-built Shadcn-style components in `src/components/ui/`:
- Button (with variants)
- Card (with subcomponents)
- Table (with TanStack Table integration)
- DataTable (reusable table component)
- Input
- Spinner
- RenderIf

## Documentation Files

- **README.md** - Project overview (this file)
- **ARCHITECTURE.md** - Detailed architecture guide
- **GETTING_STARTED.md** - Quick start guide
- **TAILWIND_SHADCN.md** - Tailwind CSS + Shadcn UI + TanStack Table guide

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Keep components functional
4. Use Tailwind CSS for styling
5. Follow Shadcn UI patterns for components
6. Write meaningful commit messages in English

## License

MIT
