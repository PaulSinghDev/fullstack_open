import React from "react";

const List = ({ list, clickHandler }) => (
  <ul>
    {list.map((country, index) => (
      <li key={country.alpha3Code}>
        {country.name}
        <button data-index={index} onClick={clickHandler}>
          Show
        </button>
      </li>
    ))}
  </ul>
);

export default List;
