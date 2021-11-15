const mongoose = require('mongoose');
const Schema = require('./Schemas/db.Schema');

async function mongodb(){
    await mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(x=>console.log(`\n***  MongoDB connected...  ***\n`))
}

const ProductModel = mongoose.model('products', Schema.product)
const MessageModel = mongoose.model('messages', Schema.message);
const UserModel = mongoose.model('users', Schema.user)

module.exports = {mongodb, ProductModel, MessageModel, UserModel};