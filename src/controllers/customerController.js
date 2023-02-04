const customerModel = require('../models/customerModel')

module.exports.createCustomer = async function(req,res){
    try {
        let data = req.body
        if(Object.keys(data).length==0) return res.status(400).send({status:false,message:"body can't be empty"})
        let {title,name,email,phone} = data
    
        if(!title) return res.status(400).send({status:false,message:"Please give title"})
        if(!name) return res.status(400).send({status:false,message:"Please give name"})
        if(!email) return res.status(400).send({status:false,message:"Please give email"})
        if(!phone) return res.status(400).send({status:false,message:"Please give phone"})
    
        let checkUnique = await customerModel.findOne({$or:[{name:name},{email:email},{phone:phone}]})
        
        if(!checkUnique){
            let finalData = await customerModel.create(data)
            return res.status(201).send({message:true,data:finalData})
        }

        if(checkUnique.name == name) return res.status(400).send({status:false,message:"name already exist"})
        if(checkUnique.email == email) return res.status(400).send({status:false,message:"email already exist"})
        if(checkUnique.phone == phone) return res.status(400).send({status:false,message:"phone already exist"})
    } catch (error) {
        return res.status(500).send({message:true,message:error.message})
    }
}