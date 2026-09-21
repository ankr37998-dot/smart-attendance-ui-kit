import { type ReactNode, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, Bell, BookOpen, CalendarCheck, ChevronDown, GraduationCap, LayoutDashboard, Menu, Search, Settings, Users, X } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Attendance", to: "/attendance", icon: CalendarCheck },
  { label: "Classes", to: "/classes", icon: BookOpen },
  { label: "Student records", to: "/students", icon: Users },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Profile & settings", to: "/settings", icon: Settings },
] as const;

export function AppShell({ title, eyebrow, action, children }: { title: string; eyebrow?: string; action?: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  return <div className="min-h-screen bg-canvas text-foreground">
    {open && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-overlay lg:hidden" onClick={() => setOpen(false)} />}
    <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex items-center justify-between px-6 py-5"><Brand /><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Close menu" onClick={() => setOpen(false)}><X /></Button></div>
      <nav className="flex-1 px-4">
        <p className="nav-label">Overview</p>
        <div className="space-y-1">{nav.slice(0, 5).map(({ label, to, icon: Icon }) => <Link key={to} to={to} onClick={() => setOpen(false)} className={cn("nav-item", path === to && "nav-item-active")}><Icon />{label}</Link>)}</div>
        <p className="nav-label mt-4">System</p>
        <Link to="/settings" onClick={() => setOpen(false)} className={cn("nav-item", path === "/settings" && "nav-item-active")}><Settings />Profile & settings</Link>
      </nav>
      <div className="border-t border-border p-4"><Link to="/settings" className="flex items-center gap-3 rounded-xl bg-muted p-3"><span className="grid size-10 place-items-center rounded-full bg-primary-deep font-display text-sm font-bold text-primary-foreground">RO</span><span className="min-w-0"><span className="block truncate text-sm font-semibold">Dr. Rachel Okafor</span><span className="block truncate text-xs text-muted-foreground">Administrator</span></span></Link></div>
    </aside>
    <div className="lg:pl-64">
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
        <div className="flex h-[72px] items-center gap-3 px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></Button>
          <div className="hidden sm:block"><p className="font-display text-lg font-bold">{title}</p><p className="text-xs text-muted-foreground">Semester 2026–27 · Week 08</p></div>
          <label className="ml-auto hidden w-64 items-center gap-2 rounded-lg border border-input bg-muted px-3 md:flex"><Search className="size-4 text-muted-foreground"/><Input aria-label="Search" className="h-9 border-0 p-0 shadow-none focus-visible:ring-0" placeholder="Search students, classes…" /></label>
          <Button variant="outline" size="icon" aria-label="Notifications" className="relative"><Bell/><span className="absolute right-2 top-2 size-2 rounded-full bg-warning"/></Button>
          {action ?? <Button asChild><Link to="/classes"><GraduationCap />New class</Link></Button>}
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">{eyebrow ?? "Overview"}</p><h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{title}</h1></div>
          <Button variant="outline">This semester <ChevronDown /></Button>
        </div>
        {children}
      </main>
    </div>
  </div>;
}
