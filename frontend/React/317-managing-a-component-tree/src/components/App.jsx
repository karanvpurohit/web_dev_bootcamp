import React, { useState } from "react";
import ToDoItem from "./ToDoItem";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem(event) {
    (event.key === "Enter" || event.type === "click") && addItemtoList();
  }

  function addItemtoList() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  function deleteItem(id) {
    console.log(id);
    setItems((prevItems) => {
      return prevItems.filter((item, i) => i !== id);
    });
  }

  // function toggleLineThrough(event) {
  //   var isLineThrough = event.target.style.textDecoration;
  //   const index = event.target.dataset.index
  //   event.target.style.textDecoration = (isLineThrough == 'line-through' ? null : 'line-through' )
  //   // const element = event.target;
  //   // element.classList.toggle("line-through");
  // }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          onChange={handleChange}
          onKeyDown={addItem}
          type="text"
          value={inputText}
        />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              item={todoItem}
              onComplete={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
