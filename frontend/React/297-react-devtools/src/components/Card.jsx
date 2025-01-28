import React from "react";
import Top from "./Top";
import Bottom from "./Bottom";

function Card(props) {
  return (
    <div className="card">
      <Top name={props.name} img={props.img} number={props.number} />
      <Bottom tel={props.tel} email={props.email} />
    </div>
  );
}

export default Card;
