"use node";
import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { generateEmbedding, generateEmbeddings } from "@/lib/embeddings";
import { api, internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";



export const createNote = action({
  args: {
    title: v.string(),
    content: v.string(),
  },
  returns: v.id("notes"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated to create a note");
    }

    const text = `${args.title} \n\n ${args.content}`;
    const embeddings = await generateEmbeddings(text);

    const noteId: Id<"notes"> = await ctx.runMutation(
      internal.notes.createNoteWithEmbeddings,
      {
        title: args.title,
        content: args.content,
        userId,
        embeddings,
      }
    );

    return noteId;
  }
})



export const updateNote = action({
  args: {
    noteId: v.id("notes"),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated to update a note");
    }

    const note = await ctx.runQuery(api.notes.getNote, { noteId: args.noteId });
    if (!note || note.userId !== userId) {
      throw new Error("User not authorized to update this note!");
    }

    const text = `${args.title} \n\n ${args.content}`;
    const embeddings = await generateEmbeddings(text);

    await ctx.runMutation(internal.notes.updateNoteAndEmbeddings, {
      noteId: args.noteId,
      title: args.title,
      content: args.content,
      userId,
      embeddings,
    });
  },
});



export const findRelevantNotes = internalAction({
  args: {
    query: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args): Promise<Array<Doc<"notes">>> => {
    const embedding = await generateEmbedding(args.query);
    const results = await ctx.vectorSearch("notesVectorEmbeddings", "by_embedding", {
      vector: embedding,
      limit: 16,
      filter: q => q.eq("userId", args.userId)
    });

    console.log("Vector Search Result: ", results);
    const resultsAboveThreshold = results.filter(
      (result) => result._score > 0.3
    );

    const embeddingIds = resultsAboveThreshold.map((result) => result._id);

    const notes = await ctx.runQuery(internal.notes.fetchNotesByEmbeddingIds, {
      embeddingIds,
    });

    return notes;
  }
})
