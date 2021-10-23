const {mariaDB, sqLite3} = require('../../Database/db_config.js')
const db = require('knex');
const {ProductModel, MessageModel} = require('../../Database/mongodb');

const productDB = {
    insert: async(table, data)=>{
        if(table=='products'){
            const {title, price, thumbnail} = data;
            const newProduct = {title:title, price:price, thumbnail:thumbnail};
            let save = await new ProductModel(newProduct) 
            saveInMongo = await save.save();
            return save
        }else{
            const {userId, message, userName, date} = data;
            const newMessage = {userId: userId, msg:message, userName: userName, date:date};
            let save = await new MessageModel(newMessage);
            saveInMongo = await save.save();
            return save
        }
    },

    readAll: async(table)=>{
        let result = table == 'products' ?  ProductModel.find({}) : MessageModel.find({});
        return await result
    },

    readOne: async(table, elementId)=>{
        let useDB = table=='products' ? mariaDB : sqLite3;
        return db(useDB)(table)
        .select("*")
        .where('id', elementId)
        .first()
    },
    delete: async(table, elementId)=>{
        let useDB = table=='products' ? mariaDB : sqLite3;
        return db(useDB)(table)
        .where({id:elementId})
        .del()
    },
    update: async(table, id, attr, value)=>{
        let useDB = table=='products' ? mariaDB : sqLite3;
        await db(useDB)(table)
        .where({id:id})
        .update(attr, value)
    }
}

module.exports= productDB;