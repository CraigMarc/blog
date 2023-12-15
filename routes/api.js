const express = require("express");
const router = express.Router();

// Require controller modules.
const comments_controller = require("../controllers/commentsController");
const posts_controller = require("../controllers/postsController");
const auth_controller = require("../controllers/authController");

/// Catagory ROUTES ///

// GET all posts.
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

// GET all comments.
router.get("/comments/", comments_controller.all_comments_get);

// Get all published posts

//add commment to post

router.post("/comments/", comments_controller.comments_create);

//delete comment

router.delete("/comments/:commentId", comments_controller.comments_delete);

module.exports = router;

// login 

router.post("/login/", auth_controller.log_in);
