import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { TOOLS } from "@/lib/tool-config";

const config = TOOLS["email-generator"]!;

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI Assistant" },
      {
        name: "description",
        content:
          "Draft professional workplace emails from a few bullet points, with tone and length controls and fully editable output.",
      },
      { property: "og:title", content: "Smart Email Generator — Workplace AI Assistant" },
      {
        property: "og:description",
        content: "Turn bullet points into polished, on-tone workplace emails in seconds.",
      },
    ],
  }),
  component: EmailGeneratorPage,
});

function EmailGeneratorPage() {
  return (
    <AppShell title={config.title} subtitle={config.tagline}>
      <ToolWorkspace config={config} />
    </AppShell>
  );
}
