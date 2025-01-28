import React from "react";
import Detail from "./Detail";

function Bottom(props) {
  return (
    <div className="bottom">
        <Detail info={props.tel} />
        <Detail info={props.email} />
      </div>
  );
}

export default Bottom;
