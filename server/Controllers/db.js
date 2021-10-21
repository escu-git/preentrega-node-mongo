const {mariaDB, sqLite3} = require('../../Database/db_config.js')
const db = require('knex');
const {ProductModel} = require('../../Database/mongodb');

const productDB = {
    insert: async(productData)=>{
        const {title, price, thumbnail} = productData;
        const newProduct = {title:title, price:price, thumbnail:thumbnail};
        let saved = await new ProductModel(newProduct) 
        saveInMongo = await saved.save();
        return saved
    },

    readAll: async(table, query)=>{
        let useDB = table=='products' ? mariaDB : sqLite3;
        return db(useDB)(table)
        .select(query)
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