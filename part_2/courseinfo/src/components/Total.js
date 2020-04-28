import React from "react";

const Total = ({ parts }) => (
  <div>
    <strong>
      Total of{" "}
      {parts.reduce((total, current) => {
        return (total += current.exercises);
      }, 0)}{" "}
      exercises
    </strong>
  </div>
);

export default Total;
