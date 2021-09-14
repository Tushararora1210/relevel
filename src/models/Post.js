//Post Model
const mongoose=require('mongoose');
const User=require('./User');
const Topic=require('./Topic');
const Answer=require('./Answer');
const PostSchema=new mongoose.Schema({
   Question:{type:String,required:true,trim:true},
   Author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
   Listoftopics:[{type:String}]
   Visibility:{type:String,required:true,enum:["Public","Limited"]},
   createdAt: {type: Date, default: Date.now},
   Upvotes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
   Downvotes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
   Answers:[{type:mongoose.Schema.Types.ObjectId,ref:'Answer'}]
})

const Post=mongoose.model('Post',PostSchema);
module.exports=Post;