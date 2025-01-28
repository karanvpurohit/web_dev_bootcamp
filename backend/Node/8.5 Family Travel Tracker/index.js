import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;
let error = "";

async function checkVisisted() {
  let users = await getAllUsers();
  let currentUser = await getCurrentUser();
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1", 
    [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  };
}
app.get("/", async (req, res) => {
  const result = await checkVisisted();
  result.error = error
  error = "";
  res.render("index.ejs", result);
});
app.post("/add", async (req, res) => {
  const validation = await validate(req.body["country"].toLowerCase());
  if(validation.success){
    await db.query("INSERT into visited_countries(country_code, user_id) VALUES ($1, $2)", [validation.country_code, currentUserId]);
  }
  else{
    error = validation.errorMessage;
  }
  res.redirect("/");
});

app.post("/user", async (req, res) => {
  if(req.body.add === "new"){ 
    res.render("new.ejs"); 
  }else{
    currentUserId = req.body.user
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {  
  currentUserId = await create_user(req.body)
  res.redirect("/");
});

app.listen(port, () => {
});

async function create_user(params) {
  let query = "INSERT into users(name, color) VALUES ($1, $2) RETURNING id"
  const user = await db.query(query, [params.name, params.color]);
  return user.rows[0].id
}

async function getAllUsers() {
  return (await db.query("SELECT * FROM users")).rows 
}

async function getCurrentUser() {
  let user = (await db.query("SELECT * FROM users WHERE users.id = $1", [currentUserId]))
  return user.rows[0]
}


async function validate(input) {
  const result = await db.query("SELECT * FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'", [input]);
  if (result.rows.length === 0) return { success: false, errorMessage: "Country doesn't exist."} ;

  if (result.rows.length > 1) return { success: false, errorMessage: "Multiple countries exists starting with given text, please be more specific." };

  const country_code = result.rows[0].country_code

  const exists = await db.query("SELECT * FROM visited_countries WHERE country_code=$1 AND user_id=$2", [country_code, currentUserId]);
  
  if (exists.rows.length !== 0) return { success: false, errorMessage: "Country already added."} ; 
  return {success: true, country_code: country_code} 
}