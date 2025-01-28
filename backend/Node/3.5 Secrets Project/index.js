//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser  from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var page = "/public/index.html";
app.use(bodyParser.urlencoded({extended: true}));

function checkPass(req, res, next){
    if( req.body['password'] === "ILoveProgramming"){
        page =  "/public/secret.html"
    }else{
        page = "/public/index.html"
    }
    next();
}

app.use(checkPass);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + page);
});

app.post('/check', (req, res) => {
    // Send HTML response to client with band name
    console.log(req.body);
    res.sendFile(__dirname + page);
});


