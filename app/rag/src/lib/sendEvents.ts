import express from 'express';

type Data = {
    message: string;
    progress: number
}

export function sendEvents(res: express.Response, data: Data) {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
}