const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ProductScheam = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: [String],
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        category: {
            type: String,
        },
        model: {
            type: String,
        },
        number: {
            type: String,
        },
        city: {
            type: String,
        },
        fuelType: {
            type: String,
        },
        gearbox: {
            type: String,
        },
        engine: {
            type: Number,
        },
        isNew: {
            type: String,
        },
        color: {
            type: String,
        },
        year: {
            type: mongoose.Schema.Types.Mixed,
        },
        camera: {
            type: mongoose.Schema.Types.Mixed,
        },
        memory: {
            type: mongoose.Schema.Types.Mixed,
        },
        walk: {
            type: mongoose.Schema.Types.Mixed,
        },
        marka: {
            type: String,
        },
        banType: {
            type: String,
        },
        viewCount:{
            type:Number,
            default:0
        },
        isVip:{
            type:Boolean,
            default:true
        }
    },
    {
        suppressReservedKeysWarning: true, 
    }
);
const Product=mongoose.model('product',ProductScheam);
module.exports=Product