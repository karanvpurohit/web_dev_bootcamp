import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "admin",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

app.get("/", async (req, res) => {
  const items = await db.query("SELECT * from items");
  console.log(items.rows)
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items.rows,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  console.log(item)
  // items.push({ title: item });
  await db.query("INSERT into items(title) VALUES($1)", [item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const item = req.body;
  console.log(item)
  await db.query("UPDATE items SET title=$1 WHERE id=$2", [item.updatedItemTitle, item.updatedItemId]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const item = req.body;
  console.log(item)
  await db.query("DELETE FROM items WHERE id=$1", [item.deleteItemId]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
