const mongoose = require("mongoose");
require("dotenv").config();
// const { MONGO_URL } = process.env;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.q7alpti.mongodb.net/chat-app-mern?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log(error));

// mongooose.connect(MONGO_URL, (error) => {
//   if (error) console.log(error);
//   console.log("connected to MongoDB");
// })

// module.exports = mongoose.connection
