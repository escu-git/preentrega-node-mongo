const mongoose = require('mongoose');

const Schema = {
        product:  new mongoose.Schema({
        title: {type:String, required:true, max:[100, 'Max length is 100 characters']},
        price: {type: Number, require:true},
        thumbnail:{type:String},
        id:Number
    }),
    message:  new mongoose.Schema({
        user:{type:Object, required:true},
        userId:{type:String, required:true},
        msg:{type:String, required:true, max:[300, 'Max length is 300 characters']},
        // userName:{type:String, required:true, max:[50, 'Max length is 50 characters']},
        date:{type:String}
    })
      
}     
module.exports = Schema;