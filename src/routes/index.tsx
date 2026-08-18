import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { ResponsibleAiNote } from "@/components/AiOutput";
import { TOOLS } from "@/lib/tool-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate workplace tasks with AI: generate emails, summarise meetings, plan tasks, research topics and chat with an assistant built for professionals.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "One clean workspace for AI-assisted emails, meeting summaries, task plans, research briefs and chat.",
      },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "AI workspaces", value: "5", icon: Sparkles },
  { label: "Structured prompts", value: "Guided", icon: Zap },
  { label: "Outputs", value: "Fully editable", icon: Bot },
  { label: "Review policy", value: "Human in the loop", icon: ShieldCheck },
];

function Dashboard() {
  const tools = Object.values(TOOLS);

  return (
    <AppShell title="Dashboard" subtitle="Automate the busywork, keep the judgement">
      <div className="space-y-8">
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <div className="gradient-primary px-6 py-10 sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/75">
              AI Workplace Productivity Assistant
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold text-primary-foreground sm:text-3xl">
              Draft, summarise, plan and research — in one professional workspace.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-primary-foreground/85">
              Each tool uses a structured prompt so you get consistent, review-ready drafts instead of
              guesswork. You stay in control of every word.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/email-generator"
                className="inline-flex items-center gap-2 rounded-lg bg-card px-4 py-2.5 text-sm font-medium text-card-foreground transition-opacity hover:opacity-90"
              >
                Start with an email <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                to="/assistant"
                className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/40 px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Open the chatbot
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-2 divide-border border-t border-border sm:grid-cols-4 sm:divide-x">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-5 py-4">
                <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                  <stat.icon className="size-3.5" aria-hidden /> {stat.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-card-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Your AI workspaces</h2>
          <p className="text-sm text-muted-foreground">Pick a task and generate a first draft.</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                to={`/${tool.slug}` as "/email-generator"}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <tool.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-card-foreground">{tool.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{tool.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {tool.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}

            <Link
              to="/assistant"
              className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Bot className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-card-foreground">AI Chatbot Interface</h3>
              <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
                Free-form conversation for anything the focused tools don't cover — with full chat history in
                the session.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open chat <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Responsible AI use</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Always review",
                body: "Treat every output as a first draft. Check facts, figures, names and dates before sending.",
              },
              {
                title: "Keep data safe",
                body: "Don't paste confidential, personal or regulated data you aren't permitted to process.",
              },
              {
                title: "You decide",
                body: "AI supports your judgement — it does not replace it. Accountability stays with you.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-4 shadow-card">
                <h3 className="text-sm font-semibold text-card-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          <ResponsibleAiNote />
        </section>
      </div>
    </AppShell>
  );
}
