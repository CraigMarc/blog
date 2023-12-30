const Posts = require("../models/posts");
const Comments = require("../models/comments");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false)
const multer = require("multer"); // For uploading images
const fs = require('fs');

//const upload = multer({ dest: './uploads/' })

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
  }
})
const upload = multer({ storage: storage })



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
exports.create_post = [

  // Handle single file upload with field name "image"
  upload.single("image"),

  body("title").trim().escape(),
  body("text").trim().escape(),

  async function (req, res, next) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }

if (req.file) {
    const post = new Posts({
      title: req.body.title,
      text: req.body.text,
      published: false,
      image: req.file.filename
    });
      try {
        await post.save()
        let allPosts = await Posts.find().exec()
        res.status(200).json(allPosts)
      } catch (error) {
        res.status(500).json({ message: error });
      }
    }
   else {
    const post = new Posts({
      title: req.body.title,
      text: req.body.text,
      published: false,
      
    });
      try {
        await post.save()
        let allPosts = await Posts.find().exec()
        res.status(200).json(allPosts)
      } catch (error) {
        res.status(500).json({ message: error });
      }
   }
    

  }
   
]


// DELETE message. 

exports.delete_post = asyncHandler(async (req, res, next) => {

  try {
    //find pic file
    let picPost = await Posts.findById(req.params.postId);
    
    //delete pic file
    if (picPost.image){
    fs.unlink("./uploads/" + picPost.image, (err) => {
      if (err) {
          throw err;
      }
  
      console.log("Delete File successful.");
  });
}
    //delete post
    await Posts.findByIdAndDelete(req.params.postId);
    //delete comments
    await Comments.deleteMany({ posts_id: req.params.postId })
    let allPosts = await Posts.find().exec()
    res.status(200).json(allPosts)
  } catch (error) {
    res.status(500).json({ message: error });
  }

});



// PUT publish unpublish

exports.publish_post = asyncHandler(async (req, res, next) => {


  let postData = await Posts.findById({ _id: req.params.postId });



  if (postData.published == true) {

    const post = new Posts({
      title: postData.title,
      text: postData.text,
      published: false,
      _id: req.params.postId

    });

    try {
      await Posts.findByIdAndUpdate(req.params.postId, post, {});
      let allPosts = await Posts.find().exec()
      res.status(200).json(allPosts)
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  if (postData.published == false) {

    const post = new Posts({
      title: postData.title,
      text: postData.text,
      published: true,
      _id: req.params.postId

    });

    try {
      await Posts.findByIdAndUpdate(req.params.postId, post, {});
      let allPosts = await Posts.find().exec()
      res.status(200).json(allPosts)
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }


})

// PUT edit post

exports.edit_post = asyncHandler(async (req, res, next) => {


 // let postData = await Posts.findById({ _id: req.params.postId });


  const post = new Posts({
    title: req.body.title,
    text: req.body.text,
    published: req.body.published,
    _id: req.params.postId,
    image: req.params.image
  });

  try {
    await Posts.findByIdAndUpdate(req.params.postId, post, {});
    let allPosts = await Posts.find().exec()
    res.status(200).json(allPosts)
  } catch (error) {
    res.status(500).json({ message: error });
  }





})



//delete comment

exports.comments_delete = asyncHandler(async (req, res, next) => {

  try {
    await Comments.findByIdAndDelete(req.params.commentId);
    let allComments = await Comments.find().exec()
    res.status(200).json(allComments)
  } catch (error) {
    res.status(500).json({ message: error });
  }

});

/*
// add image post

exports.image_post = upload.single("img"), (req, res, err) => { if (err) throw err; res.status(201).send(); }
*/

// delete image

exports.image_delete = asyncHandler(async (req, res, next) => {

try{
//find pic file
let picPost = await Posts.findById(req.params.postId);
    
//delete pic file
if (picPost.image){
fs.unlink("./uploads/" + picPost.image, (err) => {
  if (err) {
      throw err;
  }

  console.log("Delete File successful.");
});
}

// update database

const post = new Posts({
  title: picPost.title,
  text: picPost.text,
  published: picPost.published,
  _id: req.params.postId,
  
});

await Posts.findByIdAndUpdate(req.params.postId, {$unset: { image: ""}});
    let allPosts = await Posts.find().exec()
    res.status(200).json(allPosts)

}
catch (error) {
  res.status(500).json({ message: error });
}


})

// add picture to post

exports.image_post = [

  // Handle single file upload with field name "image"
  upload.single("image"),

  //body("title").trim().escape(),
  //body("text").trim().escape(),

  async function (req, res, next) {
    /*
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }*/

    let picPost = await Posts.findById(req.params.postId);


    const post = new Posts({
      title: picPost.title,
      text: picPost.text,
      published: false,
      _id: req.params.postId,
      image: req.file.filename
    });
    /*
      try {
        await post.save()
        let allPosts = await Posts.find().exec()
        res.status(200).json(allPosts)
      } catch (error) {
        res.status(500).json({ message: error });
      }*/
      try {
        await Posts.findByIdAndUpdate(req.params.postId, post, {});
        let allPosts = await Posts.find().exec()
        res.status(200).json(allPosts)
      } catch (error) {
        res.status(500).json({ message: error });
      }
      }
    
  

   
]

