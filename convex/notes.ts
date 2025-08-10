import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";



export const createNoteWithEmbeddings = internalMutation({
  args: {
    title: v.string(),
    content: v.string(),
    userId: v.id("users"),
    embeddings: v.array(
      v.object({
        embedding: v.array(v.float64()),
        content: v.string(),
      })
    )
  },
  returns: v.id("notes"),
  handler: async (ctx, args) => {
    const now = Date.now();
    const noteId = await ctx.db.insert("notes", {
      title: args.title,
      content: args.content,
      userId: args.userId,
      createdAt: now,
      updatedAt: now,
    });

    for (const embeddingData of args.embeddings) {
      await ctx.db.insert("notesVectorEmbeddings", {
        content: embeddingData.content,
        embedding: embeddingData.embedding,
        noteId,
        userId: args.userId,
      });
    }

    return noteId;
  }
})



export const getUserNotes = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("notes")
      .withIndex("by_userId_updatedAt", q => q.eq("userId", userId))
      .order("desc")
      .collect();
  }
})



export const getNote = query({
  args: {
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const note = await ctx.db.get(args.noteId);
    if (!note || note.userId !== userId) {
      return null;
    }

    return note;
  }
})



export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated to delete a note");
    }

    const note = await ctx.db.get(args.noteId);
    if (!note) {
      throw new Error("Note not found!");
    }

    if (note.userId !== userId) {
      throw new Error("User not authorized to delete this note!");
    }

    const embeddings = await ctx.db
      .query("notesVectorEmbeddings")
      .withIndex("by_noteId", q => q.eq("noteId", args.noteId))
      .collect()

    for (const embedding of embeddings) {
      await ctx.db.delete(embedding._id);
    }

    await ctx.db.delete(args.noteId);
  }
})



export const updateNoteAndEmbeddings = internalMutation({
  args: {
    noteId: v.id("notes"),
    title: v.string(),
    content: v.string(),
    userId: v.id("users"),
    embeddings: v.array(
      v.object({
        embedding: v.array(v.float64()),
        content: v.string(),
      })
    )
  },
  handler: async (ctx, args) => {
    const oldEmbeddings = await ctx.db
      .query("notesVectorEmbeddings")
      .withIndex("by_noteId", q => q.eq("noteId", args.noteId))
      .collect();

    for (const embedding of oldEmbeddings) {
      await ctx.db.delete(embedding._id);
    }

    await ctx.db.patch(args.noteId, {
      title: args.title,
      content: args.content,
      updatedAt: Date.now(),
    });

    for (const embeddingData of args.embeddings) {
      await ctx.db.insert("notesVectorEmbeddings", {
        content: embeddingData.content,
        embedding: embeddingData.embedding,
        noteId: args.noteId,
        userId: args.userId,
      });
    }
  }
})


export const fetchNotesByEmbeddingIds = internalQuery({
  args: {
    embeddingIds: v.array(v.id("notesVectorEmbeddings")),
  },
  handler: async (ctx, args) => {
    const embeddings = [];

    for (const id of args.embeddingIds) {
      const embedding = await ctx.db.get(id);
      if (embedding !== null) embeddings.push(embedding);
    }

    const uniqueNoteId = [
      ...new Set(embeddings.map(embedding => embedding.noteId))
    ];

    const results = [];
    for (const id of uniqueNoteId) {
      const note = await ctx.db.get(id);
      if (note !== null) results.push(note);
    }

    return results;
  }
});
