import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    code: {type: String, required: true, maxLength: 6 },
    stock: {type: Number, required: true}
});

export const ProductsModel = mongoose.model(
    'products',
    productsSchema 
);