const mongoose = require('mongoose');

const Schema = {
    product:  new mongoose.Schema({
        title: {type:String, required:true, max:[100, 'Max length is 100 characters']},
        price: {type: Number, require:true},
        thumbnail:{type:String},
    }),
    message:  new mongoose.Schema({
        userId:String,
        msg:String,
        userName:String,
        date:String
    })
      
}     
module.exports = Schema;