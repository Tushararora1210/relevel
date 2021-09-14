const Post=require('../models/Post');
const Answer=require('../models/Answer');
const mongoose=require('mongoose');
const addPost = (req, res) => {
    //addPost api logic here
    const {Question,Listoftopics,Visibility}=req.body();
    if(!Question || !Listoftopics || !Visibility)
    {
       return res.status(422).json({error:"Please Provide all the mandatory information"});
    }
    const newpost=new Post({
        Question,Listoftopics,Visibility,Author:req.user
    });
    newpost.save()
    .then(()=>{
        return res.status(200).json({message:"Post Saved Successfully"});
    })
    .catch((err)=>{
        return res.status(422).json({error:"Sorry Unable to save post"});
    })
    

};

const updatePost = (req, res) => {
    //updatePost api logic here
    const {postid,Question,Listoftopics,Visibility}=req.body();
    if(!postid)
    {
        return res.status(404).json({error:"Post with the following id not found"});   
    }
    if(!Question && !Listoftopics && !Visibility)
    {
        return res.status(422).json({error:"No information is Provided for Updation"});
    }
    const update={}
    if(Question)
    {
        update.Question=Question;
    }
    if(Listoftopics)
    {
        update.Listoftopics=Listoftopics;
    }
    if(Visibility)
    {
        update.Visibility=Visibility;
    }
    Post.findOneAndUpdate({_id:postid,update})
    .then(()=>{
        return res.status(200).json({message:"Post Updated Successfully"});
    })
    .catch(err=>{
        return res.status(422).json({error:"Unable to Update Post"})
    })

};

const deletePost = (req, res) => {
    //deletePost api logic here
    const postid=req.params.id;
    Post.find({_id:postid})
    .then((posts)=>{
        if(!posts.length)
        {
            return res.status(404).json({error:"Post with the following id not found"});
        }
        const foundpost=posts[0];
        if(foundpost.author===req.user)
        {
            foundpost.remove()
            .then(()=>{
                return res.status(200).json({message:"Post deleted Successfully"});
            })
            .catch((err)=>{
                return res.status(422).json({error:"Unable to delete Post"});
            })
        }
        else
        {
            return res.status(401).json({error:"You are not authorised to delete the post"});
        }
    })
};

const getPost = (req, res) => {
    //getPost api logic here
    const postid=req.params.id;
    Post.findOne({_id:postid})
    .then((post)=>{
        return res.status(200).json({foundpost:post});
    }
    .catch((err)=>{
        return res.status(404).json({error:"Unable to Find Post with the following id"});
    })
};

const upvotePost = (req, res) => {
    //upvotePost api logic here
    const {postid}=req.body;
    Post.update({_id:postid},{$addToSet:{Upvotes:req.user} })
    .then(()=>{
        return res.status(200).json({message:"Post Upvoted Successfully"});
    })
    .catch((err)=>
    return res.status(422).json({error:"Unable to Upvote Post "});
    )
    
};

const downvotePost = (req, res) => {
    //const addNotesLabel api logic here
    const {postid}=req.body;
    Post.update({_id:postid},{$pull:{Upvotes:req.user} })
    .then(()=>{
        return res.status(200).json({message:"Post Downvoted Successfully"});
    })
    .catch((err)=>
    return res.status(422).json({error:"Unable to Downvote Post "});
    )
   
    
};

const addAnswerToPost = (req, res) => {
    //const addAnswerToPost api logic here
    const {postid,answertext}=req.body;
    const answertopost=new Answer({answerto:postid,answertext,answeredby:req.user});
    answertopost.save()
    .then((savedanswer)=>{
        Post.update({_id:postid},{$push:{Answers:savedanswer}})
    .then(()=>{
        return res.status(200).json({message:"Answer added successfully"});
    })
    .catch((err)=>
    return res.status(422).json({error:"Unable to add answer "});
    )
    })
    .catch((err)=>{
        return res.status(422).json("Unable to Create Answer for the post");
    })
};

const PostController = {
    addPost,
    updatePost,
    deletePost,
    getPost,
    upvotePost,
    downPost,
    addAnswerToPost
};

module.exports = PostController;