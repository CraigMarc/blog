const Comments = require("../models/comments");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");
//const jwtStrategry  = require("./strategies/jwt")

const JwtStrategy = require("passport-jwt").Strategy;
passport.use(JwtStrategy);
// get all comments
/*
exports.log_in = asyncHandler(async (req, res, next) => {

 res.send('not done')
  
});*/
/*
exports.log_in = (req, res) => {
    let { email, password } = req.body;
    console.log(email)
    console.log(password)
    //This lookup would normally be done using a database
    if (email === "c@yahoo.com") {
        if (password === "pass") { //the password compare would normally be done using bcrypt.
            opts.expiresIn = 120;  //token expires in 2min
            const secret = "SECRET_KEY" //normally stored in process.env.secret
            const token = jwt.sign({ email }, secret, opts);
            return res.status(200).json({
                message: "Auth Passed",
                token
            })
        }
    }
    return res.status(401).json({ message: "Auth Failed" })
};*/
exports.log_in = (req, res) => {
    let { email, password } = req.body;
    //This lookup would normally be done using a database
    if (email === "c@yahoo.com") {
        if (password === "pass") { //the password compare would normally be done using bcrypt.
            const opts = {}
            opts.expiresIn = 120;  //token expires in 2min
            const secret = "SECRET_KEY" //normally stored in process.env.secret
            const token = jwt.sign({ email }, secret, opts);
            return res.status(200).json({
                message: "Auth Passed",
                token
            })
        }
    }
    return res.status(401).json({ message: "Auth Failed" })
}