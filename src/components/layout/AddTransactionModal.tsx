import { useState } from "react";
import { Plus, CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { CATEGORY_BADGE, CATEGORY_DEFAULT_ICON } from "@/lib/categoryColors";

type TxType = "outflow" | "inflow";
type Frequency = "one-time" | "weekly" | "monthly" | "yearly";

const CATEGORIES = Object.keys(CATEGORY_BADGE);

// ── date helpers ──────────────────────────────────────────────────────────────

function isoToDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function dateToIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDisplayDate(iso: string): string {
  return isoToDate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const today = dateToIso(new Date());

// ── form state ────────────────────────────────────────────────────────────────

interface FormState {
  type: TxType;
  frequency: Frequency;
  name: string;
  amount: string;
  category: string;
  date: string;
}

const INITIAL: FormState = {
  type: "outflow",
  frequency: "one-time",
  name: "",
  amount: "",
  category: "Groceries",
  date: today,
};

// ── segmented toggle ──────────────────────────────────────────────────────────

function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  getActiveClass,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  getActiveClass?: (v: T) => string;
}) {
  return (
    <div className="flex rounded-lg border border-border/60 bg-secondary/40 p-0.5">
      {options.map((opt) => {
        const isActive = value === opt.value;
        const activeClass = getActiveClass
          ? getActiveClass(opt.value)
          : "bg-background text-foreground shadow-sm";
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 cursor-pointer rounded-md py-1.5 text-[12px] font-semibold transition-all duration-150",
              isActive ? activeClass : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export function AddTransactionModal() {
  const { addTransaction } = useApp();
  const [open, setOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) {
      setForm(INITIAL);
      setTouched({});
      setCalOpen(false);
    }
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "type") {
        if (value === "inflow" && prev.category === "Groceries") next.category = "Income";
        if (value === "outflow" && prev.category === "Income") next.category = "Groceries";
      }
      return next;
    });
  }

  function blur(key: keyof FormState) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  const nameError   = touched.name   && form.name.trim() === ""                       ? "Name is required."   : null;
  const amountError = touched.amount && (form.amount === "" || Number(form.amount) <= 0) ? "Enter a valid amount." : null;
  const canSave = form.name.trim() !== "" && Number(form.amount) > 0;

  function handleSave() {
    if (!canSave) return;
    const icon = CATEGORY_DEFAULT_ICON[form.category] ?? CATEGORY_DEFAULT_ICON["Personal"]!;
    addTransaction({
      icon,
      name: form.name.trim(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: formatDisplayDate(form.date),
      recurrence: form.frequency === "one-time" ? null : form.frequency,
    });
    handleOpenChange(false);
  }

  const selectedDate = isoToDate(form.date);

  const typeActiveClass = (v: TxType) =>
    v === "outflow"
      ? "bg-background text-red-600 shadow-sm"
      : "bg-background text-emerald-600 shadow-sm";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className="flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 text-[12px] font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
          aria-label="Add transaction"
        >
          <Plus size={13} strokeWidth={2.5} />
          Add
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className='font-bold'>
            {form.type === "outflow" ? "New Expense" : "New Income"}
          </DialogTitle>
        </DialogHeader>

        <form
          id="add-tx-form"
          onSubmit={(e) => { e.preventDefault(); handleSave(); }}
          onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSave(); }}
          className="flex flex-col gap-5 py-1"
        >
          {/* Type toggle */}
          <SegmentedToggle
            options={[
              { value: "outflow" as TxType, label: "Expense" },
              { value: "inflow"  as TxType, label: "Income"  },
            ]}
            value={form.type}
            onChange={(v) => setField("type", v)}
            getActiveClass={typeActiveClass}
          />

          {/* Hero amount */}
          <div className="flex flex-col gap-1.5">
            <div className="relative">
              <span
                className={cn(
                  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-semibold tabular-nums select-none",
                  form.type === "outflow" ? "text-red-500" : "text-emerald-600"
                )}
              >
                {form.type === "outflow" ? "−" : "+"}€
              </span>
              <Input
                id="tx-amount"
                inputMode="decimal"
                autoFocus
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setField("amount", e.target.value)}
                onBlur={() => blur("amount")}
                className="h-16 pl-[5.5rem] text-3xl font-semibold tabular-nums"
              />
            </div>
            {amountError && <p className="text-[11px] text-red-500">{amountError}</p>}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tx-name" className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
              What was it?
            </Label>
            <Input
              id="tx-name"
              placeholder={form.type === "outflow" ? "Restaurant Alpenblick" : "March salary"}
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              onBlur={() => blur("name")}
              className="h-9 text-[13px]"
            />
            {nameError && <p className="text-[11px] text-red-500">{nameError}</p>}
          </div>

          {/* Category + Date */}
          <div className="grid grid-cols-2 gap-3">
            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tx-category" className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
                Category
              </Label>
              <Select value={form.category} onValueChange={(v) => setField("category", v)}>
                <SelectTrigger id="tx-category" className="h-9 w-full text-[13px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="p-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = CATEGORY_DEFAULT_ICON[cat];
                    return (
                      <SelectItem key={cat} value={cat} className="py-2 text-[13px]">
                        {Icon && <Icon size={14} className="shrink-0 text-muted-foreground" />}
                        {cat}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
                Date
              </Label>
              <Popover open={calOpen} onOpenChange={setCalOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 text-[13px] text-foreground shadow-xs transition-colors hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    <span className="tabular-nums">
                      {form.date === today ? "Today" : formatDisplayDate(form.date)}
                    </span>
                    <CalendarIcon size={13} className="shrink-0 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    defaultMonth={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setField("date", dateToIso(date));
                        setCalOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Frequency */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
              Frequency
            </Label>
            <SegmentedToggle
              options={[
                { value: "one-time" as Frequency, label: "One-time" },
                { value: "weekly"   as Frequency, label: "Weekly"   },
                { value: "monthly"  as Frequency, label: "Monthly"  },
                { value: "yearly"   as Frequency, label: "Yearly"   },
              ]}
              value={form.frequency}
              onChange={(v) => setField("frequency", v)}
            />
          </div>

        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" size="sm">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-tx-form" size="sm" disabled={!canSave}>
            {form.type === "outflow" ? "Save Expense" : "Save Income"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
