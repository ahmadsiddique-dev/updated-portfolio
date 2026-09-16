import { z } from 'zod';
import { tool, embed } from 'ai'
import { Embeddings } from '@/models/embeddings.model'
import db from '@/lib/db'

export const tools = {
    getInfoTool: tool({
        description: "",
        inputSchema: z.object({
            searchString: z.string().describe("")
        }),
        outputSchema: z.object({
            success: z.boolean(),
            message: z.string(),
            data: z.array(z.string()).nullable()
        }),
        execute: async ({ searchString }) => {
            console.log("Query Came bro");
            try {
                const { embedding } = await embed({
                    model: "openai/text-embedding-3-small",
                    value: searchString,
                })

                await db();

                const result = await Embeddings.aggregate([
                    {
                        "$vectorSearch": {
                            index: "vector_index",
                            limit: 3,
                            path: "embedding",
                            queryVector: embedding,
                            numCandidates: 100
                        }
                    },
                    {
                        "$project": {
                            "_id": 1,
                            "text": 1,
                            "embedding": 1,
                        }
                    }
                ])
                
                if (!result) {
                    return {
                        success: false,
                        message: "Results Not found",
                        data: null
                    }
                }

                const data = result.map((r) => {
                    return r.text;
                })

                return {
                    success: true,
                    message: "",
                    data: data
                }
            } catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "Something went wrong!",
                    data: null
                }
            }
        }
    })
}