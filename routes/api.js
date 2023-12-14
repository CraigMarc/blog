const express = require("express");
const router = express.Router();

// Require controller modules.
const comments_controller = require("../controllers/commentsController");
const posts_controller = require("../controllers/postsController");


/// Catagory ROUTES ///

// GET all messages.
router.get("/posts/", posts_controller.all_posts_get);

// Get all published posts

router.get("/published", posts_controller.all_published_posts_get);


// GET request for sign up. 
router.get("/posts/:postId", posts_controller.single_post_get);

// POST new message.
router.post("/posts/", posts_controller.create_post);


// DELETE message. 
router.delete("/posts/:postId", posts_controller.delete_post);

// PUT edit message

router.put("/posts/:postId", posts_controller.edit_post);

//get comments for post

//router.get("/", comments_controller.all_comments_get);

//add commment to post

//router.get("/", comments_controller.all_comments_get);

//delete comment



module.exports = router;