const express = require('express');
const productDB = require('../Controllers/db.js');
const appRouter = express.Router();
const productCRUD = require('../Controllers/products_crud.js');
const productMocker = require('../../mock/products-mock')

appRouter.get('/home', async(req, res)=>{
    const productos = await productDB.readAll('products');
    let toRender = productos.map(x=>({
        id:x.id,
        title:x.title,
        price:x.price,
        thumbnail:x.thumbnail
    }))
    try{
    if(productos.length != 0) {
        res.render('main', {products: toRender, exist:true})
    }else{
        res.render('main', {exist:false})
    }
    }catch(err){
        res.status(400).json({error:err})
    }
})

appRouter.get('/productos/vista-test/:cant?', productMocker)

appRouter.get('/productos/listar/:id?', productCRUD.list);

appRouter.post('/productos/guardar', productCRUD.create);

appRouter.delete('/productos/delete/:id', productCRUD.erase)

appRouter.put('/productos/update/:id', productCRUD.update)


module.exports = {appRouter}