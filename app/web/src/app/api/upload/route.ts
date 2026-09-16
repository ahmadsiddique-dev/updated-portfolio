import { NextRequest } from "next/server";
import { extractText } from 'unpdf'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import { embedMany } from 'ai'
import db from '@/lib/db'
import EmbeddignsModel, { IEmbeddings } from '@/models/embeddings.model'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const file = formData.get("file");

        if (!(file instanceof File)) {
            throw new Error("File not found");
        }

        const chunks = await chunkText(file);

        const response = await embedText(chunks);

        return Response.json({ message: response }, { status: 200 })
    } catch (error) {
        return Response.json({ message: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 })
    }

}

async function chunkText(file: File): Promise<string[]> {
    const arrayBuffer = await file.arrayBuffer();

    const uint8 = new Uint8Array(arrayBuffer);

    const { text } = await extractText(uint8, {
        mergePages: true
    });

    const splitted = new RecursiveCharacterTextSplitter({
        chunkOverlap: 200,
        chunkSize: 1000,
    });

    const chunks = await splitted.splitText(text);

    return chunks;
}

async function embedText(chunks: string[]): Promise<IEmbeddings[]> {
    const { embeddings } = await embedMany({
        model: "openai/text-embedding-3-small",
        values: chunks,
    })
    const data: IEmbeddings[] = [];

    embeddings.map((e, i) => {
        data.push({ text: chunks[i], embedding: e })
    })

    await db();

    const response = await EmbeddignsModel.insertMany(data);

    return response;
}
