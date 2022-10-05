import mongoose from "mongoose";

const database = () => {
 mongoose
    .connect('mongodb+srv://'
    + process.env.GROUP
    + ':'
    + process.env.PASSWORD
    + '@'
    + process.env.DATABASE
    + '/'
    + process.env.PROJECT
    )
    .then(() => {
        console.log("[server]: Connect to MongoDB");
      })
    .catch((err) => {
    console.log("[server]: Failed to connect to MongoDB", err);
    });
  }

export { database };