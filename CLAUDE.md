# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Type-check + build for production
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier (TS/TSX)
pnpm typecheck    # Type-check without emitting
pnpm preview      # Preview production build
```

## Architecture

**myMiza** is a personal finance dashboard SPA — React 19 + TypeScript, built with Vite, styled with Tailwind CSS v4 + shadcn/ui, and D3 Sankey for cash flow visualization.

### Component tree

```
AppLayout (wraps AppProvider)
└── Sidebar + TopBar + main content area
    ├── DashboardContent  (activeNav === "dashboard")
    │   ├── NetWorthCard, StatCardGrid
    │   ├── CashFlowCard (SankeyDiagram) + BudgetCard
    │   └── TransactionLedger
    └── BillsView         (activeNav === "bills")
        ├── BillsDonutChart / BillsPieChart
        ├── FixedBillRow (rent, insurance, etc.)
        └── VariableBillRow (groceries, dining, etc.)
```

### Global state — `src/context/AppContext.tsx`

Single context drives the whole app:
- `activeNav` — which section is shown (dashboard, bills, analytics, portfolio, …)
- `monthIdx` — selected month snapshot index (0 = Mar 2026, 1 = Feb, 2 = Jan)
- `isDark` — theme toggle
- `canPrev` / `canNext` / `currentMonth` — month navigation helpers

### Data layer — `src/data/mockData.ts`

All data is currently mocked here. Key shapes live in `src/types/index.ts`:
- `MonthSnapshot` — Sankey nodes + links per month
- `FixedBill` / `VariableBill` — bills with status/budget tracking
- `Transaction` — inflow/outflow ledger entries
- `BudgetItem` — category with spent vs total

When adding real data, the mock data file is the single integration point.

### Path alias

`@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.json`).

### UI components

shadcn/ui primitives live in `src/components/ui/`. Style variant is `radix-nova` with `neutral` base color (see `components.json`). Add new shadcn components with `pnpm dlx shadcn@latest add <component>`.
