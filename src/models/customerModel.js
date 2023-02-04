const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    title:{
        type:String,
        requred:true,
        enum:["Mr","Mrs","Ms"]
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        default: "regular"
    },
    noOfOrders:{
        type:Number
    },
    moneyBack:{
        type: Number,
        default: 0
    }
},{timestamps:true})

module.exports = mongoose.model('customer', customerSchema)