const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const DB_URL = process.env.MONGODB_HOST;

const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//get method to welcome
app.get("/", (req, res) => {
  res.send("Welcome to employee database");
});

//get all employees data
app.get("/employees", async function (req, res) {
  // mongodb Database concept introduced
  try {
    //connect the database
    let client = await mongoClient.connect(DB_URL); //since it is returning the promise, we are puting in try catch async

    //select the db
    let db = client.db("employeeData");

    //select the collection and perform the action
    let data = await db.collection("employees").find().toArray(); //returning the promise we put await, cursor pointer, so toArray

    //close the database
    await client.close();

    res.json(data); //reply with data
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

//search employee record with date
app.post("/employees/searchDate", async function (req, res) {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  // mongodb Database concept introduced
  try {
    //connect the database
    let client = await mongoClient.connect(DB_URL); //since it is returning the promise, we are puting in try catch async

    //select the db
    let db = client.db("employeeData");

    //select the collection and perform the action
    let data = await db
      .collection("employees")
      .find({
        joiningDate: { $gte: startDate, $lte: endDate },
      })
      .toArray(); //returning the promise we put await, cursor pointer, so toArray

    //close the database
    await client.close();

    res.json({ data, message: "search succesful" }); //reply with data
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

//create employee record
app.post("/create-employee", async function (req, res) {
  // mongodb Database concept introduced
  try {
    //connect the database
    let client = await mongoClient.connect(DB_URL); //since it is returning the promise, we are puting in try catch async

    //select the db
    let db = client.db("employeeData");

    //select the collection and perform the action
    let data = await db.collection("employees").insertOne(req.body); //since it is returning the promise we put await

    //close the database
    await client.close();

    res.json({
      message: "employee added sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

//get all department data
app.get("/departments", async function (req, res) {
  // mongodb Database concept introduced
  try {
    //connect the database
    let client = await mongoClient.connect(DB_URL); //since it is returning the promise, we are puting in try catch async

    //select the db
    let db = client.db("employeeData");

    //select the collection and perform the action
    let data = await db.collection("departments").find().toArray(); //returning the promise we put await, cursor pointer, so toArray

    //close the database
    await client.close();

    res.json(data); //reply with data
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

//creating department data
app.post("/create-department", async function (req, res) {
  // mongodb Database concept introduced
  try {
    //connect the database
    let client = await mongoClient.connect(DB_URL); //since it is returning the promise, we are puting in try catch async

    //select the db
    let db = client.db("employeeData");

    //select the collection and perform the action
    let data = await db.collection("departments").insertOne(req.body); //since it is returning the promise we put await

    //close the database
    await client.close();

    res.json({
      message: "department added sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

//start server
app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});
