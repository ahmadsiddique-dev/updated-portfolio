import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import pino from 'pino';
import { handleDocUpload } from './lib/handleDocUpload.js';
import handleUserQuery from './lib/handleUserQuery.js'
import { MongoClient } from 'mongodb'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
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
export const collection = client
    .db(process.env['DB_NAME'])
    .collection(process.env['COLLECTION_NAME']!);
export const embedings = new GoogleGenerativeAIEmbeddings({
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

app.post('/upload', upload.single('file'), handleDocUpload);

app.post('/query', handleUserQuery);

// Server up & running
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
}); 