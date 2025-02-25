import React, { useState } from "react";

function InputArea(props) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItemToList() {
    props.onAdd(inputText);
    setInputText("");
  }

  return (
    <div className="form">
      <input
        onChange={handleChange}
        onKeyDown={(event) => event.key === "Enter" && addItemToList()}
        type="text"
        value={inputText}
      />

      <button onClick={() => addItemToList()} disabled={!inputText}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
