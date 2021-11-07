const faker = require('faker');

faker.locale = 'es';

const getFakeProduct = ()=>({
    productName : faker.commerce.productName(),
    price : faker.commerce.price(),
    image: faker.image.image()
})

module.exports = getFakeProduct;