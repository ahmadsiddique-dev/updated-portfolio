import { Schema, model, models } from 'mongoose';

export interface IEmbeddings {
    text: string;
    embedding: number[];
    createdAt?: Date;
    updatedAt?: Date;
};

const embeddingsSchema: Schema<IEmbeddings> = new Schema({
    text: {
        type: String,
        required: true,
    },
    embedding: {
        type: [Number],
        required: true,
    },
}, { timestamps: true });

const Embeddings = models.Embeddings || model('Embeddings', embeddingsSchema);

export default Embeddings;