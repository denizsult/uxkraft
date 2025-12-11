# Case Study

Table- and sheet-focused Items experience built on TanStack Table + React Query. Reusable sheet layout pieces keep the UI consistent; forms are powered by `react-hook-form`.

Live demo: https://uxkraft.vercel.app

## Setup
- Node.js 18+ then `npm install`
- Dev: `npm run dev` (http://localhost:5173)
- Build/preview: `npm run build` then `npm run preview`

## Highlights
- Dynamic DataTable (`src/components/data-table`): Loading/empty states, bulk actions, TanStack Table-driven; search/filter runs client-side because the dataset is small (`src/utils/datatable.ts`).
- Sheet layout (`src/components/sheet-layout`): Shared header, footer, container, section, form-field, and card pieces; reused across update tracking, bulk edit, and item detail/view sheets.
- Items feature (`src/features/items`): API + TanStack Query hooks in `api/`, table columns/config in `config/`, repeated sections in `components/sections/`, sheets in `components/sheets/`.
- Form handling: `react-hook-form` without validation (not required in scope); buttons toggle via `isDirty` (see `src/features/items/components/sheets/update-tracking-sheet.tsx`).
- Mutation flow: `use-extended-mutation` (`src/hooks/use-extended-mutation.ts`) centralizes `refetchQueries` and Sonner toasts after mutations.
- Sheet state: Each sheet owns a Zustand store (`src/stores/bulk-edit-sheet.ts`, `src/stores/item-detail-sheet.ts`, `src/stores/update-tracking-sheet.ts`).
- TypeScript strict mode; feature-scoped types, avoiding `any`.

## File Map
```
src/
├── components/
│   ├── data-table/           # DataTable + toolbar/loader/pagination parts
│   ├── sheet-layout/         # SheetContainer/Header/Footer/Section/FormField/Card
│   └── ui/                   # Shadcn-based primitives
├── features/
│   └── items/
│       ├── api/              # TanStack Query hooks (get/bulk update/download)
│       ├── components/
│       │   ├── sections/     # Planning, Production, Shipping, Header blocks
│       │   └── sheets/       # Bulk edit, update tracking, item detail/view
│       ├── config/           # TanStack Table columns
│       └── routes/           # Items route
├── hooks/
│   └── use-extended-mutation.ts
├── stores/                   # Sheet stores
└── utils/                    # datatable filter, formatting, pagination helpers
```

## Flow Notes
- `useGetItems` fetches data; table search/filter stays client-side for the small dataset.
- Sheet open/close and selected rows live in their stores; closing resets form state.
- Update/bulk mutations refetch the table via `refetchQueries` and surface Sonner toasts.
