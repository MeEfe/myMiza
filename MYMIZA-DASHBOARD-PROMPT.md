# MyMiza — Personal Finance Dashboard

## Overview

Build the **MyMiza** personal finance dashboard as a React + TypeScript + Vite application. This is a frontend prototype with mocked data. The app uses **shadcn/ui** components, **Lucide React** icons, and **Tailwind CSS v4**.

Refer to the attached mockup image **for layout structure only** — the color theme, exact labels, and data are defined below in this document.

---

## Critical Rules

1. **Component size**: Every component must be small and single-responsibility. If a component exceeds ~50 lines of JSX, split it. No god-components.
2. **Icons**: Use **only** `lucide-react` icons. Icons must be rendered as plain SVG strokes — **NEVER** wrap icons in colored circles, squares, badges, or any background shape. No `bg-*` on icon containers. Just the icon.
3. **No emojis**: Zero emojis anywhere in the UI. Use Lucide icons instead.
4. **shadcn/ui**: Use shadcn `Card`, `Button`, `Badge`, `Tabs`, `Progress`, `Avatar`, `Separator`, and `ScrollArea` components. Install them properly via the shadcn CLI.
5. **Fonts**: Import `DM Sans` (body) and `Playfair Display` (brand/headings) from Google Fonts.
6. **Dark mode only**: This prototype is dark-mode only. Apply the `.dark` class on the root `<html>` element.

---

## Theme

Use the **deep navy blue-purple + gold** theme. Paste the full CSS below into your `app.css` or `globals.css`. The key colors:

- **Background**: Deep navy `oklch(0.1500 0.0350 275)`
- **Card**: Rich dark blue `oklch(0.2000 0.0400 278)`
- **Primary / Accent**: Warm gold `oklch(0.7800 0.1300 80)` — used for active nav items, primary buttons, highlighted text, chart accents
- **Muted foreground**: Cool lavender `oklch(0.5800 0.0400 270)` — used for secondary labels
- **Foreground**: Cool off-white `oklch(0.9400 0.0100 270)` — primary text
- **Border**: Blue-purple tinted `oklch(0.2900 0.0420 278)`
- **Destructive**: For negative amounts / expense highlights

Refer to the attached `mymiza-theme-blue.css` for the full variable set.

---

## Layout Structure

The app is a single-page dashboard with this structure:

```
┌─────────────────────────────────────────────────────┐
│ Sidebar (left)          │ Main Content (right)       │
│                         │                            │
│ Brand: "MyMiza"         │ TopBar                     │
│ (Playfair Display,      │ ┌──────────────────────┐   │
│  gold color)            │ │ Page title + Tabs    │   │
│                         │ │ + Notification + Avatar│  │
│ Nav Items:              │ └──────────────────────┘   │
│ - Dashboard (active)    │                            │
│ - Analytics             │ NetWorthCard (hero)        │
│ - Portfolio             │ ┌──────────────────────┐   │
│ - Transactions          │ │ NET WORTH            │   │
│ - Budgets               │ │ €24,850.00           │   │
│ - Bills                 │ │ +3.2% vs last month  │   │
│                         │ └──────────────────────┘   │
│                         │                            │
│                         │ StatCards (4-col grid)      │
│                         │ ┌────┐┌────┐┌────┐┌────┐  │
│                         │ │Inc ││Exp ││Save││Bills│  │
│                         │ └────┘└────┘└────┘└────┘  │
│                         │                            │
│                         │ Middle Row (2-col grid)     │
│                         │ ┌───────────┐┌──────────┐  │
│                         │ │ Sankey    ││ Budget   │  │
│                         │ │ Cash Flow ││ Progress │  │
│                         │ └───────────┘└──────────┘  │
│                         │                            │
│                         │ TransactionLedger (full w)  │
│                         │ ┌──────────────────────┐   │
│                         │ │ Recent Transactions  │   │
│ ────────────────        │ └──────────────────────┘   │
│ Settings (bottom)       │                            │
└─────────────────────────────────────────────────────┘
```

---

## Component Breakdown

Below is every component you need to build. Each must be its own file.

### 1. `AppLayout.tsx`
- CSS Grid: `grid-cols-[260px_1fr]` full viewport height
- Renders `<Sidebar />` and `<main>` with scrollable content area
- Main content has horizontal padding and a max-width constraint

### 2. `Sidebar.tsx`
- Fixed left panel, full height, uses `bg-sidebar` / `border-sidebar-border`
- **Top**: Brand logo area
  - Placeholder square (16x16 rounded `border border-primary` box) + "MyMiza" in Playfair Display, gold (`text-primary`)
- **Middle**: `<NavItem />` list (see below)
- **Bottom**: Settings link with `Settings` Lucide icon
- Active nav item: gold text + gold left border indicator (2px solid)
- Inactive nav items: `text-muted-foreground`, hover → `text-foreground`

### 3. `NavItem.tsx`
- Props: `icon: LucideIcon`, `label: string`, `isActive: boolean`, `onClick: () => void`
- Renders icon (18px, no background!) + label
- Active state: `text-primary` + left border accent
- ~15 lines max

### 4. `TopBar.tsx`
- Flex row: left side = page title "Dashboard" (Playfair Display, `text-xl font-semibold`) + tab group
- Tabs: "Overview" (active, gold underline), "Cash Flow", "Assets"
- Right side: `Bell` icon (Lucide, no background) + `Avatar` (shadcn, placeholder initials "JD")
- Use shadcn `Tabs` component for the tab group

### 5. `NetWorthCard.tsx`
- shadcn `Card` component, spans full width of content area
- Label: "NET WORTH" — small, uppercase, `text-muted-foreground`, tracking-wide
- Value: "€24,850.00" — very large (`text-4xl` or `text-5xl`), `font-serif` (Playfair Display), `text-foreground`
- Subtext: `TrendingUp` icon (Lucide, 14px, green) + "+3.2% vs last month" in small green text
- Right side: two buttons — "Transfer" (outline/secondary) and "Add Income" (primary, gold)

### 6. `StatCardGrid.tsx`
- `grid grid-cols-4 gap-4`
- Renders 4 `<StatCard />` components

### 7. `StatCard.tsx`
- Props: `icon: LucideIcon`, `label: string`, `value: string`, `iconClassName?: string`
- shadcn `Card` with padding
- Top row: Lucide icon (16px, `text-muted-foreground`, **NO BACKGROUND**) + `Maximize2` icon (Lucide, 14px, top-right, muted)
- Label: uppercase, small, `text-muted-foreground`, tracking-wide
- Value: large (`text-2xl`), `font-semibold`, `text-foreground`
- ~20 lines max

**Mocked stat data:**

| Icon | Label | Value |
|------|-------|-------|
| `Wallet` | MONTHLY INCOME | €3,520 |
| `CreditCard` | EXPENSES | €2,180 |
| `PiggyBank` | SAVINGS RATE | 38.1% |
| `CalendarClock` | UPCOMING BILLS | €340 |

### 8. `CashFlowCard.tsx`
- shadcn `Card`, takes ~60% width in the 2-col grid
- Title: "Cash Flow" — `font-serif`, `text-lg`
- Contains the `<SankeyDiagram />` component
- This card is just the wrapper

### 9. `SankeyDiagram.tsx`
- **This is the hero visualization** — a Sankey/flow diagram showing where income splits into expense categories
- Use **d3-sankey** (install via npm) rendered as SVG inside React
- Alternatively, build a custom SVG-based Sankey with bezier curves if d3-sankey is problematic

**Mocked Sankey data — income sources (left) → expense categories (right):**

```
INCOME SOURCES (left side):
├── Salary: €2,800
├── Freelance: €520
└── Dividends: €200

TOTAL IN: €3,520

EXPENSE CATEGORIES (right side):
├── Rent: €850
├── Groceries: €420
├── Transport: €180
├── Subscriptions: €95
├── Dining Out: €210
├── Savings: €1,340
├── Investments: €280
└── Taxes: €145

TOTAL OUT: €3,520
```

**Sankey styling:**
- Nodes: small rounded rectangles, left nodes use gold (`primary`), right nodes use varying opacity of muted-foreground or chart colors
- Links: curved bezier paths with low opacity fills, gold-tinted
- Labels: small text next to each node showing name + €amount
- The "Savings" node should be visually highlighted (gold accent) since it's the largest positive allocation
- SVG viewBox should be responsive

### 10. `BudgetCard.tsx`
- shadcn `Card`, takes ~40% width in the 2-col grid
- Title: "Budget Progress" — `font-serif`, `text-lg`
- Contains a list of `<BudgetProgressItem />` components

### 11. `BudgetProgressItem.tsx`
- Props: `category: string`, `spent: number`, `total: number`
- Row layout: category name (left) + "€spent / €total" (right)
- Below: shadcn `Progress` bar (or custom bar) — filled portion uses gold (`bg-primary`), track uses `bg-secondary`
- When spent > 80% of total, the bar turns `destructive`
- ~15 lines max

**Mocked budget data:**

| Category | Spent | Budget |
|----------|-------|--------|
| Groceries | €380 | €450 |
| Dining Out | €210 | €200 |
| Transport | €145 | €200 |
| Subscriptions | €95 | €100 |

### 12. `TransactionLedger.tsx`
- shadcn `Card`, full width below the middle row
- Header: "Recent Transactions" title + filter tabs (All / Outflow / Inflow) using shadcn `Tabs`
- Contains a list of `<TransactionRow />` components
- Shows the most recent 5 transactions

### 13. `TransactionRow.tsx`
- Props: `icon: LucideIcon`, `name: string`, `date: string`, `category: string`, `type: "inflow" | "outflow"`, `amount: number`
- Layout: icon (Lucide, 18px, **no background**) | name + date stacked | category `Badge` (shadcn) | amount (right-aligned)
- Inflow amounts: green text with "+" prefix
- Outflow amounts: `text-foreground` with "−" prefix
- ~20 lines max

**Mocked transaction data:**

| Icon | Name | Date | Category | Type | Amount |
|------|------|------|----------|------|--------|
| `Home` | Rent Payment | Mar 1, 2026 | Housing | outflow | €850.00 |
| `ShoppingCart` | Spar Supermarket | Mar 3, 2026 | Groceries | outflow | €67.30 |
| `Building2` | Salary - TechCorp | Mar 1, 2026 | Income | inflow | €2,800.00 |
| `Utensils` | Restaurant Alpenblick | Mar 5, 2026 | Dining | outflow | €42.50 |
| `Laptop` | Freelance - WebProject | Mar 4, 2026 | Income | inflow | €520.00 |

---

## File Structure

```
src/
├── app.css                          # Theme variables (blue theme)
├── App.tsx                          # Root, wraps AppLayout
├── lib/
│   └── utils.ts                     # cn() helper
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── NavItem.tsx
│   │   └── TopBar.tsx
│   ├── dashboard/
│   │   ├── NetWorthCard.tsx
│   │   ├── StatCardGrid.tsx
│   │   ├── StatCard.tsx
│   │   ├── CashFlowCard.tsx
│   │   ├── SankeyDiagram.tsx
│   │   ├── BudgetCard.tsx
│   │   ├── BudgetProgressItem.tsx
│   │   ├── TransactionLedger.tsx
│   │   └── TransactionRow.tsx
│   └── ui/                          # shadcn components (auto-generated)
│       ├── card.tsx
│       ├── button.tsx
│       ├── badge.tsx
│       ├── tabs.tsx
│       ├── progress.tsx
│       ├── avatar.tsx
│       └── separator.tsx
├── data/
│   └── mockData.ts                  # All mocked data in one place
└── types/
    └── index.ts                     # TypeScript interfaces
```

---

## Mock Data File (`data/mockData.ts`)

Centralize ALL mocked data here. Components import from this file. No hardcoded data inside components.

```ts
import {
  Wallet, CreditCard, PiggyBank, CalendarClock,
  Home, ShoppingCart, Building2, Utensils, Laptop
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// --- Types ---
export interface StatCardData {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface SankeyNode {
  id: string;
  label: string;
  value: number;
  side: "source" | "target";
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface BudgetItem {
  category: string;
  spent: number;
  total: number;
}

export interface Transaction {
  id: string;
  icon: LucideIcon;
  name: string;
  date: string;
  category: string;
  type: "inflow" | "outflow";
  amount: number;
}

// --- Data ---
export const statCards: StatCardData[] = [
  { icon: Wallet, label: "MONTHLY INCOME", value: "€3,520" },
  { icon: CreditCard, label: "EXPENSES", value: "€2,180" },
  { icon: PiggyBank, label: "SAVINGS RATE", value: "38.1%" },
  { icon: CalendarClock, label: "UPCOMING BILLS", value: "€340" },
];

export const sankeyNodes: SankeyNode[] = [
  { id: "salary", label: "Salary", value: 2800, side: "source" },
  { id: "freelance", label: "Freelance", value: 520, side: "source" },
  { id: "dividends", label: "Dividends", value: 200, side: "source" },
  { id: "rent", label: "Rent", value: 850, side: "target" },
  { id: "groceries", label: "Groceries", value: 420, side: "target" },
  { id: "transport", label: "Transport", value: 180, side: "target" },
  { id: "subscriptions", label: "Subscriptions", value: 95, side: "target" },
  { id: "dining", label: "Dining Out", value: 210, side: "target" },
  { id: "savings", label: "Savings", value: 1340, side: "target" },
  { id: "investments", label: "Investments", value: 280, side: "target" },
  { id: "taxes", label: "Taxes", value: 145, side: "target" },
];

export const sankeyLinks: SankeyLink[] = [
  { source: "salary", target: "rent", value: 850 },
  { source: "salary", target: "groceries", value: 420 },
  { source: "salary", target: "transport", value: 180 },
  { source: "salary", target: "savings", value: 1020 },
  { source: "salary", target: "taxes", value: 145 },
  { source: "salary", target: "dining", value: 185 },
  { source: "freelance", target: "savings", value: 320 },
  { source: "freelance", target: "investments", value: 175 },
  { source: "freelance", target: "dining", value: 25 },
  { source: "dividends", target: "investments", value: 105 },
  { source: "dividends", target: "subscriptions", value: 95 },
];

export const budgetItems: BudgetItem[] = [
  { category: "Groceries", spent: 380, total: 450 },
  { category: "Dining Out", spent: 210, total: 200 },
  { category: "Transport", spent: 145, total: 200 },
  { category: "Subscriptions", spent: 95, total: 100 },
];

export const transactions: Transaction[] = [
  { id: "1", icon: Home, name: "Rent Payment", date: "Mar 1, 2026", category: "Housing", type: "outflow", amount: 850.0 },
  { id: "2", icon: ShoppingCart, name: "Spar Supermarket", date: "Mar 3, 2026", category: "Groceries", type: "outflow", amount: 67.3 },
  { id: "3", icon: Building2, name: "Salary - TechCorp", date: "Mar 1, 2026", category: "Income", type: "inflow", amount: 2800.0 },
  { id: "4", icon: Utensils, name: "Restaurant Alpenblick", date: "Mar 5, 2026", category: "Dining", type: "outflow", amount: 42.5 },
  { id: "5", icon: Laptop, name: "Freelance - WebProject", date: "Mar 4, 2026", category: "Income", type: "inflow", amount: 520.0 },
];

export const netWorth = {
  value: "€24,850.00",
  change: "+3.2%",
  changeLabel: "vs last month",
};

export const navItems = [
  { id: "dashboard", label: "Dashboard", iconName: "LayoutDashboard" as const },
  { id: "analytics", label: "Analytics", iconName: "BarChart3" as const },
  { id: "portfolio", label: "Portfolio", iconName: "Briefcase" as const },
  { id: "transactions", label: "Transactions", iconName: "ArrowLeftRight" as const },
  { id: "budgets", label: "Budgets", iconName: "Target" as const },
  { id: "bills", label: "Bills", iconName: "Receipt" as const },
];
```

---

## Sankey Diagram Implementation Notes

The Sankey is the most complex component. Guidance:

1. **Option A (preferred):** Use `d3-sankey` + raw SVG in React
   - `npm install d3-sankey d3-shape @types/d3-sankey @types/d3-shape`
   - Compute layout with `d3.sankey()`, render nodes as `<rect>`, links as `<path>` using `d3.sankeyLinkHorizontal()`
   - Wrap in a `useEffect` + `useRef` or compute in `useMemo`

2. **Option B (fallback):** Custom SVG with cubic bezier curves
   - Position source nodes on the left, target nodes on the right
   - Draw bezier curves between them with `<path d="M... C...">`
   - Scale widths proportionally to values

**Styling the Sankey:**
- Source nodes (income): gold fill with 80% opacity
- Target nodes (expenses): `chart-2` through `chart-5` colors
- "Savings" target node: gold fill (highlighted as positive)
- Links: gold fill with ~15% opacity, on hover increase to ~30%
- Node labels: 12px, placed to the left of source nodes and right of target nodes
- Include €amount next to each label
- SVG should be responsive — use `viewBox` and `width="100%"`

---

## Styling Requirements

- All spacing uses Tailwind utility classes (`p-4`, `gap-4`, `space-y-3`, etc.)
- Card borders: `border border-border` (1px, subtle blue-purple)
- No heavy shadows on cards — use `shadow-sm` maximum or no shadow at all
- Text hierarchy:
  - Page/card titles: `font-serif` (Playfair Display)
  - Labels/caps: `text-xs uppercase tracking-wider text-muted-foreground`
  - Values: `text-2xl font-semibold text-foreground`
  - Body: `text-sm text-foreground`
- Gold accent (`text-primary`) used for: active nav, primary buttons, Sankey highlights, positive trend indicators
- Green (`text-emerald-400`) for inflow amounts
- Default `text-foreground` for outflow amounts (not red — keep it elegant)
- Currency formatted in European style with € symbol prefix

---

## Setup Steps

1. `npm create vite@latest mymiza -- --template react-ts`
2. `cd mymiza && npm install`
3. Install Tailwind CSS v4: `npm install tailwindcss @tailwindcss/vite`
4. Initialize shadcn: `npx shadcn@latest init` — select "New York" style, CSS variables, and the custom theme
5. Add shadcn components: `npx shadcn@latest add card button badge tabs progress avatar separator`
6. Install Lucide: `npm install lucide-react`
7. Install Sankey deps: `npm install d3-sankey d3-shape && npm install -D @types/d3-sankey @types/d3-shape`
8. Add Google Fonts to `index.html`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
   ```
9. Add `class="dark"` to the `<html>` tag in `index.html`
10. Paste the blue theme CSS into `src/app.css`

---

## Final Checklist

- [ ] Every component is its own file, under 50 lines of JSX
- [ ] All data comes from `data/mockData.ts` — zero hardcoded strings in components
- [ ] All icons are `lucide-react` with **NO background colors/shapes**
- [ ] Zero emojis in the entire codebase
- [ ] shadcn components used for Card, Button, Badge, Tabs, Progress, Avatar
- [ ] Sankey diagram is SVG-based, responsive, gold-themed
- [ ] Dark mode only — `.dark` class on `<html>`
- [ ] Playfair Display for brand + headings, DM Sans for body
- [ ] European currency format (€ prefix)
- [ ] Clean TypeScript — no `any` types, proper interfaces
