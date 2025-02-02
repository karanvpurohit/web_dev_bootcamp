import React from "react";
import Login from "./Login";

var isLoggedIn = false;
const currentTime = new Date().getHours();
function App() {
  return (
    <div className="container">
      {(isLoggedIn && currentTime > 12) ? <h1>Hello</h1> : <Login />}x
    </div>
  );
}

export default App;
