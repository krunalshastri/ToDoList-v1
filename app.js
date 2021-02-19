//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
var vaars = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

var items = [];

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res)
{
  var today_date = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var today_day = today_date.toLocaleDateString("en-US",options);

  res.render("list",{vaar : today_day , upcomingItem : items});
});

app.post("/",function(req,res)
{
  var item = req.body.newItem;
  items.push(item);

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () 
{
  console.log("Server is running on port 3000.");
});