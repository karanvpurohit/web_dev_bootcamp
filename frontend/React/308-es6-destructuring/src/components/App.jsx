import React, { useState } from "react";
import cars from "../practice";

function App() {
  // console.log(cars);
  const th = (
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
      <th>Top Colour</th>
    </tr>
  );
  let tr = [];
  cars.map((car) => {
    const { model, coloursByPopularity: [topColor], speedStats: {topSpeed} } = car;
    tr.push(
      <tr id={car.key}>
        <td>{model}</td>
        <td>{topSpeed}</td>
        <td>{topColor}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>{th}</thead>
      <tbody>{tr}</tbody>
    </table>
  );
}

export default App;
