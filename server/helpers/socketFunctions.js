const productDB = require('../Controllers/db.js');
const {ProductModel} = require('../../Database/mongodb')
const table = 'mensajes';
let messageHistory=[];

async function manageNewProduct(data, socket){
    const{title, price, thumbnail}=data;
    const save = await new ProductModel({title:title, price:price, thumbnail:thumbnail});
    await save.save();
    const allProducts = await ProductModel.find({})
    socket.emit('sentProduct', allProducts);
}

//Function to manage new message coming from online chat.
async function manageNewMessage(msg, socket, io){
    const date = new Date().toLocaleDateString('en-GB');
    const messageData ={
        userId:socket.id,
        message:msg.msg,
        userName:msg.user,
        date:date.toString(),
    }
    await productDB.insert(table, messageData)
    messageHistory = await productDB.readAll(table, "*");
    io.sockets.emit('showMessage', messageHistory)
}

async function persistentHistory(socket){
    try{
        let chat = await productDB.readAll(table, "*")
        messageHistory = chat;
        socket.emit('showMessage', messageHistory)
    }catch(err){
        console.log(err)
    }
}

module.exports={manageNewProduct, manageNewMessage, persistentHistory}