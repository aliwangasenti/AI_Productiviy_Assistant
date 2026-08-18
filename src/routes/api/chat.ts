import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { getGatewayModel } from "@/lib/ai-gateway.server";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompts";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages: UIMessage[] };
        const result = streamText({
          model: getGatewayModel(),
          system: CHAT_SYSTEM_PROMPT,
          messages: convertToModelMessages(body.messages ?? []),
        });
        return result.toUIMessageStreamResponse();
      },
    },
  },
});
