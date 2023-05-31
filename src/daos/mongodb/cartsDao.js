import {CartsModel} from './models/cartsModel.js';

export default class CartsDaoMongoDB {
    async createCart() {
        try {
        const response = await CartsModel.create({});
        return response;
        } catch (error) {
        console.log(error);
        };
    };
    async getCart(id) {
        try {
            const response = await CartsModel.findById(id)
            return response;
        } catch (error) {
            console.log(error);
        };
    };
    async addProductToCart(prodId, cartId){
        try {
            const cartFind = await CartsModel.findById(cartId)
            const existingProduct = await cartFind.products.find(productIt => productIt._id === prodId);
            if(existingProduct){
                const updatedQuantity = existingProduct.quantity + 1
                await CartsModel.updateOne(
                    {_id: cartId, 'products._id': prodId},
                    {$set: {'products.$.quantity': updatedQuantity}}
                );
            } else{
                await CartsModel.findOneAndUpdate(
                    {_id: cartId},
                    {$push: {products: {_id: prodId, quantity: 1}}},
                );
            };
            const cartUpdate = await CartsModel.findById(cartId)
            return cartUpdate
        } catch (error) {
            console.log(error)
        };
    };
    async deleteProductToCart (prodId, cartId){
        try {
            const cartFind = await CartsModel.findById(cartId);
            const existingProduct = await cartFind.products.find(productIt => productIt._id === prodId);
            if(!existingProduct){
                throw new Error('the product you are trying to remove does not exist')
            } else{
                if(existingProduct.quantity > 1){
                    const updatedQuantity = existingProduct.quantity - 1
                    await CartsModel.updateOne(
                        {_id: cartId, 'products._id': prodId},
                        {$set: {'products.$.quantity': updatedQuantity}}
                    );
                } else{
                    await CartsModel.findOneAndUpdate(
                        {_id: cartId},
                        {$pull: {products: {_id: prodId}}},
                    );
                };
            };
            const cartUpdate = await CartsModel.findById(cartId)
            return cartUpdate
        } catch (error) {
            console.log(error)
        };
    };
};