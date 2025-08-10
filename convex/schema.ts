import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


const schema = defineSchema({
  ...authTables,

  notes: defineTable({
    title: v.string(),
    content: v.string(),
    userId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_userId', ["userId"])
    .index('by_userId_updatedAt', ["userId", "updatedAt"]),


  notesVectorEmbeddings: defineTable({
    content: v.string(),
    embedding: v.array(v.float64()),
    noteId: v.id("notes"),
    userId: v.id("users"),
  })
    .index('by_noteId', ["noteId"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 768,
      filterFields: ["userId"]
    })
});


export default schema;
