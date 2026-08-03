import express from 'express';
import cors from 'cors';
import multer from 'multer';
import pino from 'pino';
import { PDFParse } from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { Document } from '@langchain/core/documents';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb'

// come on! We know it
const app = express();
const port = process.env['PORT'] || 7000;

// Middlewares ig
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Services
export const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        }
    },
});
const client = new MongoClient(process.env["MONGODB_URI"]!)
const collection = client
    .db(process.env['DB_NAME'])
    .collection(process.env['COLLECTION_NAME']!);
const embedings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env['GOOGLE_API_KEY']!,
    model: "gemini-embedding-2"
})
const upload = multer({
    storage: multer.memoryStorage(),
})

// Routes
app.get('/', (_, res) => {
    res.send('Server is up and running.');
})

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

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
            collection,
            indexName: 'data',
            textKey: 'text',
            embeddingKey: 'embedding',
        })

        if (!vectorStore) {
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
})

// Server up & running
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});