import React from "react";

const Persons = ({ persons, filter }) => (
  <ul>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map((filteredPerson) => (
        <li key={filteredPerson.name}>
          {filteredPerson.name} - {filteredPerson.number}
        </li>
      ))}
  </ul>
);

export default Persons;
