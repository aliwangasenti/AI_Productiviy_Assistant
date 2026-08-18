import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { TOOLS } from "@/lib/tool-config";

const config = TOOLS["meeting-notes"]!;

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workplace AI Assistant" },
      {
        name: "description",
        content:
          "Turn messy meeting notes or transcripts into structured summaries with decisions, action items, owners and a follow-up email.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Workplace AI Assistant" },
      {
        property: "og:description",
        content: "Extract decisions, owners and action items from any meeting transcript.",
      },
    ],
  }),
  component: MeetingNotesPage,
});

function MeetingNotesPage() {
  return (
    <AppShell title={config.title} subtitle={config.tagline}>
      <ToolWorkspace config={config} />
    </AppShell>
  );
}
