import type { Request, Response } from 'express';
import { PDFParse } from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { Document } from '@langchain/core/documents';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb'
import { embedings, RagCollection, logger } from '../index.js';

export const handleDocUpload = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        // I don't wanted to write comments please read logs you will get it, if you have that 3 pounds of brain
        if (!file || file?.size > 10 * 1024 * 1024) {
            logger.error(`Received file: ${file?.originalname}`);
            res.status(400).send('10 MB file size limit exceeded.');
        }

        logger.info(`Received file: ${file?.originalname}, size: ${file?.size} bytes`);

        const parser = new PDFParse({
            data: file?.buffer,
        })

        logger.info(`Parsed File: [${file?.originalname}] done successfully.`);


        const result = await parser.getText();
        const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 400, chunkOverlap: 80 })

        const splitted = await splitter.splitText(result.text);

        logger.info(`Splitted File: [${file?.originalname}] into ${splitted.length} chunks.`);

        const vectorStore = new MongoDBAtlasVectorSearch(embedings, {
            collection: RagCollection,
            indexName: 'data',
            textKey: 'text',
            embeddingKey: 'embedding',
        })


        if (!vectorStore) {
            logger.error('Failed to create vector store.');
            res.status(400).send('Something went wrong while creating embedings.')
        }

        logger.info('Embeddings created successfully.');

        await vectorStore.addDocuments(splitted.map((text) => new Document({ pageContent: text })));

        logger.info(`Uploaded File: [${file?.originalname}] successfully.`);

        res.status(200).send('File uploaded and parsed successfully.');
    } catch (err) {
        logger.error(err instanceof Error ? err.message : 'Unknown error');
        res.status(500).send(err instanceof Error ? err.message : 'Error occurred while handling file upload');
    }
}