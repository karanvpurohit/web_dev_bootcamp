import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // Send an HTML response to the root route
  res.send(`
    <html>
      <head>
        <title>Welcome</title>
      </head>
      <body>
        <h1>Here we meet again</h1>
        <p>Welcome to our application!</p>
      </body>
    </html>
  `);
});

app.get("/about", (req, res) => {
  // Send an HTML response to the about route
  res.send(`
    <html>
      <head>
        <title>About Us</title>
      </head>
      <body>
        <h1>About Us</h1>
        <p>This is a sample About Us page. Our company is dedicated to providing excellent services to our customers.</p>
      </body>
    </html>
  `);
});

app.get("/contact", (req, res) => {
  // Send an HTML response to the about route
  res.send(`
    <html>
      <head>
        <title>Contact me</title>
      </head>
      <body>
        <h1>About Us</h1>
        <p>This is a sample contact page. Our company is dedicated to providing excellent services to our customers.</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
