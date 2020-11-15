const dotenv = require('dotenv');
const mongoose=require('mongoose')
const PersonModel=require('./modules/persons')
dotenv.config()

function displayDb(err,doc){
    if(err){
        console.error(err);
        return
    }
    console.log(doc);
}


mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err){
        console.log(err)
    }
    console.log('connected')
})

//1- Add a new Peronne
const person=new PersonModel({
    name:'Fourat',
    age:'32',
    favoriteFoods:['Couscous','Milk']
})

person.save() 

//2- add a group of person

PersonModel.create(
    {
        name: 'Yassine',
        age: 28,
        location:'Algeria',
        favoriteFoods:['Pizza','Cousous','Tacos','Nachos','cake']
    },
    {
        name: 'Moez',
        age: 26,
        location:'Tunisia',
        favoriteFoods:['Pizza','Cousous','Tacos','Apple Pie']
    },
    {
        name: 'Foued',
        age: 26,
        location:'Tunisia',
        favoriteFoods:['Tacos','fruit','cake']
    },
    {
        name: 'Lina',
        age: 10,
        favoriteFoods:['Orange','Bread','Toaste']
    },
    {
        name: 'Fourat',
        age: 18,
        location:'Morocco',
        favoriteFoods:['Pizza']
    },
    {
        name: 'Yasmine',
        age: 49,
    },

)

//3- Find a given name
PersonModel.find({name:'Fourat'},(err,doc)=>{
    if(err){
        console.error(err);
        return
    }
    console.log(doc);
})

//4- Find just one person which has a certain food in the person's favorites
PersonModel.findOne({favoriteFoods:'Pizza'},(err,doc)=>{
    if(err){
        console.error(err);
        return
    }
    console.log(doc);
})

//5- Find the (only!!) person having a given _id

PersonModel.findById('5fafffdadf8e423674c8a6d4',(err,doc)=>{
    if(err){
        console.error(err);
        return
    }
    console.log(doc);
})

//6- Perform Classic Updates by Running Find, Edit, then Save

PersonModel.findById('5fafffdadf8e423674c8a6d4',(err,person)=>{
    if(err){
        console.error(err);
        return
    }
    person.favoriteFoods.push('Hambourger')
    person.save()
    
})

//7- Perform New Updates on a Document Using model.findOneAndUpdate()
PersonModel.findOneAndUpdate({name:'Foued'},{age:20},{new:true},(err,doc)=>displayDb(err,doc))

//8- Delete One Document Using model.findByIdAndRemove
PersonModel.findByIdAndRemove('5fb0004b03187130a0881d0f',(err,doc)=>{
    displayDb(err,doc)
})

//9- Delete Many Documents with model.remove()
const query=PersonModel.remove({name:'Fourat'})
query.exec((err,docs)=>{
    if(err){
        console.error(err)
        return
    }
    console.log(docs.deletedCount," document(s) deleted")})

//10 -Chain Search Query Helpers
PersonModel.find({favoriteFoods:'Tacos'})
.sort({name:1})
.limit(2)
.select({age:0})
.exec((err,doc)=>displayDb(err,doc))

