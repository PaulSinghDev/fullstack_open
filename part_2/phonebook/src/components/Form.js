import React from "react";
import Input from "./Input";
import Button from "./Button";

const Form = (props) => {
  const { nameChangeHandler, numberChangeHandler, submitHandler } = props;
  
  return (
    <form>
      <label>Name: </label>
      <Input onChange={nameChangeHandler} type="text" />
      <label>Number: </label>
      <Input onChange={numberChangeHandler} type="number" />
      <Button onClick={submitHandler} type="submit" text="submit" />
    </form>
  );
};

export default Form;
