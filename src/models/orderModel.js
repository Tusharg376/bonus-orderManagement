const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const orderSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    userId:{
        type:objectId,
        ref: "customer"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model('order',orderSchema)