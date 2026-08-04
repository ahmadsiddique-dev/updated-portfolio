// Ok now read the comments i wrote and hopefully you will get what is happening here?

import type { Request, Response } from 'express';
import { collection, embedings } from '../index.js'
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { Anthropic } from '@anthropic-ai/sdk'

const client = new Anthropic({
    apiKey: process.env['ANTHROPIC_API_KEY']!,
})

export default async function handleUserQuery(req: Request, res: Response) {
    // wrap in try catch block to handle errors
    try {
        const { query } = await req.body;

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const stream = client.messages.stream({
            system: `You're an AI assistant that is integrated in ahmad siddique's portfolio and when someone comes and asks about him if you don't have information then call given tool or if you don't find result then simpley accept it.
            `,
            model: "claude-sonnet-5",
            max_tokens: 1000,
            tools: [
                {
                    name: "search",
                    description: "Use this tool when you need to fetch information regarding ahmad siddique's portfolio and other things like blogs, projects, skills, is he ready to work or not, and other related information.",
                    input_schema: {
                        type: 'object',
                        properties: {
                            query: {
                                type: 'string'
                            }
                        },
                        required: ['query']
                    },
                    input_examples: [
                        {
                            query: "What is the age of ahmad siddique and also his qualifications?"
                        }
                    ]
                }
            ],
            messages: [
                {
                    role: "user",
                    content: query
                }
            ]
        })

        stream.on('contentBlock', async (block) => {
            if (block.type === "tool_use") {
                const { query: toolQuery } = await block.input as { query: string };
                const vectorStore = new MongoDBAtlasVectorSearch(embedings, {
                    collection,
                    indexName: 'data',
                    textKey: 'text',
                    embeddingKey: 'embedding',
                })

                const results = await vectorStore.similaritySearch(toolQuery, 3);

                const toolOutput = results.map((doc) => doc.pageContent).join('\n\n');

                const secondStream = client.messages.stream({
                    model: 'claude-sonnet-5',
                    system: "you answer using provided information",
                    max_tokens: 1000,
                    messages: [
                        {
                            role: "user",
                            content: query
                        },
                        {
                            role: "assistant",
                            content: [
                                block
                            ]
                        },
                        {
                            role: "user",
                            content: [
                                {
                                    type: "tool_result",
                                    tool_use_id: block.id,
                                    content: toolOutput
                                }
                            ]
                        }
                    ]
                })

                secondStream.on('text', (text) => {
                    res.write(`data: ${text}\n\n`);
                })
            }
        })

        stream.on('text', (text) => {
            res.write(`data: ${text}\n\n`);
        })

        stream.on('end', () => {
            res.write('data: [DONE]\n\n');
            res.end();
        })

        stream.on('error', (err) => {
            res.write(`data: [ERROR] ${err instanceof Error ? err.message : 'Unknown error'}\n\n`);
            res.end();
        });

    } catch (error) {
        console.error('Error handling user query:', error);
        res.status(500).send('Internal Server Error');
    }
}


// async function handleRAGFlow(query: string) {

// }