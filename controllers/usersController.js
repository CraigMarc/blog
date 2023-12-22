const Posts = require("../models/posts");
const Comments = require("../models/comments");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false)



// get all posts

exports.all_posts_get = asyncHandler(async (req, res, next) => {
    

  try {
    let allPosts = await Posts.find().exec()
    res.status(200).json(allPosts)
  } catch (error) {
    res.status(500).json({ message: error });
  }
  
});

// Get single post.
exports.single_post_get = asyncHandler(async (req, res, next) => {
  
 
  try {
   let post = await Posts.findById(req.params.postId).exec()
   res.status(200).json(post)
 } catch (error) {
   res.status(500).json({ message: error });
 }
 
   });

// POST new message.
exports.create_post = asyncHandler(async (req, res, next) => {

    
    const post = new Posts({
      title: req.body.title,
      text: req.body.text,
      published: false,

    });

    try {
      await post.save()
      res.status(200).json(post)
    } catch (error) {
      res.status(500).json({ message: error });
    }

     });



// DELETE message. 

exports.delete_post = asyncHandler(async (req, res, next) => {

  try {
    await Posts.findByIdAndDelete(req.params.postId);
    res.status(200).json({deleted: req.params.postId})
  } catch (error) {
    res.status(500).json({ message: error });
  }

     });

     

// PUT edit message

exports.edit_post = asyncHandler(async (req, res, next) => {

  
    let postData = await Posts.findById({_id: req.params.postId});
    
  
  console.log(postData.published)

  if (postData.published == true) {

  const post = new Posts({
    title: req.body.title,
    text: req.body.text,
    published: false,
    _id: req.params.postId
   
     });

     try {
      await Posts.findByIdAndUpdate(req.params.postId, post, {});
      res.status(200).json({updated: req.params.postId})
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  if (postData.published == false) {

    const post = new Posts({
      title: req.body.title,
      text: req.body.text,
      published: true,
      _id: req.params.postId
     
       });
  
       try {
        await Posts.findByIdAndUpdate(req.params.postId, post, {});
        res.status(200).json({updated: req.params.postId})
      } catch (error) {
        res.status(500).json({ message: error });
      }
    }
     

    })

//delete comment

exports.comments_delete = asyncHandler(async (req, res, next) => {
  
  try {
    await Comments.findByIdAndDelete(req.params.commentId);
    res.status(200).json({deleted: req.params.commentId})
  } catch (error) {
    res.status(500).json({ message: error });
  }

});



    