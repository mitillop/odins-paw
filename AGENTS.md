# AGENTS.md

## Project

Odin's Paw — AI-powered pet care platform. Next.js 15 App Router, Clerk auth, PostgreSQL via Prisma, OpenAI chat, Azure Blob Storage for images.

## Commands

- `npm run dev` — dev server with Turbopack on port 3000
- `npm run build` — production build
- `npm run lint` — ESLint (next/core-web-vitals)
- `npx prisma migrate dev` — run migrations
- `npx prisma generate` — regenerate Prisma client (also runs on `npm install` via postinstall)

No test suite exists. No typecheck script (tsconfig has `noEmit: true` but no tsc command).

## Language

UI text, comments, and variable names are in **Spanish**. Keep them consistent. Enums (`PetType`: Gato/Perro, `Sex`: Macho/Hembra, `ChatCategory`: Alimentacion/Cuidados/Preguntas_Generales) are Spanish.

## Architecture

```
src/
├── app/                 # Next.js App Router
│   ├── api/chat/        # OpenAI streaming routes (general, nutrition, tips)
│   ├── actions/         # Server actions (pets, chat, users, files)
│   ├── dashboard/       # Main authenticated area (layout + page + history)
│   ├── sign-in/sign-up/ # Clerk auth pages
│   ├── styles/          # globals.css (TailwindCSS 4)
│   ├── layout.jsx       # Root: ClerkProvider → Providers (React Query) → StoreProvider (Redux)
│   ├── StoreProvider.tsx # Redux store wrapper
│   └── page.jsx         # Landing page (redirects to /dashboard if signed in)
├── components/          # All React components (JSX, no TSX components)
├── hooks/               # Custom hooks (usePets, useDiets, useChatMutations, useChatHistory)
├── libs/
│   ├── db.js            # Prisma singleton (globalForPrisma pattern)
│   ├── store.ts         # Redux Toolkit store (user + pet slices)
│   ├── features/        # Redux slices (user/, pet/)
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
└── middleware.ts        # Clerk auth middleware
```

## Key patterns

- **Mixed JS/TS**: Components are `.jsx`, most actions are `.js`, store and types are `.ts`. No TypeScript components.
- **Prisma BigInt IDs**: Models use `BigInt @id`. Serialize to `Number()` before returning to client (see `createPet.js` for pattern).
- **Auth flow**: `syncUserWithDB()` in dashboard page syncs Clerk user to Postgres on first visit. Server actions use `currentUser()` from Clerk.
- **Public routes**: `/`, `/sign-in`, `/sign-up`, `/api/chat/general` (configured in `middleware.ts`).
- **State**: Redux Toolkit for client state (user, pet). TanStack React Query for server state.
- **AI chat**: Uses `@ai-sdk/openai` with `streamText()`. Three endpoints: general, nutrition, tips. Responses saved to `chat_history` table via `onFinish` callback.

## Gotchas

- `.env` and `.env.local` are committed — contain API keys (Clerk, OpenAI, Azure). Treat as reference; rotate if needed.
- `next.config.js` whitelists `odinpawsimages.blob.core.windows.net` for images and externalizes `@prisma/client` for server components.
- Two Prisma client singletons exist: `src/libs/db.js` and `prisma/client.js` — use `src/libs/db.js` (the one used by app code).
- `tsconfig.json` includes `src/app/providers.jsx` in the include array — this is a manual override for the JSX provider file.
- DaisyUI theme: `data-theme="caramellatte"` set on `<html>`.
- No pre-commit hooks, no CI config, no test framework configured.
