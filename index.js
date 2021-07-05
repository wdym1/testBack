const exp = require("express");
const app = exp();
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const upload = multer();
app.use(exp.json());
app.use(upload.array());
app.use(exp.static("public"));
const mc = require("mongodb").MongoClient;

const url = `mongodb+srv://user:${process.env.PASSWORD}@cluster0.thkxa.mongodb.net/MockHack?retryWrites=true&w=majority`;
let dbObj;
mc.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, suc) => {
    if (err) {
      console.log("Databse connection error ", err);
    } else {
      dbObj = suc.db("MockHack");
      app.set("dbObj", dbObj);
      app.set("empObj", dbObj.collection("emp"));
      console.log("Database connection successful");
    }
  }
);

const userApi = require("./apis/user.js");
app.use("/user", userApi);
app.use((req, res, next) => {
  res.send({ message: "Invalid Path" });
});
app.use((err, req, res, next) => {
  res.send({ message: "Error", error: err.message });
});
const portNo = 5000;
app.listen(portNo, () => {
  console.log("Listening on ", portNo);
});
