const express = require("express");
const router = express.Router();

// Require controller modules.
const nonUser_controller = require("../controllers/nonUserController");
const auth_controller = require("../controllers/authController");

/// NonUser ROUTES ///


// Get all published posts

router.get("/published", nonUser_controller.all_published_posts_get);

// GET all comments.
router.get("/comments/", nonUser_controller.all_comments_get);

//add commment to post

router.post("/comments/", nonUser_controller.comments_create);

// login 

router.post("/login/", auth_controller.log_in);


module.exports = router;
