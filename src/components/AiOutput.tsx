import { Check, Copy, Download, Eye, Info, PencilLine } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DISCLAIMER } from "@/lib/prompts";

export function ResponsibleAiNote({ className }: { className?: string | undefined }) {
  return (
    <p
      className={
        "flex gap-2 rounded-lg border border-border bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground " +
        (className ?? "")
      }
    >
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      <span>{DISCLAIMER}</span>
    </p>
  );
}

export function AiOutput({
  value,
  onChange,
  filename,
}: {
  value: string;
  onChange: (next: string) => void;
  filename: string;
}) {
  const [mode, setMode] = useState<"preview" | "edit">("preview");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([value], { type: "text/markdown" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div className="flex rounded-lg bg-muted p-1">
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${mode === "preview" ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`}
          >
            <Eye className="size-3.5" aria-hidden /> Preview
          </button>
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${mode === "edit" ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`}
          >
            <PencilLine className="size-3.5" aria-hidden /> Edit
          </button>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={copy}>
            {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={download}>
            <Download className="size-3.5" aria-hidden /> Export
          </Button>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {mode === "preview" ? (
          <div className="prose-ai text-sm text-card-foreground">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        ) : (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={22}
            className="min-h-[24rem] font-mono text-[0.8rem] leading-relaxed"
          />
        )}
      </div>
    </div>
  );
}
