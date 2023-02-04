const express = require('express')
const router = express.Router()
const {createCustomer} = require('../controllers/customerController')
const {createOrder} = require('../controllers/orderController')

router.get('/test', function(req,res){
    res.status(200).send({status:true,message:"running perfectly"})
})

router.post('/registerUser',createCustomer)
router.post('/createOrder',createOrder)


module.exports = router