import express from 'express';
import morgan from 'morgan';
import productsRouter from './routes/productsRouter.js'
import cartsRouter from './routes/cartRouter.js'
import Path from './path.js'
import bodyParser from 'body-parser'
import './db/db.js'
import handlebars from 'express-handlebars'
import { errorHandler } from "./middlewares/errorHandler.js";
import messagesSocket from './routes/messagesRouter.js'
import {Server} from 'socket.io'
import CartsDaoMongoDB from './daos/mongodb/messagesDao.js'
const msgDao = new CartsDaoMongoDB();

const app = express();
const port = 8080;
const path = Path

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(path + '/js'))
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', path + '/views')

app.use(errorHandler)
app.use('/products', productsRouter)
app.use('/carts',  cartsRouter)
app.use('/messages', messagesSocket)

const httpServer = app.listen(port, ()=>{
console.log('server ok en port', port)
});

const socketServer = new Server(httpServer)
socketServer.on('connection', async (socket)=>{
    socket.emit('userConect');
    const arrayMsg = await msgDao.getAllMessages();
    socket.emit('arrayMsg', arrayMsg);
    socket.on('newMessage', async (data)=>{
        const userName = data.userName
        const message = data.message
        await msgDao.sendMessage(userName, message);
        const arrayMsgUpdated = await msgDao.getAllMessages();
        socket.emit('arrayMsg', arrayMsgUpdated);
    });
    socket.on('deleteMsg', async (msgId)=>{
        await msgDao.deleteMessage(msgId);
        const arrayMsgUpdatedDel = await msgDao.getAllMessages();
        socket.emit('arrayMsg', arrayMsgUpdatedDel);
    });
    // let arrayProducts = await productsManager.getProducts()
    // socket.emit('arrayProducts', arrayProducts); 
    // socket.on('newProduct', async (obj) => {
    //     try {
    //         const prodValidado = productPropValidator(obj)
    //         if(typeof prodValidado === "object"){
    //             await productsManager.createProducts(obj) 
    //             arrayProducts = await productsManager.getProducts()
    //             socket.emit('arrayProducts', arrayProducts);
    //         }else{
    //             socket.emit('error', prodValidado);
    //         }
    //     } catch (error) {
    //         socket.emit('error', error.message);
    //     }
    // })
    // socket.on('deleteProduct', async (id) => {
    //     await productsManager.deleteProduct(id)
    //     arrayProducts = await productsManager.getProducts()
    //     socket.emit('arrayProducts', arrayProducts);
    // })
});