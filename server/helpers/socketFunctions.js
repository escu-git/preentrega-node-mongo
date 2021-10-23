const productDB = require('../Controllers/db.js');
const {ProductModel} = require('../../Database/mongodb');
const { Product } = require('./classes.js');
const collection = 'messages';
let messageHistory=[];

async function manageNewProduct(data, socket){
    const{title, price, thumbnail}=data;
    const newProduct = new Product(title, price, thumbnail);
    let lastId = await ProductModel.count({})
    newProduct.productId(lastId);
    const save = await new ProductModel(newProduct);
    await save.save();
    const allProducts = await ProductModel.find()
    socket.emit('sentProduct', allProducts);
}

//Function to manage new message coming from online chat.
async function manageNewMessage(msg, socket, io){
    const date = new Date().toLocaleDateString('es-AR');
    const messageData ={
        userId:socket.id,
        message:msg.msg,
        userName:msg.user,
        date:date.toString(),
    }
    await productDB.insert(collection, messageData)
    messageHistory = await productDB.readAll(collection);
    io.sockets.emit('showMessage', messageHistory)
}

async function persistentHistory(socket){
    try{
        let chat = await productDB.readAll(collection)
        messageHistory = chat;
        socket.emit('showMessage', messageHistory)
    }catch(err){
        console.log(err)
    }
}

module.exports={manageNewProduct, manageNewMessage, persistentHistory}