import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// let quiz = [
//   { country: "France", capital: "Paris" },
//   { country: "United Kingdom", capital: "London" },
//   { country: "United States of America", capital: "New York" },
// ];


const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: 'admin',
  port: '5432'
});

db.connect();

let quiz = []
const dbquery = "SELECT capitals.id, capitals.country, capitals.capital, flags.flag FROM capitals INNER JOIN flags ON flags.name = capitals.country;"
db.query(dbquery, (err, res) => {
  if(err){
    console.log("Error in query" + err)
  }else{
    quiz = res.rows
  }
  db.end();
})

let totalScore = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalScore = 0;
  await nextQuestion();
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalScore++;
    console.log(totalScore);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalScore,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  console.log(randomCountry);
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
