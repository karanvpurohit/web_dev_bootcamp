import React from "react";
import Avatar from "./Avatar";

function Top(props) {
  return (
    <div className="top">
        <p>{props.number}</p>
      <h2 className="name">{props.name}</h2>
      <Avatar img={props.img} />
    </div>
  );
}

export default Top;
