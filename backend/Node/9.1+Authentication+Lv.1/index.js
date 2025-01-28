import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "admin",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let error = "";

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  if(error.length > 0 ){
    res.render("login.ejs", {error: error});
  }
  else{
    res.render("login.ejs");
  }
  
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  const checkResult = await db.query("SELECT * FROM users WHERE email = $1",[username]);
  if(checkResult.rows.length > 0){
    res.send("Email already exists, try logging in.")
  }else{
    const result = await db.query("INSERT into users(email, password) VALUES($1, $2) RETURNING *",[username, password]);  
  }
  console.log(result)
  res.render("/secrets.ejs");
});

app.post("/login", async (req, res) => {
  error = "";
  const username = req.body.username
  const password = req.body.password
  console.log(username)
  console.log(password)
  try{
    const result = await db.query("SELECT * FROM users WHERE email = $1",[username]);
    console.log(result.rows)
    if(result.rows.length !==0){
      if(result.rows[0].password === password){
        res.render("/secrets.ejs");
      }
      else{
        res.send("Invalid credentials.") 
      }
    }
    else{
      res.send("Invalid credentials: email doesn't exist");
    }
  }
  catch(err){
    console.log(err);
    res.redirect("/login");
  }
});

app.get("/secrets", (req, res) => {
  res.render("secrets.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
