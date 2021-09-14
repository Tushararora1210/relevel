require("dotenv").config();
const express = require("express");
const cors = require("cors");
const postRouter=require('./routes/post');
const app = express();

app.use(express.json());
app.use(cors())
app.use(postRouter);

// sample for express server
app.use("/", (req, res, next) => {
  res.status(200).json({ success: true, data: "Start Here" });
});

const PORT = process.env.PORT || 8080; // port at which server listening

app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
);

// fetch all the required routes here
let userRouter = require('./routes/user');

//define root routes here
app.use('/user', userRouter);

