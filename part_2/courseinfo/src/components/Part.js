import React from "react";

const Part = (props) => {
  const { exercises, name } = props.details;

  return (
    <li>
      {name} {exercises}
    </li>
  );
};

export default Part;
