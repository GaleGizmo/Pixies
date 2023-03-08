const mongoose=require("mongoose")


const cancionSchema=mongoose.Schema({

    title: {type: String, required: true},
    duration: {type: Number, required:true},
   
    credits: [{type:String}]
})

const Cancion=mongoose.model("canciones", cancionSchema)
module.exports=Cancion

