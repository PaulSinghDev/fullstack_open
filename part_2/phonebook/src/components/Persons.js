import React from "react";
import dbService from "../services/db";
import Button from "./Button";

const Persons = ({ persons, filter, updatePeople }) => {
  
  const onClickHandler = async (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Are you sure you wish to delete the entry for ${person.name}`)){
      dbService.deleteOne(id)
        .then(() => updatePeople(persons.filter(person => person.id !== id)));
    }
  };

  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((filteredPerson) => (
          <li key={filteredPerson.name}>
            {filteredPerson.name} - {filteredPerson.number}
            <Button
              onClick={() => onClickHandler(filteredPerson.id)}
              type="submit"
              text="Delete"
            />
          </li>
        ))}
    </ul>
  );
};

export default Persons;
