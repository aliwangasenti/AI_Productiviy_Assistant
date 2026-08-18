import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { ResponsibleAiNote } from "@/components/AiOutput";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — Workplace AI Assistant" },
      {
        name: "description",
        content:
          "Chat with an AI assistant built for professionals: draft, summarise, prioritise and think through workplace problems.",
      },
      { property: "og:title", content: "AI Chatbot — Workplace AI Assistant" },
      {
        property: "og:description",
        content: "A workplace AI chatbot for drafting, summarising and planning.",
      },
    ],
  }),
  component: AssistantPage,
});

const SUGGESTIONS = [
  "Help me prioritise my week across three projects",
  "Rewrite this update so it's clearer for executives",
  "What questions should I ask in a vendor review?",
  "Turn these notes into a status report",
];

function AssistantPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const endRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    sendMessage({ text: value });
    setInput("");
  };

  return (
    <AppShell title="AI Chatbot" subtitle="Your always-on workplace assistant">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="flex min-h-[26rem] flex-col rounded-xl border border-border bg-card shadow-card">
          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
            {messages.length === 0 && (
              <div className="py-8 text-center">
                <span className="gradient-primary mx-auto flex size-12 items-center justify-center rounded-2xl text-primary-foreground">
                  <Bot className="size-6" aria-hidden />
                </span>
                <h2 className="mt-4 text-base font-semibold text-card-foreground">
                  How can I help you work faster today?
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ask anything, or start with one of these.
                </p>
                <div className="mx-auto mt-5 grid max-w-xl gap-2 sm:grid-cols-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => submit(s)}
                      className="rounded-lg border border-border bg-background p-3 text-left text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => {
              const text = message.parts
                .map((part) => (part.type === "text" ? part.text : ""))
                .join("");
              const isUser = message.role === "user";
              return (
                <div key={message.id} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isUser ? "bg-secondary text-secondary-foreground" : "gradient-primary text-primary-foreground"}`}
                  >
                    {isUser ? <User className="size-4" aria-hidden /> : <Bot className="size-4" aria-hidden />}
                  </span>
                  <div
                    className={`prose-ai max-w-[85%] rounded-xl px-4 py-3 text-sm ${isUser ? "bg-secondary text-secondary-foreground" : "border border-border bg-background text-foreground"}`}
                  >
                    <ReactMarkdown>{text}</ReactMarkdown>
                  </div>
                </div>
              );
            })}

            {busy && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" aria-hidden /> Thinking…
              </p>
            )}

            {error && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                {error.message || "The assistant is unavailable right now. Please try again."}
              </p>
            )}

            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-end gap-2 border-t border-border p-3"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(input);
                }
              }}
              rows={2}
              placeholder="Ask the assistant… (Shift + Enter for a new line)"
              className="min-h-[3rem] resize-none"
            />
            <Button type="submit" disabled={busy || !input.trim()} size="icon" className="size-11 shrink-0">
              <Send className="size-4" aria-hidden />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>

        <ResponsibleAiNote />
      </div>
    </AppShell>
  );
}
