# AGENTS.md — Repository Standards & AI Guidelines

Welcome to the **karthi.me** codebase. Any AI agent or developer contributing to this repository MUST strictly abide by the rules and conventions established in this document and within the `.agents/` directory.

---

## 1. Workspace Identity & Import Rule

### Comment Standard
Every file that imports modules from the workspace must include the standard comment:
```typescript
// import {} from "@karthi" // @karthi will be the workspace name.
```

### Direct Barrel Imports
Deep relative paths (e.g. `../../ui/pages/home/sections/AboutSection`) are **STRICTLY PROHIBITED**.
All imports must use the barrel aliases defined in `tsconfig.json`:

```typescript
// UI Modules (Layouts, Shared Components, Sections, Animations)
import { AboutSection, AppShell, Button, PolyhedronCanvas } from "@karthi/ui";

// Data Modules
import { servicesData, experienceData, navItems } from "@karthi/data";

// Hooks Modules
import { useSmoothScroll, useCursorPhysics } from "@karthi/hooks";

// Providers Modules
import { ViewTransitionProvider } from "@karthi/providers";

// TypeScript Types
import type { ServiceItem, TimelineItem } from "@karthi/types";

// Master Stylesheet
import "@karthi/styles";
```

---

## 2. Barrel Auto-Generation Rule (`scripts/generate-barrels.ts`)

- Do NOT manually write index export lines when adding new components or data items.
- Run the auto-generator script:
  ```bash
  pnpm run barrels
  ```
- This script automatically traverses:
  - `src/elements/ui/layouts/`
  - `src/elements/ui/components/`
  - `src/elements/ui/animations/`
  - `src/elements/ui/pages/*/sections/`
  - `src/elements/providers/`
  - and updates the unified `src/elements/ui/index.ts`, `src/elements/providers/index.ts`, `src/elements/data/index.ts`, `src/elements/hooks/index.ts`, `src/elements/types/index.ts`, and `src/elements/index.ts`.
- The barrel generator is also wired into the `prebuild` npm hook so Vercel builds always have up-to-date barrels.

---

## 3. Directory & Architecture Standards

```plaintext
src/
├── app/                  # Next.js App Router (pages, layout, fonts, sitemap, robots)
└── elements/             # Consolidated Architecture Hub
    ├── styles/           # CSS modules & tokens (imported via @karthi/styles)
    ├── providers/        # Context & runtime interceptor providers (e.g. ViewTransitionProvider)
    ├── ui/               # All presentational UI modules
    │   ├── layouts/      # AppShell, MobileHeader, MobileDrawer, SideNav, SideProfile
    │   ├── pages/        # Page-scoped modules (e.g. pages/home/sections/)
    │   ├── components/   # Shared UI primitives (Button, WordRotator, CustomCursor, AmbientGlow)
    │   ├── animations/   # 3D Math simulations, PolyhedronCanvas, RevealObserver
    │   └── index.ts      # Master UI barrel (auto-generated)
    ├── hooks/            # Custom React hooks (smooth scroll, physics, flow lighting)
    ├── data/             # Static data and configurations
    └── types/            # TypeScript interfaces and types
```

---

## 4. Animation & Physics Hydration Rules

- Any DOM/window physics calculations (e.g. `window.addEventListener("mousemove")`, 3D projection math, inertial momentum scroll) must be encapsulated in React client hooks with `'use client'`.
- Always check `typeof window !== "undefined"` before accessing browser APIs.
- Always respect `window.matchMedia("(prefers-reduced-motion: reduce)").matches` for accessibility.
- Never use DOM mutation or element creation directly outside of React lifecycle / `useEffect`.

---

## 5. Tailwind CSS v4+ Standards & Zero `-[..px]` Rule

- The workspace uses **Tailwind CSS v4+** with `--spacing: 1px` reference configured in `src/elements/styles/index.css`.
- **STRICT PROHIBITION**: Never use arbitrary pixel classes like `p-[24px]`, `w-[32px]`, or `gap-[16px]`.
- Always use the 1px-scale utility classes: `p-24`, `w-32`, `gap-16`, `pt-80`.
- Use semantic color tokens: `bg-bg`, `text-ink`, `text-mute`, `border-line`, `text-accent`.
- Full details documented in `.agents/rules/styles.md`.

---

## 6. Deployment & Build Safety
- Before proposing or merging changes, verify clean compilation:
  ```bash
  pnpm run build
  ```
- Zero TypeScript errors (`strict: true`).
- Zero hydration errors or SSR mismatches.
