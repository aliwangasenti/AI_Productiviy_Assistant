import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AiOutput, ResponsibleAiNote } from "@/components/AiOutput";
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
import { Textarea } from "@/components/ui/textarea";
import { runAssistantTool } from "@/lib/ai.functions";
import type { ToolConfig } from "@/lib/tool-config";

function defaults(config: ToolConfig) {
  const init: Record<string, string> = {};
  for (const field of config.fields) {
    init[field.name] = field.type === "select" ? (field.options?.[0] ?? "") : "";
  }
  return init;
}

export function ToolWorkspace({ config }: { config: ToolConfig }) {
  const [values, setValues] = useState<Record<string, string>>(() => defaults(config));
  const [output, setOutput] = useState("");
  const run = useServerFn(runAssistantTool);

  const mutation = useMutation({
    mutationFn: async () => run({ data: { tool: config.tool, input: values } }),
    onSuccess: (result) => {
      setOutput(result.text);
      toast.success("Draft ready — review and edit before you use it.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "The AI request failed. Please try again.");
    },
  });

  const missing = config.fields.filter((f) => f.required && !values[f.name]?.trim());

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      <section className="rounded-xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-start gap-3">
          <span className="gradient-primary flex size-10 shrink-0 items-center justify-center rounded-xl text-primary-foreground">
            <config.icon className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-semibold text-card-foreground">Structured prompt</h2>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>

        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (missing.length > 0) {
              toast.error(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
              return;
            }
            mutation.mutate();
          }}
        >
          {config.fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={`${config.slug}-${field.name}`}>
                {field.label}
                {field.required && <span className="ml-1 text-destructive">*</span>}
              </Label>

              {field.type === "input" && (
                <Input
                  id={`${config.slug}-${field.name}`}
                  value={values[field.name] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                />
              )}

              {field.type === "textarea" && (
                <Textarea
                  id={`${config.slug}-${field.name}`}
                  rows={field.rows ?? 5}
                  value={values[field.name] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                />
              )}

              {field.type === "select" && (
                <Select
                  value={values[field.name] ?? ""}
                  onValueChange={(next) => setValues((v) => ({ ...v, [field.name]: next }))}
                >
                  <SelectTrigger id={`${config.slug}-${field.name}`}>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {field.hint && <p className="text-xs text-muted-foreground">{field.hint}</p>}
            </div>
          ))}

          <div className="flex flex-wrap gap-2 pt-1">
            <Button type="submit" disabled={mutation.isPending} className="flex-1">
              {mutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" aria-hidden /> {config.cta}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setValues(defaults(config));
                setOutput("");
              }}
            >
              <RotateCcw className="size-4" aria-hidden /> Reset
            </Button>
          </div>
        </form>

        <ResponsibleAiNote className="mt-4" />
      </section>

      <section className="min-w-0 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Editable output</h2>
          {output && <span className="text-xs text-muted-foreground">Draft — edit freely</span>}
        </div>

        {output ? (
          <AiOutput value={output} onChange={setOutput} filename={config.slug} />
        ) : (
          <div className="flex min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/60 p-8 text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <config.icon className="size-6" aria-hidden />
            </span>
            <p className="mt-4 text-sm font-medium text-foreground">{config.tagline}</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Fill in the prompt fields and generate a first draft. Everything the AI returns stays fully
              editable here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
