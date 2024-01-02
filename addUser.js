const User = require("./models/user");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
mongoose.set("strictQuery", false)
const bcrypt = require('bcryptjs')

//database connection
// env variable may need quotes
const mongoDB = process.env.MONGODB_URI

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

async function userCreate(userName, password) {

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    // if err, do something
    if (err) {
      return console.log('Cannot encrypt');
    }
    // otherwise, store hashedPassword in DB
    const userDetail = new User({
      
      userName: userName,
      password: hashedPassword
    })
    const user = new User(userDetail);
    await user.save()
  });

  /*
    const userDetail = {
      userName: "c@yahoo.com",
      password: "123456",
      
    };
   
  
    const user = new User(userDetail);
    await user.save();

    */
    
    console.log('added user');
  }
// node addUser.js 
// for username and password see api.database.odt wp file
  userCreate('username', 'password')