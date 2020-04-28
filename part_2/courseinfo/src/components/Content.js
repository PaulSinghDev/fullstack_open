import React from "react";
import Part from "./Part";

const Content = ({ parts }) => (
  <ul>
    {parts.map((part) => {
      return <Part key={part.id} details={part} />;
    })}
  </ul>
);

export default Content;
