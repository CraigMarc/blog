const User = require("./models/user");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
mongoose.set("strictQuery", false)

//database connection
// env variable may need quotes
const mongoDB = process.env.MONGODB_URI

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

async function userCreate(userName, password) {
    const userDetail = {
      userName: "c@yahoo.com",
      password: "123456",
      
    };
   
  
    const user = new User(userDetail);
    await user.save();
    
    console.log('added user');
  }

  userCreate('c@yahoo.com', '123456')