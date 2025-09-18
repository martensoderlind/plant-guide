# Plant Guide

A web application for plant care guides and gardening resources, built with Next.js 15, TypeScript, and PostgreSQL.

## Features

- **Plant Guides**: Comprehensive guides for various plants
- **Articles**: Informative articles about plant care
- **Tools**: Practical tools for gardening enthusiasts
- **Admin Dashboard**: Administrative panel for content management
- **Responsive Design**: Optimized for all devices

## Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Drizzle ORM
- **Icons**: Lucide React
- **Validation**: Zod
- **Development**: Turbopack for fast development builds

## Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- PostgreSQL database

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd plant-guide
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/plant_guide"
   ```

4. **Set up the database**:

   ```bash
   npm run db:push
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run db:push` - Synchronize database schema changes
- `npm run db:studio` - Open Drizzle Studio for database management

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── about-us/          # About page
│   ├── admin-dashboard/   # Administrative panel
│   ├── articles/          # Article pages
│   ├── plant-guides/      # Plant guide pages
│   └── tools/             # Tool pages
├── components/            # Reusable components
├── db/                    # Database configuration
└── features/              # Feature-specific modules
    └── admin-dashboard/   # Admin functionality
```

## Database

The project uses PostgreSQL with Drizzle ORM for database management. Database schemas are defined in `src/features/**/schema.ts` files.

### Database Tools

- **Drizzle Studio**: Visual database explorer (`npm run db:studio`)
- **Schema Push**: Synchronize schema changes (`npm run db:push`)

## Styling

The project uses Tailwind CSS v4 for styling with:

- Responsive design patterns
- Modern CSS Grid and Flexbox layouts
- Custom component styling

## Development

This project follows modern React and Next.js development patterns:

- App Router for routing
- Server and Client Components
- TypeScript for type safety
- Feature-based architecture
