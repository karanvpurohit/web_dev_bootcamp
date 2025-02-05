import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");
  const [bgColour, setBgColour] = useState("white");

  function handleOnMouseEnter() {
    setHeadingText("Hovered");
    setBgColour("black");
  }

  function handleOnMouseLeave() {
    setHeadingText("Hello");
    setBgColour("white");
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={{ backgroundColor: bgColour }}
        onMouseLeave={handleOnMouseLeave}
        onMouseEnter={handleOnMouseEnter}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
