const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3001;
const MONGODB_URI = "mongodb://127.0.0.1:27017/zomatoapi";
const APIRouter = require("./routes/APIRouter");

// enable cors policy
app.use(cors());

// enable incoming post data
app.use(express.json()); // json request
app.use(express.urlencoded({ extended: false }));
// form-data(data + file) or x-www-from-urlencoded (data)

// inject routing in our app
// we "use" => method it's a middleware
// /user , /admin , /
app.use("/api", APIRouter);
console.log("connecting to db...");
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("connected with db");
      console.log("project is running on port ", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
