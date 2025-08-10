import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { convertToModelMessages, stepCountIs, streamText, tool, UIMessage } from "ai";
import { google } from '@ai-sdk/google';
import z from "zod";
import { internal } from "./_generated/api";

const http = httpRouter();
auth.addHttpRoutes(http);



http.route({
  path: '/api/chat',
  method: 'POST',
  handler: httpAction(async (ctx, req) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages }: { messages: UIMessage[] } = await req.json();
    const lastMessages = messages.slice(-10);

    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: `You are a helpful AI assistant for a note-taking app called Memo AI. Your primary function is to answer user questions and provide insights based **only** on the context provided from their notes.

**Your Instructions:**
1. First, use the 'findRelevantNotes' tool to search for relevant context from the user's notes.
2. After the tool returns the context, analyze the provided notes to answer the user's question. **Do not** use any external knowledge.
3. You can and should use markdown for formatting (links, bold, lists).
4. When you reference information from a note, provide a clickable link using this **exact markdown format**: [View Note](/notes?noteId=<note-id>)
5. **Always use proper markdown link syntax**: [link text](URL) - not just [URL] alone.
6. If the tool returns no relevant notes or the notes do not contain the answer, you must respond with: "Sorry, I can't find that information in your notes."
7. Keep your responses concise and to the point.`,
      messages: convertToModelMessages(lastMessages),
      stopWhen: stepCountIs(5),
      tools: {
        findRelevantNotes: tool({
          description:
            "Use this tool to search and retrieve relevant notes from the user's database. This should be your first step before answering any user question. The search query should be based on the user's latest message.",
          inputSchema: z.object({
            query: z.string().describe("The user's query"),
          }),
          execute: async ({ query }: { query: string }) => {
            console.log("findRelevantNotes query:", query);

            const relevantNotes = await ctx.runAction(
              internal.notesActions.findRelevantNotes,
              {
                query,
                userId,
              }
            );

            return relevantNotes.map((note) => ({
              id: note._id,
              title: note.title,
              content: note.content,
              creationTime: note._creationTime,
            }));
          },
        }),
      },
      onError(error) {
        console.error("Error Streaming Response: ", error);
      }
    });

    return result.toUIMessageStreamResponse({
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        Vary: "origin",
      }),
    });
  }),
});



http.route({
  path: "/api/chat",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    const headers = request.headers;
    if (
      headers.get("Origin") !== null &&
      headers.get("Access-Control-Request-Method") !== null &&
      headers.get("Access-Control-Request-Headers") !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Digest, Authorization",
          "Access-Control-Max-Age": "86400",
        }),
      });
    } else {
      return new Response();
    }
  }),
});



export default http;
