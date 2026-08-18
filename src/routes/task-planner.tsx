import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { TOOLS } from "@/lib/tool-config";

const config = TOOLS["task-planner"]!;

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workplace AI Assistant" },
      {
        name: "description",
        content:
          "Turn a goal and your constraints into a prioritised task table, a time-blocked schedule and a clear definition of done.",
      },
      { property: "og:title", content: "AI Task Planner — Workplace AI Assistant" },
      {
        property: "og:description",
        content: "From goal to prioritised, time-blocked plan in one step.",
      },
    ],
  }),
  component: TaskPlannerPage,
});

function TaskPlannerPage() {
  return (
    <AppShell title={config.title} subtitle={config.tagline}>
      <ToolWorkspace config={config} />
    </AppShell>
  );
}
