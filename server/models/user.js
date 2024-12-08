const mongoose=require('mongoose')

const BlogUserScheme=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    image:{type:String},
    password:{type:String,required:true}, 
    likedpost:{type:Array}, 
    // drafts:{type:Array}

},{timestamps:true})

module.exports=mongoose.model('BlogUser',BlogUserScheme)