import { Link } from "@tanstack/react-router";
import { Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { NAV_ITEMS } from "@/lib/tool-config";
import { cn } from "@/lib/utils";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.to === "/" }}
          activeProps={{
            className: "bg-sidebar-accent text-sidebar-accent-foreground",
          }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
        >
          <item.icon className="size-4 shrink-0" aria-hidden />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-3 px-2 py-1">
        <span className="gradient-primary flex size-9 items-center justify-center rounded-xl text-primary-foreground">
          <Sparkles className="size-5" aria-hidden />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-sidebar-foreground">Workplace AI</span>
          <span className="block text-xs text-sidebar-foreground/60">Productivity Assistant</span>
        </span>
      </Link>

      <div className="flex-1">
        <p className="px-3 pb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-sidebar-foreground/45">
          Workspace
        </p>
        <NavLinks onNavigate={onNavigate} />
      </div>

      <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3">
        <p className="flex items-center gap-2 text-xs font-semibold text-sidebar-foreground">
          <ShieldCheck className="size-4 text-sidebar-primary" aria-hidden />
          Responsible AI
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-sidebar-foreground/65">
          Outputs are drafts. Review facts and keep confidential data out of prompts.
        </p>
      </div>
    </div>
  );
}

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:sticky lg:top-0 lg:block lg:h-screen">
        <SidebarBody />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/50"
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-sidebar shadow-elegant">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-4 rounded-md p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent"
            >
              <X className="size-4" aria-hidden />
            </button>
            <SidebarBody onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              className="rounded-lg border border-border p-2 text-foreground transition-colors hover:bg-accent lg:hidden"
            >
              <Menu className="size-4" aria-hidden />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-foreground sm:text-xl">{title}</h1>
              {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
        </header>

        <main className={cn("flex-1 px-4 py-6 sm:px-6 lg:px-8")}>{children}</main>

        <footer className="border-t border-border px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          AI Workplace Productivity Assistant · AI-generated content may be inaccurate. Always review
          before sending or acting on it.
        </footer>
      </div>
    </div>
  );
}
