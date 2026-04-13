import {
  Wallet, CreditCard, PiggyBank, CalendarClock,
  Home, ShoppingCart, Building2, Utensils, Laptop,
  LayoutDashboard, BarChart3, Briefcase, ArrowLeftRight, Target,
  Wifi, Phone, Shield, Tv, Zap, Droplets, Car, GraduationCap, Dumbbell, Music,
} from "lucide-react";
import type { StatCardData, SankeyNode, SankeyLink, BudgetItem, Transaction, NetWorthData, MonthSnapshot, FixedBill, VariableBill } from "@/types";

export const statCards: StatCardData[] = [
  { icon: Wallet, label: "MONTHLY INCOME", value: "€3,520" },
  { icon: CreditCard, label: "EXPENSES", value: "€2,180" },
  { icon: PiggyBank, label: "SAVINGS RATE", value: "38.1%" },
  { icon: CalendarClock, label: "UPCOMING BILLS", value: "€340" },
];

const marchNodes: SankeyNode[] = [
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

const marchLinks: SankeyLink[] = [
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

const febNodes: SankeyNode[] = [
  { id: "salary", label: "Salary", value: 2800, side: "source" },
  { id: "freelance", label: "Freelance", value: 310, side: "source" },
  { id: "dividends", label: "Dividends", value: 150, side: "source" },
  { id: "rent", label: "Rent", value: 850, side: "target" },
  { id: "groceries", label: "Groceries", value: 390, side: "target" },
  { id: "transport", label: "Transport", value: 210, side: "target" },
  { id: "subscriptions", label: "Subscriptions", value: 95, side: "target" },
  { id: "dining", label: "Dining Out", value: 160, side: "target" },
  { id: "savings", label: "Savings", value: 1085, side: "target" },
  { id: "investments", label: "Investments", value: 200, side: "target" },
  { id: "taxes", label: "Taxes", value: 270, side: "target" },
];

const febLinks: SankeyLink[] = [
  { source: "salary", target: "rent", value: 850 },
  { source: "salary", target: "groceries", value: 390 },
  { source: "salary", target: "transport", value: 210 },
  { source: "salary", target: "savings", value: 885 },
  { source: "salary", target: "taxes", value: 270 },
  { source: "salary", target: "dining", value: 195 },
  { source: "freelance", target: "savings", value: 200 },
  { source: "freelance", target: "investments", value: 110 },
  { source: "dividends", target: "investments", value: 90 },
  { source: "dividends", target: "subscriptions", value: 60 },
  { source: "freelance", target: "dining", value: 50 },
];

const janNodes: SankeyNode[] = [
  { id: "salary", label: "Salary", value: 2800, side: "source" },
  { id: "freelance", label: "Freelance", value: 0, side: "source" },
  { id: "dividends", label: "Dividends", value: 200, side: "source" },
  { id: "rent", label: "Rent", value: 850, side: "target" },
  { id: "groceries", label: "Groceries", value: 460, side: "target" },
  { id: "transport", label: "Transport", value: 155, side: "target" },
  { id: "subscriptions", label: "Subscriptions", value: 95, side: "target" },
  { id: "dining", label: "Dining Out", value: 280, side: "target" },
  { id: "savings", label: "Savings", value: 860, side: "target" },
  { id: "investments", label: "Investments", value: 200, side: "target" },
  { id: "taxes", label: "Taxes", value: 100, side: "target" },
];

const janLinks: SankeyLink[] = [
  { source: "salary", target: "rent", value: 850 },
  { source: "salary", target: "groceries", value: 460 },
  { source: "salary", target: "transport", value: 155 },
  { source: "salary", target: "savings", value: 760 },
  { source: "salary", target: "taxes", value: 100 },
  { source: "salary", target: "dining", value: 280 },
  { source: "salary", target: "subscriptions", value: 95 },
  { source: "dividends", target: "investments", value: 200 },
  { source: "dividends", target: "savings", value: 0 },
];

export const monthSnapshots: MonthSnapshot[] = [
  { id: "mar-2026", label: "Mar 2026", nodes: marchNodes, links: marchLinks },
  { id: "feb-2026", label: "Feb 2026", nodes: febNodes, links: febLinks },
  { id: "jan-2026", label: "Jan 2026", nodes: janNodes, links: janLinks },
];

export const sankeyNodes = marchNodes;
export const sankeyLinks = marchLinks;

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

export const netWorth: NetWorthData = {
  value: "€24,850.00",
  change: "+3.2%",
  changeLabel: "vs last month",
};

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "budgets", label: "Budgets", icon: Target },
];

export const fixedBills: FixedBill[] = [
  { id: "f1",  icon: Home,          name: "Rent",                  dueDate: "Mar 1, 2026",  amount: 1200.00, status: "paid",     category: "Housing" },
  { id: "f2",  icon: Wifi,          name: "Internet — Fiber 1Gbps", dueDate: "Mar 5, 2026",  amount: 49.99,   status: "paid",     category: "Utilities" },
  { id: "f3",  icon: Phone,         name: "Mobile Plan",           dueDate: "Mar 8, 2026",  amount: 24.99,   status: "paid",     category: "Utilities" },
  { id: "f4",  icon: Shield,        name: "Health Insurance",      dueDate: "Mar 10, 2026", amount: 310.00,  status: "upcoming", category: "Insurance" },
  { id: "f5",  icon: Car,           name: "Car Insurance",         dueDate: "Mar 12, 2026", amount: 88.00,   status: "upcoming", category: "Insurance" },
  { id: "f6",  icon: Tv,            name: "Netflix",               dueDate: "Mar 14, 2026", amount: 17.99,   status: "upcoming", category: "Subscriptions" },
  { id: "f7",  icon: Music,         name: "Spotify",               dueDate: "Mar 14, 2026", amount: 10.99,   status: "upcoming", category: "Subscriptions" },
  { id: "f8",  icon: Zap,           name: "Electricity",           dueDate: "Mar 15, 2026", amount: 73.50,   status: "pending",  category: "Utilities" },
  { id: "f9",  icon: Droplets,      name: "Water & Sewage",        dueDate: "Mar 15, 2026", amount: 38.00,   status: "pending",  category: "Utilities" },
  { id: "f10", icon: GraduationCap, name: "Online Course Sub.",    dueDate: "Mar 18, 2026", amount: 29.00,   status: "pending",  category: "Education" },
  { id: "f11", icon: Dumbbell,      name: "Gym Membership",        dueDate: "Mar 20, 2026", amount: 45.00,   status: "pending",  category: "Health" },
  { id: "f12", icon: Shield,        name: "Life Insurance",        dueDate: "Mar 22, 2026", amount: 55.00,   status: "pending",  category: "Insurance" },
  { id: "f13", icon: Car,           name: "Car Lease",             dueDate: "Mar 25, 2026", amount: 390.00,  status: "pending",  category: "Transport" },
  { id: "f14", icon: Tv,            name: "Disney+",               dueDate: "Mar 28, 2026", amount: 8.99,    status: "pending",  category: "Subscriptions" },
];

export const variableBills: VariableBill[] = [
  { id: "v1",  icon: ShoppingCart,  name: "Spar Supermarket",          date: "Apr 2, 2026",  amount:  67.30, category: "Food"      },
  { id: "v2",  icon: ShoppingCart,  name: "Billa Weekly Shop",         date: "Apr 9, 2026",  amount:  82.40, category: "Food"      },
  { id: "v3",  icon: Utensils,      name: "Restaurant Alpenblick",     date: "Apr 5, 2026",  amount:  42.50, category: "Food"      },
  { id: "v4",  icon: Utensils,      name: "Pizza & Drinks",            date: "Apr 11, 2026", amount:  28.90, category: "Food"      },
  { id: "v5",  icon: Car,           name: "Fuel — OMV",                date: "Apr 3, 2026",  amount:  61.20, category: "Transport" },
  { id: "v6",  icon: Car,           name: "Parking Garage",            date: "Apr 8, 2026",  amount:  18.00, category: "Transport" },
  { id: "v7",  icon: Laptop,        name: "Figma Pro",                 date: "Apr 1, 2026",  amount:  15.00, category: "Work"      },
  { id: "v8",  icon: Dumbbell,      name: "Climbing Day Pass",         date: "Apr 6, 2026",  amount:  22.00, category: "Health"    },
  { id: "v9",  icon: Music,         name: "Concert Ticket",            date: "Apr 10, 2026", amount:  55.00, category: "Leisure"   },
  { id: "v10", icon: ShoppingCart,  name: "Zara Spring Jacket",        date: "Apr 4, 2026",  amount:  79.95, category: "Personal"  },
  { id: "v11", icon: Home,          name: "Hardware Store — Bauhaus",  date: "Apr 7, 2026",  amount:  34.20, category: "Housing"   },
  { id: "v12", icon: GraduationCap, name: "Udemy Course",              date: "Apr 2, 2026",  amount:  19.99, category: "Education" },
];
