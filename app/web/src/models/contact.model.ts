import { Schema, model, models, Document } from 'mongoose';

export interface IContact extends Document {
    name: string;
    contact: string;
    summary: string;
    createdAt?: Date;
    updatedAt?: Date;
}


const ContactSchema = new Schema<IContact>({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required:true
    },
    summary: {
        type: String,
        required: true
    }
}, { timestamps: true});

export const Contact = models.Contact || model<IContact>("Contact", ContactSchema);
