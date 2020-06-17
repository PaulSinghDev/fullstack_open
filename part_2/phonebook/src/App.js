import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import dbService from "./services/db";
import db from "./services/db";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };
  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value);
  };
  const filterChangeHandler = (event) => {
    setNewFilter(event.target.value);
  };

  const removeRecordHandler = (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Are you sure you wish to delete the entry for ${person.name}`)){
      dbService.deleteOne(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNotificationMessage({
            content: `All information related to ${person.name} has been removed from the database.`,
            fail: false
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage({
            content: `It looks as though there has been an error removing ${person.name} from the database`,
            fail: true
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };


  const addRecordHandler = async (record) => {
    dbService
      .addOne(record)
      .then((response) => {
        setPersons(persons.concat(response));
        setNotificationMessage({
          content: `${response.name} was successfully added to the phone book with the number ${response.number}`,
          fail: false,
        });
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setNotificationMessage({
          content: `There seems to have been an error. ${record.name} was not added to the phone book.`,
          fail: true,
        });
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
  };

  const updateRecordHandler = (toUpdate) => {
    if(toUpdate === 'name') {
      let record = {...persons.find((person) => person.name === newName)};
      const message = `${record.name} is already in the phone book. Would you like to update the phone number to ${newNumber}?`;
      if(window.confirm(message)) {
        record.number = newNumber;
        db.updateOne(record)
        .then(response => {
          setPersons(persons.map(person => person.id !== record.id ? person : record));
          setNotificationMessage({
            content: `The number associated with ${response.name} has been changed to ${response.number}`,
            fail: false
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage({
            content: `It looks as though there has been an error. The number for ${record.name} has not been updated.`,
            fail: true
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
      };
    } else {
      let record = {...persons.find((person) => person.number === newNumber)};
      const message = `${record.number} is already in the phone book under the name ${record.name}. Would you like to change the name to ${newName}?`;
      if(window.confirm(message)) {
        record.name = newName;

        db.updateOne(record)
        .then(response => {
          setPersons(persons.map(person => person.id !== record.id ? person : record));
          setNotificationMessage({
            content: `The name associated with the number ${response.number} has been changed to ${response.name}`,
            fail: false
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage({
            content: `It looks as though there has been an error. The name associated with ${record.number} has not been updated.`,
            fail: true
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
      };
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    return !newName
      ? (
        setNotificationMessage({content: 'It looks like you haven\'t entered a name', fail: true}),
        setTimeout(() => setNotificationMessage(null), 5000)
      ) : !newNumber
      ? (
        setNotificationMessage({content: 'It looks like you haven\'t entered a number', fail: true}),
        setTimeout(() => setNotificationMessage(null), 5000)
      ) : persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        )
      ? updateRecordHandler('name')
      : persons.find((person) => person.number === newNumber)
      ? updateRecordHandler('number')
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
      <Notification message={notificationMessage} />
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
      <Persons
        persons={persons}
        filter={newFilter}
        clickHandler={(id) => removeRecordHandler(id)}
      />
    </div>
  );
};

export default App;
