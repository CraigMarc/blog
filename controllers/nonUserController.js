const Comments = require("../models/comments");
const Posts = require("../models/posts");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


   // get all published posts
exports.all_published_posts_get = asyncHandler(async (req, res, next) => {
    
  try {
    let allPosts = await Posts.find({'published': true}).exec()
    res.status(200).json(allPosts)
  } catch (error) {
    res.status(500).json({ message: error });
  }

});


// get all comments

exports.all_comments_get = asyncHandler(async (req, res, next) => {

  try {
    let allComments = await Comments.find().exec()
    res.status(200).json(allComments)
  } catch (error) {
    res.status(500).json({ message: error });
  }
  
});

// get comment for specific post

exports.post_comments_get = asyncHandler(async (req, res, next) => {


  try {
    let postComments = await Comments.find({posts_id: req.params.postId})
    .populate("posts_id")
    .exec()
    res.status(200).json(postComments)
  } catch (error) {
    res.status(500).json({ message: error });
  }
  
});





//create new comment
exports.comments_create =  [

  body("text").trim().escape(),
  body("user").trim().escape(),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }


  const comment = new Comments({
    name: req.body.name,
    text: req.body.text,
    posts_id: req.body.posts_id

  });

  try {
    await comment.save()
    let allComments = await Comments.find().exec()
    res.status(200).json(allComments)
  } catch (error) {
    res.status(500).json({ message: error });
  }
  }
]








