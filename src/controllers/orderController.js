const orderModel = require('../models/orderModel')
const customerModel = require('../models/customerModel')
const mongoose = require('mongoose')

module.exports.createOrder = async function(req,res){
    try {
        let data = req.body
        let {title,description,price,userId} = data   
    
        if(!title) return res.status(400).send({status:false,message:"Please give title"})
        if(!description) return res.status(400).send({status:false,message:"Please give description"})
        if(!price) return res.status(400).send({status:false,message:"Please give price"})
        if(!userId) return res.status(400).send({status:false,message:"Please give userId"})
        
        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"invalid userId"})
        
        let categorycheck = await customerModel.findOne({_id:userId})
        if(!categorycheck)return res.status(400).send({status:false,message:"user not found"})
        
        let orderData = await orderModel.create(data)
    
        let {numberOfOrders,moneyBack} = categorycheck

        if(numberOfOrders<10 || typeof(numberOfOrders) == "undefined") {
            let orderRemaining = (9-numberOfOrders)
            await customerModel.findOneAndUpdate({_id:userId},{$inc:{numberOfOrders:1}})
            return res.status(201).send({status:true,message:`Order placed, you are ${orderRemaining} orders behind to become a gold member and enjoying 10% discount`,orderDetails:orderData})
        }
        if(numberOfOrders>=10 && numberOfOrders<20){
            let orderRemaining = 19-numberOfOrders
            moneyBack = moneyBack+(price*10/100)
            await customerModel.findOneAndUpdate({_id:userId},{$set:{moneyBack:moneyBack,category:"gold"},$inc:{numberOfOrders:1}})
            return res.status(201).send({status:true,message:`Order placed, you are ${orderRemaining} orders behind to become a platinum member and enjoying 20% discount`,orderDetails:orderData})
        }
        if(numberOfOrders>=20){
            moneyBack = moneyBack+(price*20/100)
            await customerModel.findOneAndUpdate({_id:userId},{$set:{moneyBack:moneyBack,category:"platinum"},$inc:{numberOfOrders:1}})
            return res.status(201).send({status:true,message:`20% discount credited to your account`,orderDetails:orderData})
        }
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}