// Shared category color palette — consistent across Transactions, Bills donut, and Budget
export const CATEGORY_BADGE: Record<string, { bg: string; text: string }> = {
  Housing:       { bg: "bg-amber-500/15",   text: "text-amber-600" },
  Groceries:     { bg: "bg-teal-500/15",    text: "text-teal-600" },
  Utilities:     { bg: "bg-sky-500/15",     text: "text-sky-600" },
  Insurance:     { bg: "bg-violet-500/15",  text: "text-violet-600" },
  Subscriptions: { bg: "bg-emerald-500/15", text: "text-emerald-600" },
  Transport:     { bg: "bg-orange-500/15",  text: "text-orange-600" },
  Health:        { bg: "bg-pink-500/15",    text: "text-pink-600" },
  Education:     { bg: "bg-indigo-500/15",  text: "text-indigo-600" },
  Dining:        { bg: "bg-rose-500/15",    text: "text-rose-600" },
  Income:        { bg: "bg-emerald-500/15", text: "text-emerald-700" },
  Work:          { bg: "bg-blue-500/15",    text: "text-blue-600" },
  Leisure:       { bg: "bg-cyan-500/15",    text: "text-cyan-600" },
  Personal:      { bg: "bg-fuchsia-500/15", text: "text-fuchsia-600" },
  Food:          { bg: "bg-teal-500/15",    text: "text-teal-600" },
};

export const DEFAULT_BADGE = { bg: "bg-secondary", text: "text-muted-foreground" };
