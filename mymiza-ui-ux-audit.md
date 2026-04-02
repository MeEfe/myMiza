# MyMiza — Comprehensive UI/UX Design Audit

**Prepared for:** MyMiza Finance App  
**Screens Reviewed:** Dashboard, Bills  
**Date:** April 2026

---

## Executive Summary

MyMiza has a solid functional foundation — the data architecture is sensible, the navigation is clean, and the feature set covers the essentials. However, the app currently reads as a collection of components rather than a cohesive product. The issues fall into five themes: **visual hierarchy is flat**, **spacing is inconsistent**, **color usage lacks a system**, **data visualization underperforms**, and **interaction patterns are missing**. Below is everything that needs to change, organized from systemic fixes down to per-screen specifics.

---

## 1. Global Design System Issues

### 1.1 Typography Scale

**Problem:** The app appears to use a single font family at roughly 3–4 sizes with no clear hierarchy. Page titles, section headers, card labels, and body text don't feel sufficiently differentiated. The "€24,850.00" on the dashboard is large, but the jump from that to "MONTHLY INCOME" label text is abrupt — there's no intermediate weight.

**Fix:**
- Define a strict type scale with at least 6 stops: Display (32–40px), Heading 1 (24px), Heading 2 (20px), Subhead (16px semibold), Body (14–15px), Caption (12px).
- Use font **weight** as a hierarchy tool, not just size. For example, metric values like "€3,520" should be semibold 600, while their labels ("MONTHLY INCOME") should be regular 400 in a smaller size and a muted color.
- All-caps labels (like "MONTHLY INCOME", "SAVINGS RATE") need generous letter-spacing (0.05–0.08em) to be readable. Currently they feel tight.
- Currency amounts across the app should share one consistent format: either "€1,200.00" everywhere or "€1,200" everywhere. Right now the dashboard shows "€24,850.00" (with cents) while the bills chart legend shows "€1200" (no separator, no cents). Pick one and enforce it.

### 1.2 Color System

**Problem:** There's no apparent color system. The donut chart on Bills uses ~8 colors (gold, blue, teal, purple, orange, pink, green). The status badges use green (PAID), orange-yellow (UPCOMING), and gray (PENDING). The Sankey chart uses gold and teal. The budget bars use red/green/orange. None of these palettes appear coordinated.

**Fix:**
- Establish a **semantic color palette**: one primary brand color (the golden-amber seems to be it), one neutral scale (gray-50 through gray-900), and a small set of semantic colors: success (green), warning (amber/orange), danger (red), info (blue).
- For **category colors** (Housing, Utilities, Insurance, etc.), create a harmonious set of 8–10 colors that all sit at a similar saturation and lightness. Right now the gold for Housing and the bright teal for Utilities clash because they're from different palettes.
- Status badges: PAID → success green with a softer tint background. UPCOMING → amber/warning. PENDING → neutral gray. OVERDUE → red/danger. Ensure badge colors are from the semantic palette, not arbitrary.
- Budget bars that are under limit should be a calm neutral or brand color. Only the over-budget bar should turn red. Currently "Groceries" at 84% is deep red, which reads as alarming when it's actually fine.

### 1.3 Spacing & Layout Grid

**Problem:** The spacing between elements feels arbitrary. On the Bills page, the donut chart section and the bill list have different effective left margins. The gap between the summary stats row on the Dashboard and the Cash Flow section below looks larger than necessary. The sidebar navigation items have tight vertical spacing but generous horizontal padding.

**Fix:**
- Adopt a 4px base unit, with a spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
- Use a **12-column grid** on the main content area with 24px gutters and 32–40px side margins.
- Standardize vertical section gaps to 32px between major sections (e.g., stat cards → Cash Flow) and 16–24px between a section header and its content.
- The bill list items currently have ~48–56px row height. This is fine, but ensure all rows use identical padding. The visual gap between the icon, text, and right-aligned status/amount should be consistent.

### 1.4 Card & Container Styling

**Problem:** The Dashboard stat cards (Monthly Income, Expenses, Savings Rate, Upcoming Bills) have a subtle border or background, but the Cash Flow chart and Budget section don't appear to share the same container treatment. The Bills page has no cards at all — the donut chart just floats.

**Fix:**
- Define **one card style** for the app: consistent border-radius (8–12px), consistent shadow or border (choose one — either a 1px border in gray-200 OR a soft box-shadow, not both), and consistent internal padding (20–24px).
- Apply this card treatment to: the stat row (either one card containing all four metrics, or four individual cards on the same baseline), the Cash Flow chart, the Budget section, the Bills donut chart area, and the bill list.
- Consider giving the donut chart + legend area on Bills a light background card to visually separate it from the list below.

### 1.5 Sidebar Navigation

**Problem:** The sidebar is functional but looks slightly disconnected from the main content. The active state (Bills) uses a text color change but the highlight is subtle. The "MyMiza" brand mark at the top with the amber circle is fine but could be more polished.

**Fix:**
- Active nav item: use a left border accent (3px, brand color) plus a subtle background fill (brand color at 8–10% opacity). This is more visible than just a text color change.
- Hover states: add a gentle background transition on hover (gray-100 fill, 150ms ease).
- Group "Settings" separately from the main nav with a thin divider line, since it's a utility link, not a content section.
- Nav icons should all be the same stroke weight and optical size. Check that the Dashboard, Analytics, Portfolio, Transactions, Budgets, Bills, and Settings icons come from the same icon family and are all 20px with 1.5px stroke.

---

## 2. Dashboard — Specific Issues

### 2.1 Net Worth Header

**Problem:** The "NET WORTH" label and "Viewing: Mar 2026" sit above the large €24,850.00 value, which is good. But the "+3.2% vs last month" trend indicator uses a small arrow icon that's hard to read, and the green color doesn't match any other green in the app.

**Fix:**
- Make the trend indicator more prominent: use a pill badge with a light green background and dark green text, e.g., `↑ 3.2%` in a rounded pill. Follow it with "vs last month" in muted gray text.
- The "Transfer" and "Add Income" buttons in the top-right feel disconnected from the net worth area. Consider placing them closer to the transactions section where they're more contextually relevant, or group them in a secondary action bar.

### 2.2 Stat Cards Row

**Problem:** The four metric cards (Monthly Income, Expenses, Savings Rate, Upcoming Bills) each have a small expand icon in the top-right corner, but the icon isn't labeled and its purpose is unclear. The cards feel visually flat — the €3,520 and €2,180 values don't have enough contrast against their backgrounds.

**Fix:**
- Remove or replace the expand icons. If they drill down to a detail view, use a more explicit affordance (like making the entire card clickable with a hover state, or adding a small "Details →" link).
- Add subtle color coding: Income card could have a faint green left border or top accent. Expenses could have a faint amber accent. Savings Rate could show green if above target, amber if close, red if below. Upcoming Bills could show the urgency color.
- Ensure the metric value is the dominant element: large size (24–28px), semibold weight. The label above it should be 11–12px, uppercase, letter-spaced, in gray-500.

### 2.3 Cash Flow (Sankey Diagram)

**Problem:** This is the most complex visualization in the app, and it's doing too much in too small a space. The Sankey flows are hard to trace because the colors are too similar (multiple shades of gold/amber). The labels on the left (Salary €2,800, Freelance €520, Dividends €200) and right (Rent €850, Groceries €420, etc.) are small and cluttered. The "Savings €1,340" label in green floats in the middle without clear attachment.

**Fix:**
- **Consider replacing the Sankey** with a simpler stacked bar or waterfall chart. Sankey diagrams work for complex multi-node flows but here you have a simple income → expense → savings flow. A horizontal waterfall (income on left, expenses stacking rightward, savings as the remainder) would be clearer.
- If keeping the Sankey: use distinct colors for income sources (greens/teals) vs. expense categories (ambers/reds) vs. savings (a bright accent). The current monochrome gold doesn't differentiate the flows.
- Increase label font size to at least 13px and add more horizontal padding so labels don't crowd the chart edges.
- The "Savings €1,340" callout should be visually emphasized — it's the hero number of the Cash Flow section. Give it a distinct highlight treatment (larger text, badge, or accent background).

### 2.4 Budget Section

**Problem:** The budget progress bars are effective at a glance but have issues. "Dining Out" at 105% shows a red bar extending past its container — this is the right idea but the overflow treatment looks broken rather than intentional. "Groceries" at 84% is also deep red, which is alarming for something within budget.

**Fix:**
- Color logic for budget bars: 0–70% → neutral/brand color (gray or amber), 70–90% → warning amber, 90–100% → caution orange, >100% → danger red. This way Groceries at 84% would be amber (heads up) not red (panic).
- The over-budget bar should not visually break its container. Instead, fill to 100% in red and show the overflow amount as text: "€210 / €200 — €10 over" in red text.
- Add the category budget labels consistently: "€380 / €450" is clear, but also show the remaining amount ("€70 left") for under-budget items — it's more actionable.
- Consider adding a small spark icon or indicator next to any category that's trending to go over budget based on spending velocity.

### 2.5 Transactions List

**Problem:** The transaction rows show icon, name, date on the left and category tag + amount on the right. This is fine, but the category tags (Housing, Groceries, Income, Dining) use different colors without an obvious system, and the green "+€2800.00" for income vs. the dark "−€850.00" for expenses need more differentiation.

**Fix:**
- Income amounts should be green and prefixed with "+". Expense amounts should be the default text color (dark gray/black) prefixed with "−". Don't use red for expenses — it creates unnecessary anxiety in a finance app.
- Category tags should use the same category color system as the Bills donut chart and the Budget section. If Housing is amber everywhere, the Housing tag on the transaction should also be amber-tinted.
- Add a "See All" link at the bottom of the transaction list that navigates to the Transactions page.
- The filter tabs (All, Outflow, Inflow) are good. Ensure the active tab has a clear selected state (filled background, not just text change).

---

## 3. Bills Page — Specific Issues

### 3.1 Tabs (Fixed / Variable / Combined)

**Problem:** The tab bar is functional but the active tab ("Fixed") is indicated only by a small underline and color change. The inactive tabs are too similar to the active one.

**Fix:**
- Active tab: use a thicker underline (3px) in the brand color, plus bold the text. Inactive tabs should be in gray-500.
- Consider adding counts to each tab: "Fixed (14)", "Variable (6)", "Combined (20)" — this gives the user information before clicking.

### 3.2 Status Summary Line

**Problem:** "4 upcoming · 1 over budget" is useful information but it's small and easy to miss. The amber color of "4 upcoming" and the red of "1 over budget" are fine semantically, but the line feels orphaned between the tabs and the chart.

**Fix:**
- Turn these into small pill badges or alert cards: a yellow pill showing "4 upcoming" and a red pill showing "1 over budget". Place them at the top-right of the section or within a thin alert banner.
- If there's nothing over budget, hide that indicator entirely — don't show "0 over budget".

### 3.3 Donut Chart + Legend

**Problem:** The donut chart is too small relative to the space it occupies, and the legend is awkwardly laid out in two columns that don't align well. The "Total €2,341" label inside the donut is a nice touch but the text is tiny.

**Fix:**
- Increase the donut chart diameter by 30–40%. The current size wastes the horizontal space.
- Reorganize the legend as a **vertical list to the right of the chart**, with each row showing: colored dot → category name → amount, all in a single aligned column. The current two-column layout with amounts right-aligned in each column creates four alignment edges, which is too many.
- Inside the donut, increase the "Total" label size and make the amount bolder. Consider showing it as two lines: "Total" (caption, gray) and "€2,341" (heading, dark).
- Make legend items interactive: hovering a legend item should highlight the corresponding donut segment.

### 3.4 Bill List Items

**Problem:** The bill list is the bulk of this page and it's reasonably well structured, but all rows look identical regardless of urgency. There's no visual differentiation between PAID bills (historical, less important) and UPCOMING/PENDING bills (actionable, need attention).

**Fix:**
- **Group bills by status**: create section headers — "Paid", "Upcoming", "Pending" — with a subtle background divider or header row. This eliminates the need to scan every row's badge.
- Paid bills should be visually **de-emphasized**: lighter text color (gray-500), possibly a strikethrough on the amount or a muted icon. The user doesn't need to act on these.
- Upcoming and Pending bills should be full contrast and could show a subtle left border in the status color (amber for upcoming, gray for pending).
- Add a **progress timeline** or mini calendar at the top showing which bills fall on which dates this month. This gives an at-a-glance view of upcoming due dates.
- Each bill row should have a hover state that reveals quick actions: "Mark as Paid", "Skip", "Edit".
- The icons for each bill (home, wifi, phone, etc.) are a nice touch. Ensure they're all from the same icon set, same size (20px), and same stroke weight.

### 3.5 Right-Side Total

**Problem:** "14 obligations · €2341.45" is useful but gets lost in the top-right corner.

**Fix:**
- Move this into a more prominent position — either as a summary bar at the top of the bill list, or integrated into the donut chart area.
- Break it down further: "3 paid (€1,274.98) · 4 upcoming (€426.98) · 7 pending (€639.49)" gives more actionable context.

---

## 4. Interaction & Motion Design

### 4.1 Missing States

**Problem:** Neither screenshot shows hover states, loading states, empty states, or error states. These are critical for a polished product.

**Fix:**
- **Hover:** Every interactive element (nav items, bill rows, stat cards, chart segments, buttons) needs a hover state. Use background color shifts, subtle scale transforms (1.01), or shadow elevation changes.
- **Loading:** Add skeleton screens for the dashboard when data is loading. Use pulsing gray rectangles that match the layout of the actual content.
- **Empty:** Design what the Bills page looks like with zero bills. What does Cash Flow look like in a new user's first month? These need thoughtful empty states with illustrations and CTAs.
- **Error:** If a bill fails to process or data can't load, show inline error states — not just a toast.

### 4.2 Transitions

**Fix:**
- Page transitions between Dashboard and Bills should use a subtle crossfade (200–300ms).
- Tab switches (Fixed/Variable/Combined) should animate the content change with a horizontal slide or fade.
- The donut chart should animate on load: segments growing from 0 to their final arc.
- Number changes (net worth, totals) should use a counting animation that rolls from old value to new.

---

## 5. Information Architecture & Missing Features

### 5.1 Missing Actions

- **No "Add Bill" button** on the Bills page. There should be a primary action button (top-right, brand color) to add a new bill.
- **No search or filter** on the Bills list. With 14+ bills, users need to search by name or filter by category/status.
- **No sort options** on transactions or bills. Allow sorting by date, amount, or category.

### 5.2 Missing Feedback

- When a bill transitions from UPCOMING to PAID, there should be a visible confirmation (checkmark animation, success state).
- The "1 over budget" warning on Bills has no way to drill down — which bill is over budget? Link it.
- Budget bars on the Dashboard don't link to the Budgets page. Make them clickable.

### 5.3 Responsiveness

- Consider how both screens adapt to tablet and mobile. The sidebar should collapse to an icon-only rail on tablets and a bottom tab bar on mobile.
- The four stat cards on the Dashboard should stack to 2×2 on tablet and a scrollable horizontal strip on mobile.
- The Sankey chart is not mobile-friendly. Replace it with a simpler visualization on smaller screens.

---

## 6. Priority Checklist (Ordered by Impact)

| Priority | Item | Screen | Effort |
|----------|------|--------|--------|
| 1 | Fix color system — unified palette for categories, status, and semantics | Global | Medium |
| 2 | Fix typography scale — consistent hierarchy with weight differentiation | Global | Low |
| 3 | Fix spacing — adopt 4px grid, standardize section gaps and card padding | Global | Medium |
| 4 | Budget bar color logic — stop showing red for under-budget items | Dashboard | Low |
| 5 | Group bills by status with section headers | Bills | Low |
| 6 | De-emphasize paid bills, highlight actionable ones | Bills | Low |
| 7 | Redesign Sankey chart or replace with waterfall/stacked bar | Dashboard | High |
| 8 | Standardize card container styling across both pages | Global | Medium |
| 9 | Add hover states to all interactive elements | Global | Medium |
| 10 | Add "Add Bill" CTA and search/filter to Bills page | Bills | Medium |
| 11 | Currency format consistency | Global | Low |
| 12 | Redesign donut chart legend as vertical aligned list | Bills | Low |
| 13 | Add page load animations and number counting transitions | Global | Medium |
| 14 | Improve nav sidebar active/hover states | Global | Low |
| 15 | Add empty, loading, and error states | Global | High |

---

*This audit focuses on visual design, interaction patterns, and information hierarchy. A full accessibility audit (contrast ratios, keyboard navigation, screen reader labels, focus indicators) should be conducted separately.*
