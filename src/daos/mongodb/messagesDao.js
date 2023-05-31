import {MessagesModel} from './models/messagesModel.js'

export default class MessagesDaoDB{
    async getAllMessages(){
        try {
            const response = await MessagesModel.find({})
            return response
        } catch (error) {
            console.log(error)
        };
    };
    async sendMessage(usName, message) {
        try {
            const newMessage = await MessagesModel.create({userName: usName, msg: message})
            return newMessage
        } catch (error) {
            console.log(error)
        };
    };
    async deleteMessage(msgId) {
        try {
            const delMessage = await MessagesModel.findByIdAndDelete(msgId)
            return delMessage
        } catch (error) {
            console.log(error)
        };
    };
};