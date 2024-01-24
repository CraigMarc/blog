const Game = require("./models/game");
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

async function gameCreate(picName, charName, maxX, minX, maxY, minY) {

    const gameDetail = new Game({

        pic_name: picName,
        char_name: charName,
        max_x: maxX,
        min_x: minX,
        max_y: maxY,
        min_y: minY
    })
    const game = new Game(gameDetail);
    await game.save()


    /*
      const userDetail = {
        userName: "c@yahoo.com",
        password: "123456",
        
      };
     
    
      const user = new User(userDetail);
      await user.save();
  
      */

    console.log('added char');
}
// node addCharacters.js 
// for username and password see api.database.odt wp file

// board 1 ******** wrong coords do not readd get from correct from db

gameCreate("board1", 'wizard', 653, 706, 648, 734)
gameCreate("board1", 'wenda', 1907, 1951, 756, 813)
gameCreate("board1", 'waldo', 1517, 1581, 692, 791)

// board 2

gameCreate("board2", 'wizard', 712, 737, 239, 283)
gameCreate("board2", 'wenda', 1875, 1909, 1445, 1491)
gameCreate("board2", 'waldo', 401, 438, 1607, 1657)


// board 3

gameCreate("board3", 'wizard', 1669, 1712, 524, 579)
gameCreate("board3", 'wenda', 1894, 1930, 994, 1042)
gameCreate("board3", 'waldo', 1394, 1426, 790, 837)

// board 4
gameCreate("board4", 'wizard', 960, 1000, 858, 931)
gameCreate("board4", 'wenda', 1969, 2000, 494, 557)
gameCreate("board4", 'waldo', 1557, 1587, 1332, 1389)