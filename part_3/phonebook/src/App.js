import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Footer from "./components/Footer";
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
    const person = persons.find((person) => person.id === id);
    if (
      window.confirm(
        `Are you sure you wish to delete the entry for ${person.name}`
      )
    ) {
      dbService
        .deleteOne(id)
        .then((response) => {
          console.log(response);
          setPersons(persons.filter((person) => person.id !== id));
          setNotificationMessage({
            content: `All information related to ${person.name} has been removed from the database.`,
            fail: false,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
          setNotificationMessage({
            content: `It looks as though there has been an error removing ${person.name} from the database`,
            fail: true,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const addRecordHandler = (record) => {
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
        console.log(error);
        setNotificationMessage({
          content: `${error.response.data}`,
          fail: true,
        });
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
  };

  const updateNumber = () => {
    let record = {
      ...persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ),
    };
    const message = `${record.name} is already in the phone book. Would you like to update the phone number to ${newNumber}?`;
    if (window.confirm(message)) {
      record.number = newNumber;
      db.updateOne(record)
        .then((response) => {
          setPersons(
            persons.map((person) => (person.id !== record.id ? person : record))
          );
          setNotificationMessage({
            content: `The number associated with ${response.name} has been changed to ${response.number}`,
            fail: false,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMessage({
            content: `It looks as though there has been an error. The number for ${record.name} has not been updated.`,
            fail: true,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const updateName = () => {
    let record = { ...persons.find((person) => person.number === newNumber) };
    const message = `${record.number} is already in the phone book under the name ${record.name}. Would you like to change the name to ${newName}?`;
    if (window.confirm(message)) {
      record.name = newName;

      db.updateOne(record)
        .then((response) => {
          setPersons(
            persons.map((person) => (person.id !== record.id ? person : record))
          );
          setNotificationMessage({
            content: `The name associated with the number ${response.number} has been changed to ${response.name}`,
            fail: false,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMessage({
            content: `It looks as though there has been an error. The name associated with ${record.number} has not been updated.`,
            fail: true,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const updateRecordHandler = (toUpdate) =>
    toUpdate === "name" ? updateName() : updateNumber();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(newName, newNumber);
    return !newName || newName === undefined
      ? (setNotificationMessage({
          content: "It looks like you haven't entered a name",
          fail: true,
        }),
        setTimeout(() => setNotificationMessage(null), 5000))
      : !newNumber || newNumber === undefined
      ? (setNotificationMessage({
          content: "It looks like you haven't entered a number",
          fail: true,
        }),
        setTimeout(() => setNotificationMessage(null), 5000))
      : persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        )
      ? updateRecordHandler("number")
      : persons.find((person) => person.number === newNumber)
      ? updateRecordHandler("name")
      : addRecordHandler({
          name: newName,
          number: newNumber,
        });
  };

  useEffect(() => {
    dbService.getAll().then((people) => setPersons(people));
  }, []);

  return (
    <div className="phonebook">
      <Notification message={notificationMessage} />
      <h2>Phone Book</h2>

      <div className="filter">
        <h3>Filter Results</h3>
        <Input onChange={filterChangeHandler} type="text" />
      </div>
      <Form
        numberChangeHandler={numberChangeHandler}
        nameChangeHandler={nameChangeHandler}
        submitHandler={submitHandler}
      />
      <div className="list">
        <h3>Phone Numbers</h3>
        <Persons
          persons={persons}
          filter={newFilter}
          clickHandler={(id) => removeRecordHandler(id)}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
