import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";

function createEmoji(emo) {
  return (
    <Entry
      key={emo.id}
      emoji={emo.emoji}
      name={emo.name}
      meaning={emo.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map(createEmoji)}
      </dl>
    </div>
  );
}

export default App;
