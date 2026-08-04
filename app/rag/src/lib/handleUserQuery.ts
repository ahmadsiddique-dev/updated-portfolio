// Ok now read the comments i wrote and hopefully you will get what is happening here?

import type { Request, Response } from 'express';
import { collection, embedings } from '../index.js'
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { betaZodTool } from '@anthropic-ai/sdk/helpers/beta/zod'
import { z } from 'zod'
import { Anthropic } from '@anthropic-ai/sdk'

const client = new Anthropic({
    apiKey: process.env['ANTHROPIC_API_KEY']!,
})

const searchTool = betaZodTool({
    name: "search",
    description: "Use this tool when you need to fetch information regarding ahmad siddique's portfolio and other things like blogs, projects, skills, is he ready to work or not, and other related information.",
    inputSchema: z.object({
        query: z.string()
    }),
    run: async (input) => {
        const vectorStore = new MongoDBAtlasVectorSearch(embedings, {
            collection,
            indexName: 'data',
            textKey: 'text',
            embeddingKey: 'embedding',
        })

        const results = await vectorStore.similaritySearch(input.query, 3);
        console.log('Results from MongoDB Atlas Vector Search:', results.map((doc) => doc.pageContent).join('\n\n'));
        return results.map((doc) => doc.pageContent).join('\n\n');
    }
})

export default async function handleUserQuery(req: Request, res: Response) {
    // wrap in try catch block to handle errors

    try {
        const { messages, query } = await req.body;
        const chatMessages = messages || [{ role: "user", content: query }];

        const response = await client.beta.messages.toolRunner({
            model: "claude-sonnet-5",
            system: "You're a helpful assistant for Ahmad Siddique's portfolio website. Use the search tool to find information when asked about Ahmad, his skills, projects, or background.",
            max_tokens: 1024,
            stream: false,
            tools: [searchTool] as any,
            messages: chatMessages,
            tool_choice: { type: "auto", disable_parallel_tool_use: true }
        }).runUntilDone();

        const textResponse = response.content.map((message) => {
            if (message.type === 'text') {
                return message.text;
            }
            return '';
        })

        console.log('Response from Anthropic API:', textResponse);

        res.status(200).json({ response: textResponse });

    } catch (error) {
        console.error('Error handling user query:', error);
        res.status(500).send('Internal Server Error');
    }
}