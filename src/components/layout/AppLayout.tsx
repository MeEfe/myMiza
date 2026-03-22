import { AppProvider, useApp } from "@/context/AppContext";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { NetWorthCard } from "@/components/dashboard/NetWorthCard";
import { StatCardGrid } from "@/components/dashboard/StatCardGrid";
import { CashFlowCard } from "@/components/dashboard/CashFlowCard";
import { BudgetCard } from "@/components/dashboard/BudgetCard";
import { TransactionLedger } from "@/components/dashboard/TransactionLedger";
import { BillsView } from "@/components/bills/BillsView";

function DashboardContent() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <NetWorthCard />
        <StatCardGrid />
        <div className="grid grid-cols-[3fr_2fr] gap-4">
          <CashFlowCard />
          <BudgetCard />
        </div>
        <TransactionLedger />
      </div>
    </div>
  );
}

function MainContent() {
  const { activeNav } = useApp();
  if (activeNav === "bills") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden px-6 py-6">
        <BillsView />
      </div>
    );
  }
  return <DashboardContent />;
}

function Layout() {
  return (
    <div className="grid h-screen grid-cols-[260px_1fr] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col overflow-hidden">
        <TopBar />
        <MainContent />
      </div>
    </div>
  );
}

export function AppLayout() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
