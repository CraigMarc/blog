const express = require('express');
const router = express.Router();
const game_controller = require("../controllers/gameController");


/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/


/// User ROUTES ///


// GET all posts.
router.get("/", game_controller.check_get);

// get start time

router.get("/start", game_controller.start_time);

// end time

router.get("/end", game_controller.end_time);

// new high score

router.post("/score", game_controller.new_high_score);

// get high score 

router.get("/highscore", game_controller.get_high_score);


// delete all current scores

router.get("/deletecurrent", game_controller.delete_current);


module.exports = router;