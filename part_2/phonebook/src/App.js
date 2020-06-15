import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import Form from "./components/Form";
import Persons from "./components/Persons";
import dbService from "./services/db";

const App = () => {
  const [persons, setPersons] = useState([]);
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

  const addRecordHandler = async (record) => {
    dbService.addOne(record)
      .then((response) =>
      setPersons(persons.concat(response))
    );
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
      : persons.find((person) => person.number === newNumber)
      ? alert(`${newNumber} is already in the book!`)
      : addRecordHandler({
          name: newName,
          number: newNumber,
        });
  };

  useEffect(() => {
    dbService.getAll().then((people) => setPersons(people));
  }, []);

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
