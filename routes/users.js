var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// check protected route

router.get("/protected/", (req, res) => {

  return res.status(200).send("YAY! this is a protected Route")
})

module.exports = router;
