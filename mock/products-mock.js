const getFakeProduct = require('../mock/generador')

const productMocker = async(req, res)=>{
    let cant = req.params.cant || 10;
    if(cant >0){
        const products = [];
        for(let i = 0; i<cant; i++){
            let product = await getFakeProduct()
            product.id = i+1;
            products.push(product)
        }
        let toRender = products.map(product=>({
            id:product.id,
            title:product.productName,
            price:product.price,
            thumbnail:product.image
        }))
        res.render('main', {products:toRender, exist:true})
    }else{
        res.render('main', { exist:false})

    }
}

module.exports = productMocker;