const exp = require("express");
const app = exp.Router();
const asyncHandler = require("express-async-handler");
app.post(
  "/createuser",
  asyncHandler(async (req, res, next) => {
    data = req.body;
    console.log(data);
    empObj = req.app.get("empObj");
    dbObj = req.app.get("dbObj");
    console.log(data);
    suc = await dbObj.collection("emp").insertOne(data);
    res.send({ message: "Success" });
  })
);
app.get(
  "/getAge/:name/:age",
  asyncHandler(async (req, res, next) => {
    empObj = req.app.get("empObj");
    let age = +req.params.age;
    let manName = req.params.name;
    data = await empObj
      .find({
        "employees.age": { $gt: age },
      })
      .project({ "employees.name": 1 })
      .toArray();
    res.send({ message: data });
  })
);
app.get(
  "/getdata",
  asyncHandler(async (req, res) => {
    empObj = req.app.get("empObj");
    data = await empObj.find().toArray();
    res.send({ message: data });
  })
);
app.post(
  "/postdata",
  asyncHandler(async (req, res) => {
    // console.log(JSON.parse(JSON.stringify(req.body)));
    res.send({ message: "Success" });
  })
);
module.exports = app;
