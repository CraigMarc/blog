var express = require('express');
var router = express.Router();
const user_controller = require("../controllers/usersController");


/// User ROUTES ///


// GET all posts.
router.get("/posts/", user_controller.all_posts_get);

// GET request for single post. 
router.get("/posts/:postId", user_controller.single_post_get);

// POST new message.
router.post("/posts/", user_controller.create_post);


// DELETE message. 
router.delete("/posts/:postId", user_controller.delete_post);

// PUT publish post

router.put("/publish/:postId", user_controller.publish_post);

//delete comment

router.delete("/comments/:commentId", user_controller.comments_delete);

module.exports = router;
