# ROHAN BHEEMAVARAPU — THE UNREAL SHOWCASE

A Netflix-inspired portfolio website built with Next.js 14, featuring drag-and-drop project uploads, Supabase backend, and deployed on Vercel's free tier.

## ✨ Features

- 🎬 **Netflix-Style UI**: Horizontal scrolling rows, hover previews, and smooth animations
- 📤 **Drag & Drop Uploads**: Admin dashboard with intuitive file upload system
- 🗄️ **Supabase Backend**: PostgreSQL database, authentication, and storage - all free tier
- 🔐 **Magic Link Auth**: Secure email-based admin authentication
- 📱 **Fully Responsive**: Pixel-perfect on mobile, tablet, and desktop
- ⚡ **Performance Optimized**: Built for Lighthouse scores ≥ 95
- 🎨 **Custom Animations**: Framer Motion for smooth, engaging interactions
- 🌐 **PWA Ready**: Offline support and installable
- 🔍 **SEO Optimized**: Dynamic sitemaps, metadata, and Open Graph tags

## 🚀 Quick Start

### Prerequisites

- Node.js 20.10.0+ (use `.nvmrc`)
- A free [Supabase](https://supabase.com) account
- A free [Vercel](https://vercel.com) account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:nitinrohan/ROHAN-BHEEMAVARAPU-THE-UNREAL-SHOWCASE.git
   cd ROHAN-BHEEMAVARAPU-THE-UNREAL-SHOWCASE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Supabase credentials (see [Supabase Setup](#supabase-setup))

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Supabase Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Choose a name, database password, and region
4. Wait for project initialization (~2 minutes)

### 2. Run Database Migrations

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase/migrations/20250101000000_initial_schema.sql`
3. Paste into the SQL Editor and click "Run"
4. ✅ This creates your tables, RLS policies, and triggers

### 3. (Optional) Add Seed Data

1. In the SQL Editor, copy the contents of `supabase/seed.sql`
2. Paste and click "Run"
3. ✅ This adds 3 example projects for testing

### 4. Create Storage Buckets

1. Go to **Storage** in your Supabase dashboard
2. Click "New bucket"
3. Create a bucket named `project-media`
   - Make it **public**
   - Enable file size limit: 50 MB
4. Create a bucket named `project-thumbs`
   - Make it **public**
   - Enable file size limit: 5 MB

### 5. Get Your API Keys

1. Go to **Project Settings** → **API**
2. Copy these values to your `.env` file:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

### 6. Configure Admin Emails

In your `.env` file, set:
```
ADMIN_EMAILS=your-email@example.com,another-admin@example.com
```

Only these emails can access the `/admin` dashboard.

## 📦 Environment Variables

Create a `.env` file with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Admin access (comma-separated emails)
ADMIN_EMAILS=admin@example.com

# Site URL (for production, use your Vercel URL)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🎨 Customization

### Change Branding

Edit `app/layout.tsx` to update the site title and description:
```typescript
export const metadata: Metadata = {
  title: 'YOUR NAME — YOUR TAGLINE',
  description: 'Your custom description',
  // ...
};
```

### Change Theme Colors

Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  primary: 'hsl(0 72% 51%)', // Netflix red
  // Change to your brand color
}
```

### Update Hero Section

The hero section automatically displays your first featured project. To customize the fallback:
- Edit `components/hero.tsx`

## 📱 Usage

### Adding Projects (Admin)

1. Navigate to `/auth/login`
2. Enter your admin email (must be in `ADMIN_EMAILS`)
3. Check your email for the magic link
4. Click the link to sign in
5. Go to `/admin` → "New Project"
6. Fill in project details
7. Drag & drop images/videos
8. Click "Create Project"

### Public Features

- **Browse**: Scroll through Netflix-style project rows
- **Search**: Use the search bar (coming soon)
- **My List**: Click the heart icon to save favorites
- **View Details**: Click any project card for full details

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nitinrohan/ROHAN-BHEEMAVARAPU-THE-UNREAL-SHOWCASE)

Or manually:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" → Import your GitHub repo
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAILS`
   - `NEXT_PUBLIC_SITE_URL` (use your Vercel URL)
5. Click "Deploy"

### Custom Domain

1. In Vercel, go to your project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` in environment variables

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run e2e

# Lint
npm run lint

# Format code
npm run format
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages & routes
│   ├── projects/[slug]/   # Dynamic project pages
│   ├── my-list/           # Favorites page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── admin/             # Admin-specific components
│   ├── navigation.tsx     # Site navigation
│   ├── hero.tsx           # Hero section
│   ├── project-card.tsx   # Project card
│   └── project-row.tsx    # Horizontal row
├── lib/                   # Utilities
│   ├── supabase/          # Supabase clients
│   ├── utils.ts           # Helper functions
│   └── validations.ts     # Zod schemas
├── supabase/              # Database files
│   ├── migrations/        # SQL migrations
│   └── seed.sql           # Sample data
└── public/                # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm test             # Run unit tests
npm run e2e          # Run E2E tests
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Rohan Bheemavarapu

## 🆘 Troubleshooting

### "Cannot connect to Supabase"
- Check that your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Ensure your Supabase project is active (free tier has no downtime)

### "Failed to upload file"
- Verify storage buckets are public
- Check bucket size limits (5MB for thumbs, 50MB for media)
- Ensure RLS policies allow authenticated uploads

### "Cannot access /admin"
- Make sure you're logged in via magic link
- Verify your email is in the `ADMIN_EMAILS` environment variable
- Check Supabase RLS policies are enabled

### PWA not installing
- Must be served over HTTPS (works on Vercel, not localhost)
- Check `manifest.json` is accessible at `/manifest.json`

## 📞 Support

For issues or questions, please [open an issue](https://github.com/nitinrohan/ROHAN-BHEEMAVARAPU-THE-UNREAL-SHOWCASE/issues) on GitHub.

---

**Built with ❤️ by Rohan Bheemavarapu**
