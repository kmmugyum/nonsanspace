# Replit.md

## Overview

This is a full-stack web application for a Korean accommodation business located in Bangok-ri, Nonsan. The application is built with a modern tech stack using React for the frontend, Express.js for the backend, and PostgreSQL with Drizzle ORM for data persistence. The project follows a monorepo structure with shared schema definitions and uses TypeScript throughout.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API with `/api` prefix

### Build System
- **Frontend Bundler**: Vite with React plugin
- **Backend Bundler**: ESBuild for production builds
- **TypeScript**: Strict mode enabled with path mapping
- **Package Manager**: npm

## Key Components

### Database Schema (`shared/schema.ts`)
- **Users Table**: Basic user authentication with username/password
- **Drizzle Integration**: Type-safe database operations with Zod validation
- **Migration System**: Automated database migrations via Drizzle Kit

### Storage Layer (`server/storage.ts`)
- **Interface-based Design**: `IStorage` interface for database operations
- **Memory Storage**: Development implementation for testing
- **CRUD Operations**: Standardized user management methods

### Frontend Components
- **UI Components**: Complete Shadcn/ui component library
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Accessibility**: ARIA-compliant components via Radix UI
- **Korean Localization**: HTML lang attribute and Korean fonts

### API Client (`client/src/lib/queryClient.ts`)
- **HTTP Client**: Fetch-based API client with error handling
- **Authentication**: Cookie-based session management
- **Query Configuration**: Optimized caching and retry strategies

## Data Flow

1. **Client Request**: Frontend makes API calls via TanStack Query
2. **Backend Processing**: Express routes handle business logic
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Standardized JSON responses with error handling
5. **State Updates**: React Query manages client-side cache updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL driver for Neon Database
- **drizzle-orm**: Type-safe database toolkit
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/react-\***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **drizzle-kit**: Database migration tools
- **tsx**: TypeScript execution for development
- **vite**: Frontend build tool and dev server

## Deployment Strategy

### Development
- **Dev Server**: Vite dev server with HMR
- **Database**: Neon Database connection via environment variables
- **Environment**: NODE_ENV=development with development middleware

### Production
- **Build Process**: Vite builds frontend to `dist/public`, ESBuild bundles backend
- **Static Files**: Express serves built frontend from `dist/public`
- **Database**: Production PostgreSQL via DATABASE_URL environment variable
- **Process**: Single Node.js process serving both API and static files

### Environment Configuration
- **DATABASE_URL**: Required for PostgreSQL connection
- **NODE_ENV**: Controls development vs production behavior
- **Session Management**: Secure cookie-based sessions

## Changelog
- July 05, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.