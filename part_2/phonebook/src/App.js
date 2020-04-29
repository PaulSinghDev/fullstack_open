import React, { useState } from "react";
import Input from "./components/Input";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };
  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value);
  };
  const filterChangeHandler = (event) => {
    setNewFilter(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    return !newName
      ? alert("You didn't specify a name!")
      : !newNumber
      ? alert("You didn't enter a phone number!")
      : persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        )
      ? alert(`${newName} is already in the book!`)
      : persons.find(
          (person) => person.number === newNumber
        )
      ? alert(`${newNumber} is already in the book!`)
      : setPersons(
          persons.concat({
            name: newName,
            number: newNumber,
          })
        );
  };
  return (
    <div>
      <h2>Phone Book</h2>
      <div>
        <h2>Filter Results</h2>
        <Input onChange={filterChangeHandler} type="text" />
      </div>
      <Form
        numberChangeHandler={numberChangeHandler}
        nameChangeHandler={nameChangeHandler}
        submitHandler={submitHandler}
      />
      <h2>Phone Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
