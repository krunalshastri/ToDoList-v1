//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");
// console.log(date());

let items = [];
let workItems = [];
const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res)
{
  let today_day = date.getDate();
  res.render("list",{listTitle : today_day , upcomingItem : items});
});

app.post("/",function(req,res)
{
  // console.log(req.body);
  let item = req.body.newItem;4

  if(req.body.list === "Work")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else 
  {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function(req,res)
{
  res.render("list",{listTitle: "Work List", upcomingItem: workItems});
});

app.post("/work",function(req,res)
{
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () 
{
  console.log("Server is running on port 3000.");
});