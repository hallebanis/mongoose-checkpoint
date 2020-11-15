const mongoose=require('mongoose')
const validator=require('validator')

const personSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate:/[a-z]/
    },
    age:{
        type:Number,
        min:8
    },
    location:{
        type:String,
        enum:['Tunisia','Algeria','Morocco'],
        default:'Tunisia'
    },
    favoriteFoods :{
        type:[String]
    }
})
module.exports=mongoose.model('Person',personSchema)