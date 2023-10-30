const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ProductScheam=new Schema({
    userId: { 
        type:String
     },
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
    image:{
        type:[String]
    },
    date:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:String
    },
    model:{
        type:String
    },
    color:{
        type:String
    },
    number:{
        type:String
    },
    city:{
        type:String
    },
    whatsappNumber:{
        type:String
    }
})
const Product=mongoose.model('product',ProductScheam);
module.exports=Product