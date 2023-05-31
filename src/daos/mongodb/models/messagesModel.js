import mongoose from 'mongoose';

const messagesSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    msg: { type: String, required: true, maxLength: 200 }
});

export const MessagesModel = mongoose.model(
    'messages',
    messagesSchema 
);