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

        // const vectorStore = new MongoDBAtlasVectorSearch(embedings, {
        //     collection,
        //     indexName: 'data',
        //     textKey: 'text',
        //     embeddingKey: 'embedding',
        // })

        // const results = await vectorStore.similaritySearch(query, 3);
        

        const stream = client.messages.stream({
            system: `You're a responsible AI assistant. You are integrated in a Portofolio of a FullStack Web
            Developer. His name is ahmad siddique. Whenever someone comes you've to answer their questions
            in a friendly and professional manner.
            `,
            model: "claude-sonnet-5",
            max_tokens: 1000,
            messages: [
                {
                    role: "user",
                    content: query
                }
            ]
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

