# Contributing to NxthPress

Thanks for your interest in contributing! 🎉  
We welcome pull requests, bug reports, and feature discussions.

---

## Requirements

- [Node.js 20+](https://nodejs.org/)  
- [pnpm](https://pnpm.io/)  
- [Docker](https://www.docker.com/) (for local PostgreSQL)  

---

## Setup

```bash
git clone https://github.com/your-org/nxthpress.git
cd nxthpress

# copy environment variables
cp .env.example .env

# install dependencies
pnpm install

# start local Postgres
pnpm db:up

# run database migrations and generate Prisma client
pnpm prisma:migrate
pnpm prisma:generate
pnpm prisma:seed   # optional demo data

# start development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Coding Guidelines

- ✅ **TypeScript everywhere** (strict mode enabled)  
- ✅ **React Server Components by default** — use `"use client"` only when interactivity is required  
- ✅ **Server Actions** for CRUD only (single-argument signature: `(formData) => Promise<void>`)  
- ✅ **Tailwind CSS**: minimal utility classes, consistent with existing patterns  

---

## Page Builder

To add a new block:

1. Extend the union type in `src/components/page-builder/types.ts`  
2. Create an **editor** component in `page-builder/editors/`  
3. Create a **renderer** in `page-renderer/blocks/`  
4. Register both in their respective `registry.ts` files  

---

## Blog

- SEO fields (`seoTitle`, `seoDescription`, `seoImageUrl`) are **optional**  
- Always **fallback gracefully** to title/excerpt/cover image when SEO fields are missing  

---

## Commit Style

We use **[Conventional Commits](https://www.conventionalcommits.org/)**:

- `feat:` new feature  
- `fix:` bug fix  
- `docs:` documentation  
- `chore:` tooling or dependency changes  
- `refactor:` code change with no new feature/fix  

---

## Pull Requests

1. Fork and create a feature branch:

   ```bash
   git checkout -b feat/your-feature
   ```

2. Before committing, ensure:

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm build
   ```

3. Commit with a descriptive message  
4. Push and open a PR against `main`  

---

## Reporting Issues

- Use the **GitHub issue templates**  
- Include:
  - Reproduction steps  
  - Environment details (OS, Node.js version, etc.)  
