import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { TOOLS } from "@/lib/tool-config";

const config = TOOLS["research"]!;

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workplace AI Assistant" },
      {
        name: "description",
        content:
          "Generate structured internal research briefs with key findings, trade-offs, recommended next steps and an explicit fact-check list.",
      },
      { property: "og:title", content: "AI Research Assistant — Workplace AI Assistant" },
      {
        property: "og:description",
        content: "Structured briefing notes with findings, trade-offs and next steps.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AppShell title={config.title} subtitle={config.tagline}>
      <ToolWorkspace config={config} />
    </AppShell>
  );
}
