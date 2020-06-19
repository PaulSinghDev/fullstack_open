import React from "react";

const Button = ({ type, onClick, text }) => (
  <button onClick={onClick} type={type}>
    {text}
  </button>
);

export default Button;
