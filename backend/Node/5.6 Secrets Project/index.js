// HINTS:
// 1. Import express and axios
import express, { query } from "express";
import axios from "axios";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async(req, res) => {
    try {
        var url = API_URL + "random";
        console.log(url)
        const result = await axios.get(url);
        console.log(result.data.secret)
        res.render("index.ejs", { secret: result.data.secret, user: result.data.username });
      } catch (error) {
        res.status(500).send(error.message);
      }
});
  
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  