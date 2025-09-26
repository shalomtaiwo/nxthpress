# NxthPress

**NxthPress** is an open-source, block-based CMS built with **Next.js (App Router)**, **Prisma + PostgreSQL**, **Auth.js v5**, and **Tailwind CSS**.  
It uses **React Server Components by default** (with Client Components only where needed), and features a modular page builder, blog engine, and live SEO previews.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Quick Start](#quick-start)  
- [Environment Variables](#environment-variables)  
- [Page Builder](#page-builder)  
- [Blog](#blog)  
- [Development Scripts](#development-scripts)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- ⚡ **Server Actions for CRUD** (no API routes)  
- 🧱 **Page Builder** with pluggable blocks + live SEO preview  
- ✍️ **Blog system** with tags, pagination, Markdown, and per-post SEO  
- 🔍 **Draft Preview Mode** with token-based access  
- ☁️ **Cloudinary integration** for file/image uploads  
- 🐳 **Docker Compose setup** for PostgreSQL  
- 🎨 Built with **Tailwind CSS 4**  
- 🚀 Optimized for **Vercel deployment** (ISR enabled by default)  

---

## Tech Stack

| Category       | Technology |
|----------------|------------|
| **Framework**  | Next.js 15 (App Router, React Server Components, ISR) |
| **Language**   | TypeScript |
| **UI / Styling** | Tailwind CSS 4 |
| **Database**   | PostgreSQL with Prisma ORM |
| **Auth**       | Auth.js v5 (NextAuth) |
| **File Storage** | Cloudinary |
| **Markdown**   | react-markdown, remark-gfm, rehype-raw |
| **CMS**        | Custom Page Builder with pluggable blocks + SEO |
| **Deployment** | Vercel or any Node.js host |
| **Containerization** | Docker Compose (Postgres) |

---

## Quick Start

```bash
# clone the repo
git clone https://github.com/shalomtaiwo/nxthpress.git
cd nxthpress

# copy and edit env vars
cp .env.example .env

# install dependencies
pnpm install

# setup database
pnpm db:up
pnpm prisma:migrate
pnpm prisma:generate
pnpm prisma:seed   # optional demo content

# run development server
pnpm dev
```

Now visit [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` → `.env` and set values:

| Name | Description |
|------|-------------|
| `DATABASE_URL` | Prisma/Postgres connection string |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT` | Local Postgres container configuration (used in Docker + DATABASE_URL) |
| `AUTH_SECRET` | Required for Auth.js (NextAuth v5) |
| `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` | GitHub OAuth credentials for Auth.js |
| `AUTH_TRUST_HOST` | Set `true` for local/dev environments |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cloudinary credentials for file uploads |
| `CLOUDINARY_UPLOAD_FOLDER` | Default Cloudinary folder for uploads |
| `PREVIEW_SECRET` | Secret token for Draft Preview mode |

---

## Page Builder

- 📂 **Location:** `src/components/page-builder/`  
- 🧩 **Blocks included:** FeatureGrid, TwoColumn, Testimonial, FAQ, CTA Banner, Video Embed, SEO, and more  
- ✏️ **Editing:** `PageBuilder.tsx` (Client Component) manages block JSON arrays and outputs via hidden `<input name="blocks">`  
- 🎨 **Rendering:** `PageRenderer.tsx` (Server Component) maps block types to renderers in `src/components/page-renderer/`  
- 🔧 **Extending:** Add new blocks by creating:  
  - an editor in `page-builder/editors/`  
  - a renderer in `page-renderer/blocks/`  
  - register both in their `registry.ts` files  

---

## Blog

- 🗂 **Routes:**  
  - `/blog` → blog index (with pagination + optional `?tag=` filter)  
  - `/blog/[slug]` → individual post  
- 📝 **Content:** Markdown via `react-markdown`, `remark-gfm`, and `rehype-raw`  
- ⚙️ **Admin Panel:**  
  - CRUD under `/admin/posts`  
  - Rich Markdown editor  
  - Tag management  
  - Cloudinary cover-image uploads  
- 📈 **SEO:** per-post metadata (`seoTitle`, `seoDescription`, `seoImageUrl`) with live preview  

---

## Development Scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Start Next.js in development mode |
| `pnpm build` | Build for production |
| `pnpm start` | Run production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm db:up` / `pnpm db:down` | Start/stop Postgres (Docker) |
| `pnpm prisma:migrate` | Apply Prisma schema migrations |
| `pnpm prisma:generate` | Generate Prisma client |
| `pnpm prisma:studio` | Open Prisma Studio |
| `pnpm prisma:seed` | Seed demo data into database |

---

## Deployment

- Use a managed PostgreSQL (e.g., Supabase, Neon, RDS) or self-hosted instance  
- Set all required **environment variables** on your host  
- Run `prisma migrate deploy` during deployment to apply schema changes  
- Recommended: **Vercel** (ISR enabled, `revalidate = 60`)  

---

## Contributing

Contributions are welcome!  
Feel free to open issues or submit PRs to improve NxthPress.  

---

## License

MIT License © 2025 NxthPress contributors.  
