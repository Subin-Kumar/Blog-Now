const mongoose=require('mongoose')

const BlogcommentScheme=new mongoose.Schema({
    
    comment:{type:String},
    commentreply:{type:Array},
   
    
    


},{timestamps:true})

module.exports=mongoose.model('BlogComment',BlogcommentScheme)