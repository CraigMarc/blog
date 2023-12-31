const Comments = require("../models/comments");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user");
const bcrypt = require('bcryptjs')



exports.log_in = asyncHandler(async (req, res, next) => {
    //exports.log_in = (req, res) => {
    let { email, password } = req.body;
    try {
        let userDb = await User.find({ 'userName': email }).exec()
        
        const match = await bcrypt.compare(password, userDb[0].password);
       
        if (userDb[0].userName === email) {
            if (match == true) {
            //if (userDb[0].password === password) { //the password compare would normally be done using bcrypt.
                const opts = {}
                opts.expiresIn = 1200;  //token expires in 2min
                const secret = process.env.SECRET_KEY
                const token = jwt.sign({ email }, secret, opts);
                return res.status(200).json({
                    message: "Auth Passed",
                    token
                })
            }
        }

    } catch (error) {
        res.status(500).json({ message: "wrong username or password" });
    }

    return res.status(401).json({ message: "Auth Failed" })
})

exports.log_out = asyncHandler(async (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/published');
    });
  });



