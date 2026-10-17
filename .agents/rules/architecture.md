# Rule: Architecture & Folder Responsibility

1. **Next.js App Router**:
   - `src/app/layout.tsx`: Master HTML shell, local fonts, and SEO metadata.
   - `src/app/page.tsx`: Home page assembling `@karthi/ui` modules.
   - Additional pages follow `src/app/<route>/page.tsx`.

2. **Presentational Layer (`src/ui/`)**:
   - `layouts/`: Global layout wrappers (`AppShell`, `MobileHeader`, `MobileDrawer`, `SideNav`, `SideProfile`).
   - `pages/<pageName>/sections/`: Page-scoped sections (e.g. `pages/home/sections/`).
   - `components/`: Reusable UI atoms and molecules (`Button`, `CustomCursor`, `AmbientGlow`, `WordRotator`).
   - `animations/`: Physics, SVG Solid animations (`PolyhedronCanvas`, `RevealObserver`).

3. **Logic & Data**:
   - `src/hooks/`: Stateful browser interactions, lerp calculations, and scroll momentum.
   - `src/data/`: Read-only static data objects.
   - `src/types/`: TypeScript definitions and contracts.
