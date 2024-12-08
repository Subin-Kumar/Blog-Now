const mongoose=require('mongoose')


const BlogcomreplyScheme=new mongoose.Schema({
    
    reply:{type:String},
    
})

const BlogcommentScheme=new mongoose.Schema({
   
    comment:{type:String},
    commentreply:[BlogcomreplyScheme],
})



const BlogBwriScheme=new mongoose.Schema({
    btitle:{type:String,required:true,unique:true},
    bdes:{type:String,required:true},
    image:{type:String},
    btag:{type:Array},
    user:{type:String},
    userimage:{type:String},
    userFullname:{type:String},
    date:{type:String},
    treads:{type:Number},
    tlikes:{type:Number},
    comments:[BlogcommentScheme],
    tparentcomments:{type:Number},
    
    


},{timestamps:true})

module.exports=mongoose.model('BlogBWrite',BlogBwriScheme)