# Rule: Workspace Aliases & Barrel Imports

1. The workspace name is `@karthi`.
2. All imports must have this comment directly preceding or alongside the import statement:
   ```typescript
   // import {} from "@karthi" // @karthi will be the workspace name.
   ```
3. Direct barrels must be used instead of deep relative imports:
   - `@karthi/ui`: imports from `src/ui/index.ts`
   - `@karthi/data`: imports from `src/data/index.ts`
   - `@karthi/hooks`: imports from `src/hooks/index.ts`
   - `@karthi/types`: imports from `src/types/index.ts`

4. When adding new components, do NOT manually edit `index.ts`. Run:
   ```bash
   npm run barrels
   ```
