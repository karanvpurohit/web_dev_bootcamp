import express from "express";
import bodyParser from "body-parser";
import { render } from "ejs";
import morgan from "morgan"

const app = express();
const port = 3000;


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs")
});

app.post("/submit", (req, res) => {
  // console.log(req.body)
  var nameLength  = req.body.fName.length + req.body.lName.length
  console.log(nameLength)
  res.render("index.ejs", {nameLength})
 });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
