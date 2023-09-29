const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ProductScheam=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const Product=mongoose.model('product',ProductScheam);
module.exports=Product