import express from "express";

const app = express();
const port = 3000;
var options = {};

// app.set('views', './views');
// app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// app.get("/", (req, res) => {
//     checkDays();
//     console.log(options);
//     res.render("index", {options});
// });

app.get("/", (req, res) => {
    checkDays()
  res.render("index2.ejs", {
    options: "Weekday",
    advise: "it's time to work hard!",
  });
});

function checkDays() {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  options.day = weekday[new Date().getDay()];
  console.log(options.day);
  if (["Saturday", "Sunday"].includes(options.day)) {
    options.day_type = "Weekend";
    options.message = "It's time to have fun!";
  } else {
    options.day_type = "Weekday";
    options.message = "It's time to work hard!";
  }
}
