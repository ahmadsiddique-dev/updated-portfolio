import { z } from 'zod';
import { tool, embed } from 'ai'
import { Embeddings } from '@/models/embeddings.model'
import db from '@/lib/db'
import { Contact } from '@/models/contact.model'

export const tools = {
    getInfoTool: tool({
        description: "Use this tool when you need information regarding Ahmad Siddique",
        inputSchema: z.object({
            searchString: z.string().describe("A perfect Search Query that can fetch very relevant chunks")
        }),
        execute: async ({ searchString }) => {
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
    }),
    saveInfoTool: tool({
        description: "Use this tool when you have user's contact info and name also a short summary of chat to save in database",
        inputSchema: z.object({
            name: z.string().describe("Name of the user"),
            contact: z.string().describe("contact either email or phone number"),
            summary: z.string().describe("Summary of the chat that you had with user")
        }),
        execute: async ({ contact, name, summary }) => {
            try {
                if (!contact || !name || !summary) {
                    return {
                        success: false,
                        message: "Either name, contact or summary is missing. Please provide all infomation"
                    }
                }

                await db();

                const response = await Contact.insertOne({
                    name,
                    contact,
                    summary
                })

                if (!response) {
                    return {
                        success: false,
                        message: "Error while write resource to database"
                    }
                }

                return {
                    success: true,
                    message: "Successfully Inserted Record"
                }
            } catch (error) {
                return {
                    success: false,
                    message: error instanceof Error ? error.message : "Something went wrong!"
                }
            }
        }
    })
}