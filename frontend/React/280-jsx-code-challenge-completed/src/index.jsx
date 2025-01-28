//Create a react app from scratch.
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <div>
    {/* It should display a h1 heading. */}
    <h1>My Favourite Foods</h1>
    {/* It should display an unordered list (bullet points). */}
    <ul>
      {/* It should contain 3 list elements. */}
      <li>Daal chawal</li>
      <li>Kheer</li>
      <li>Daal Roti</li>
    </ul>
  </div>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
