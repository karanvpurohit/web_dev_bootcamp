import React from "react";
import ReactDOM from "react-dom";

const fname = "Karan";
const lname = "Purohit";
const luckyNumber = Math.floor(Math.random() * 9);

const showHtml = (
  <div>
    <h1>Hello {`${fname}  ${lname}`}!</h1>
    <p>Your lucky number is {luckyNumber}</p>
  </div>
);

ReactDOM.render(showHtml, document.getElementById("root"));


// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
