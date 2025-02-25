import React, { useState } from "react";

function App() {

  const [listItem, setListItem] = useState("");
  const [list, setList] = useState([]);

  function handleChange(event) {
    setListItem(event.target.value);
  }

  function addItemToList(event) {
    (event.key === 'Enter' || event.type === 'click')  && setItemtoList()
  }

  function setItemtoList(){
    setList([...list, listItem]);
    setListItem("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleChange} onKeyDown={addItemToList} value={listItem}/>
        <button onClick={addItemToList}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
