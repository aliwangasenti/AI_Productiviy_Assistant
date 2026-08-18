import { streamText } from "ai";

import { getGatewayModel } from "./ai-gateway.server";
import { buildPrompt, type AssistantTool } from "./prompts";

export async function generateAssistantOutput(
  tool: AssistantTool,
  input: Record<string, string>,
): Promise<{ text: string }> {
  const built = buildPrompt(tool, input);
  const result = streamText({
    model: getGatewayModel(),
    system: built.system,
    prompt: built.prompt,
  });
  return { text: await result.text };
}
