const {Product} = require('../helpers/classes');
const productDB = require('./db.js');
const table = 'products';
const {ProductModel} = require('../../Database/mongodb');

const productCRUD = {
    create: async(req, res)=>{
        try{
            const savedProduct = await productDB.insert(req.body);

            res.status(200).json({message:`Producto id:'${savedProduct._id}' creado...`, data:savedProduct})
        }catch(err){
            console.log(err)
        }
    },

    list: async(req, res)=>{
        let queriedId = req.params.id;
        if(queriedId){
            try{
                const productId = req.params.id;
                const showProduct = 
                showProduct == undefined ? res.status(400).json({err:`Product ${productId} does not exist`}) : res.status(200).json({data:showProduct})
            }catch(err){
                res.status(400).json({err:err})
            }
        }
        else{
            let productos = await ProductModel.find({})
            try{
                if(productos.length == 0){
                    return res.status(400).json({error:'No hay productos para mostrar'})
                }else{
                    return res.status(200).json({data:productos})
                }
            }catch(err){
                console.log(err)
                res.status(400).json({err:err})
            }
        }
    },
    erase: async(req, res)=>{
        const {id} = req.params;
        try{
            let deleteItem = await ProductModel.deleteOne({_id:id});
            if(deleteItem){
                res.status(200).json({message:`Producto ${id} eliminado correctamente...`})
            }else{
                res.status(500).json({message:`Producto ${id} no fue encontrado...`})
            }

        }catch(err){
            res.status(400).json({err:err})
        }
    },
    update: async(req, res)=>{
        try{
            const {id} = req.params;
            const productIndex = await productDB.readOne(table, id);
            const productAttributes = Object.entries(req.body);
            productAttributes.forEach(async(x)=>{
                let attr = x[0];
                let newValue = x[1];
                if(x !== null){
                    await productDB.update(table, id, attr, newValue )
                }
            })

            const newQuery = await productDB.readOne(table, id);
            res.status(200).json({before:productIndex, after:newQuery })
        }catch(err){
            res.status(400).json({error: err})
        }
    }

}

module.exports=productCRUD;