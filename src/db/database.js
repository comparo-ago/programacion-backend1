import mongoose from 'mongoose'

const conectionString = 'mongodb+srv://admin:A34990151m@cluster0.tjkz8k7.mongodb.net/?retryWrites=true&w=majority'
try {
    await mongoose.connect(conectionString)
    console.log('Conectado a Mongoose')
} catch (error) {
    console.log(error)
}