const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const route = require('./routes/routes')
mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://newdatabase:Gd6tycxuRBETdhM7@ourowncluster.jzinjug.mongodb.net/orderManagement',{
    useNewUrlParser:true
})
    .then(()=>console.log("mongoDb connected"))
    .catch((err)=> console.log(err.message))

app.use('/', route)

app.listen(3000, function(){
    console.log("server is running on post 3000")
})