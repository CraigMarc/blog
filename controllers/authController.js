const Comments = require("../models/comments");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user");

/*
passport.use(JwtStrategy);
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY; //normally store this in process.env.secret

new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.email === "c@yahoo.com") {
        return done(null, true)
    }
    return done(null, false)
}) */

/*
exports.log_in = asyncHandler(async (req, res, next) => {
//exports.log_in = (req, res) => {
    let { email, password } = req.body;
    try {
        let userDb = await User.find({'userName': email}).exec()
        //res.status(200).json(userDb)
        console.log(userDb)
      } catch (error) {
        res.status(500).json({ message: error });
      }
      
    //This lookup would normally be done using a database
    if (email === "c@yahoo.com") {
        if (password === "pass") { //the password compare would normally be done using bcrypt.
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
    return res.status(401).json({ message: "Auth Failed" })
})
*/

exports.log_in = asyncHandler(async (req, res, next) => {
    //exports.log_in = (req, res) => {
    let { email, password } = req.body;
    try {
        let userDb = await User.find({ 'userName': email }).exec()
        //res.status(200).json(userDb)
        console.log(userDb)

        if (userDb[0].userName === "c@yahoo.com") {
            if (userDb[0].password === "123456") { //the password compare would normally be done using bcrypt.
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
        res.status(500).json({ message: error });
    }
/*
    //This lookup would normally be done using a database
    if (email === "c@yahoo.com") {
        if (password === "pass") { //the password compare would normally be done using bcrypt.
            const opts = {}
            opts.expiresIn = 1200;  //token expires in 2min
            const secret = process.env.SECRET_KEY
            const token = jwt.sign({ email }, secret, opts);
            return res.status(200).json({
                message: "Auth Passed",
                token
            })
        }
    }*/
    return res.status(401).json({ message: "Auth Failed" })
})



