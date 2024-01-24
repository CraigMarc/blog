const Game = require("../models/game");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const HighScore = require('../models/highScore')
const CurrentScore = require('../models/currentScore')

// check coords
exports.check_get = asyncHandler(async (req, res, next) => {

  try {
    let character = await Game.findOne({ 'char_name': req.query.char_name, 'pic_name': req.query.pic_name }).exec()

    let xCheck = req.query.x > character.max_x && req.query.x < character.min_x
    let yCheck = req.query.y > character.max_y && req.query.y < character.min_y

    if (xCheck == true && yCheck == true) {
      res.json({ message: true })
    }
    else {
      res.json({ message: false })
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }


});

const getTime = () => {
  const time = new Date

  return time.getTime()
}


exports.start_time = asyncHandler(async (req, res, next) => {
  let time = getTime()


  const currentScore = new CurrentScore({
    user_id: req.query.id,
    start_time: time,

  });

  try {

    //delete records over 3 hours old

    let allScores = await CurrentScore.find()

    for (let i = 0; i < allScores.length; i++) {
      let totalTime = time - allScores[i].start_time

      if (totalTime > 10800000) {
        await CurrentScore.deleteOne({ _id: allScores[i]._id })
      }
    }


    // save current time at start
    await currentScore.save()
    res.status(200).json({ message: "score saved" })
  } catch (error) {
    res.status(500).json({ message: error });
  }

})

exports.end_time = asyncHandler(async (req, res, next) => {

  let time = getTime()


  try {

    const [character, oldScore] = await Promise.all([
      CurrentScore.findOne({ 'user_id': req.query.id }).exec(),
      HighScore.find({ 'pic_name': req.query.pic_name }).sort({ score: -1 }).limit(1),

    ]);

    let totalTime = (time - character.start_time)


    if (oldScore.length == 0 || oldScore[0].score > totalTime) {

      await CurrentScore.findOneAndUpdate({ 'user_id': req.query.id }, { 'score': totalTime }).exec()

      return res.status(200).json({ message: true })
    }
    else {
      await CurrentScore.findOneAndDelete({ 'user_id': req.query.id }).exec()

      return res.status(200).json({ message: false })
    }

  } catch (error) {
    res.status(500).json({ message: error });
  }



})


exports.new_high_score = [

  body("name").trim().escape(),


  async function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }


    try {

      const [newScore, oldScore] = await Promise.all([
        CurrentScore.findOne({ 'user_id': req.body.id }).exec(),
        HighScore.find({ 'pic_name': req.body.pic_name }).sort({ score: -1 }).limit(1)
      ]);

      console.log(req.body.name)
      console.log(oldScore)


      const highScore = new HighScore({
        userName: req.body.name,
        score: newScore.score,
        pic_name: req.body.pic_name

      });

      if (oldScore.length == 0) {
        await highScore.save()
        await CurrentScore.findOneAndDelete({ 'user_id': req.body.id }).exec()

        return res.status(200).json({ message: "new score saved" })
      }



      if (req.body.name == oldScore[0].userName) {
        return res.status(200).json({ message: "username taken" })
      }

      await highScore.save()
      await HighScore.findOneAndDelete({ 'userName': oldScore[0].userName }).exec()
      await CurrentScore.findOneAndDelete({ 'user_id': req.body.id }).exec()

      return res.status(200).json({ message: "new score saved" })
    }

    catch (error) {
      res.status(500).json({ message: error });
    }


  }

]

exports.get_high_score = asyncHandler(async (req, res, next) => {


  try {

    let hs = await HighScore.find({ 'pic_name': req.query.pic_name }).sort({ score: -1 }).limit(1)

    if (hs.length == 0) {
      return res.status(200).json({ message: "no high score" })
    }

    return res.status(200).json(hs)
  } catch (error) {
    return res.status(500).json({ message: error });
  }

})

exports.delete_current = asyncHandler(async (req, res, next) => {


  try {

    await CurrentScore.deleteMany().exec()



    res.status(200).json({ message: 'deleted records' })
  } catch (error) {
    res.status(500).json({ message: error });
  }

})