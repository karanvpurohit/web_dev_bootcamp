import express from "express";

const app = express();
const port = 3000;

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


function logger(req, resp, next){
  console.log("request method: " + req.method + " | request URL: " + req.url);
  next();
}