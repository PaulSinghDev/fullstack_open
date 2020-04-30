import React, { useState, useEffect } from "react";
import axios from "axios";
import Status from "./components/Status";
import List from "./components/List";
import Result from "./components/Result";
import Input from "./components/Input";

const App = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState("Begin typing");
  const [showList, setShowList] = useState(false);
  const [showStatus, setShowStatus] = useState(true);

  const onChangeHandler = (event) => {
    const searchTerm = event.target.value;
    console.log(searchTerm);
    const list = countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );

    setSearch(searchTerm);

    return !searchTerm
      ? (setShowStatus(true),
        setShowList(false),
        setStatus("Begin typing"),
        setSearchResults(list))
      : list.length > 10
      ? (setShowStatus(true),
        setShowList(false),
        setSearchResults(list),
        setStatus("Too many results, narrow down your search"))
      : list.length === 0
      ? (setShowStatus(true),
        setShowList(false),
        setSearchResults(list),
        setStatus("No matches for your search, maybe you misspelled it?"))
      : list.length < 11 && list.length > 1
      ? (setShowStatus(false),
        setShowList(true),
        setStatus(""),
        setSearchResults(list))
      : (setShowStatus(false),
        setShowList(false),
        setStatus(""),
        setSearchResults(list));
  };

  const clickHandler = (event) => {
    const searchElement = document.getElementById("countrySearch");
    searchElement.value = searchResults[event.target.dataset.index].name;
    setSearch(searchResults[event.target.dataset.index].name);
    setSearchResults([searchResults[event.target.dataset.index]]);
    setShowList(false);
    setShowStatus(false);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <label>Find Countries:</label>
      <Input onChangeHandler={onChangeHandler} />
      {showStatus ? (
        <Status text={status} />
      ) : showList ? (
        <List list={searchResults} clickHandler={clickHandler} />
      ) : (
        <Result result={searchResults[0]} />
      )}
    </div>
  );
};

export default App;
