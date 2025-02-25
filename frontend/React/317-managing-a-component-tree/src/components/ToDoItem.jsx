import React, { useState } from "react";

function ToDoItem(props) {
  const [isDone, setIsDone] = useState(false);

  function toggleStrike() {
    setIsDone((prevValue) => !prevValue);
  }

  return (
    // <li style={isDone ? {textDecoration: "line-through"} : {}} data-index={props.index} onClick={toggleStrike}>{props.item}</li>
    <li
      onClick={() => {
        props.onComplete(props.id);
      }}
    >
      {props.item}
    </li>
  );
}

export default ToDoItem;
