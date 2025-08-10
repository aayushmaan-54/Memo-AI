import { google } from "@ai-sdk/google";
import { embed, embedMany } from "ai";

const embeddingModel = google.textEmbedding("text-embedding-004");



const generateNoteChunks = (input: string) => {
  return input
    .split("\n\n")
    .map(chunk => chunk.trim())
    .filter(Boolean);
}


export const generateEmbeddings = async (
  value: string
): Promise<Array<{ content: string; embedding: number[] }>> => {
  const chunks = generateNoteChunks(value);

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  return embeddings.map((embedding, index) => ({
    content: chunks[index],
    embedding,
  }));
}



export const generateEmbedding = async (
  value: string
): Promise<number[]> => {
  const { embedding } = await embed({
    model: embeddingModel,
    value,
  });

  return embedding;
}
