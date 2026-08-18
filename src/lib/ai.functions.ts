import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { generateAssistantOutput } from "./assistant.server";

const InputSchema = z.object({
  tool: z.enum(["email", "notes", "planner", "research"]),
  input: z.record(z.string()),
});

export const runAssistantTool = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => generateAssistantOutput(data.tool, data.input));
