# dashboard
>>>>>>> bf93be889b3b46bb9a526354a3a7f00b06777184
# Dashboard - Next.js Authentication System

A comprehensive authentication and user management dashboard built with Next.js 13, Supabase, and TypeScript.

## Features

- **User Authentication**: Complete signup and login system
- **Role-Based Access Control**: Multiple user roles (SuperAdmin, SupportAdmin, AccountsAdmin, etc.)
- **User Categories**: Staff, Vendor, and PublicUser classifications
- **Dashboard Views**: Role-specific dashboard interfaces
- **Profile Management**: User profile creation and management
- **Database Integration**: Supabase PostgreSQL with Row Level Security

## Tech Stack

- **Frontend**: Next.js 13 with App Router
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Forms**: React Hook Form with Zod validation
- **Language**: TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## User Roles

- **SuperAdmin**: Full system access and user management
- **SupportAdmin**: Customer support and ticket management
- **AccountsAdmin**: Financial and accounting operations
- **MarketingAdmin**: Marketing campaigns and analytics
- **PartnerAdmin**: Partner relationship management
- **SupplierAdmin**: Supply chain and vendor management
- **AgentAdmin**: Agent operations and commission tracking
- **UserAdmin**: Basic user access and profile management
=======
# dashboard
>>>>>>> bf93be889b3b46bb9a526354a3a7f00b06777184
