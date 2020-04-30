import React from "react";
import Weather from './Weather';

const Result = ({ result }) => {
  const { name, capital, population, languages, flag } = result;

  return (
    <div>
      <h2>{name}</h2>
      <div>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>
          {languages.map((language) => (
            <li key={language.iso639_2}>{language.name}</li>
          ))}
        </ul>
      </div>
      <img src={flag} width="200" alt={`Flag of ${name}`} />
      <div>
        <Weather city={capital} />
      </div>
    </div>
  );
};

export default Result;
