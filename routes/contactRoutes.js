const express = require("express");

const router = express.Router();
const Contact = require("../models/Contact");
const controllers = require("../controllers/contactController");

//test routing
router.get("/hello",(req,res)=>{
    res.send("hello routing")

})

//add contact 
router.post("/name",controllers.postContact);


//method get

router.get("/",async(req,res)=>{
    try {
        const result = await Contact.find();
        res.status(200).send({result:result,msg:"geting contacts successfully"})
    } catch (error) {
        res.status(400).send({msg:"can not get contacts"})
    }
})



//method Delete


router.delete('/:id',async(req,res)=>{
    try {
        const result = await Contact.deleteOne({_id:req.params.id});
        result.n ? res.status(200).res.send({response:"user deleted..."})
        :res.status(400).send({msg:"there is no user with this id"})    
    } catch (error) {
        res.status(500).send({msg:"can not delete contact"})
    }
})

//update with ID

router.put("/:id",async(req,res)=>{
    try {
       const result  = await Contact.updateOne({_id:req.params.id},{$set:{...req.body}})
       result.nModified
       ? res.send({message:"user updated..."})
       : res.send({msg:"contact already updated"});
    } catch (error) {
        res.send({msg:"there is no user with this id"})
    }
})





module.exports = router;