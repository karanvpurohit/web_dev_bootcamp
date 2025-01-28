import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: 'admin',
  port: '5432'
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let error = "";
app.get("/", async (req, res) => {
  const result = await checkVisited()
  result.error = error
  error = "";
  res.render("index.ejs", result);
});

app.post("/add", async (req, res) => {
  const validation = await validate(req.body["country"].toLowerCase());
  if(validation.success){
    await db.query("INSERT into visited_countries(country_code) VALUES ($1)", [validation.country_code]);
  }
  else{
    error = validation.errorMessage;
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

async function validate(input) {
  const result = await db.query("SELECT * FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'", [input]);
  if (result.rows.length === 0) return { success: false, errorMessage: "Country doesn't exist."} ;

  if (result.rows.length > 1) return { success: false, errorMessage: "Multiple countries exists starting with given text, please be more specific." };

  const country_code = result.rows[0].country_code
  const exists = await db.query("SELECT * FROM visited_countries WHERE country_code=$1", [country_code]);
  
  if (exists.rows.length !== 0) return { success: false, errorMessage: "Country already added."} ; 
  return {success: true, country_code: country_code} 
}
async function checkVisited(){
  let res = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  res.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return {countries: countries, total: countries.length}
}