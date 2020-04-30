import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`
      )
      .then((response) => {
        setWeather(response.data.current);
      });
  }, [city]);

  return (
    <div>
      <h3>Weather</h3>
      <img
        src={weather.weather_icons}
        width="50"
        alt={`icon for ${weather.weather_descriptions} weather`}
      />
      <p>{weather.temperature}ºC</p>
      <p>Wind Speed: {weather.wind_speed} km/h</p>
      <p>Wind Direction: {weather.wind_dir}</p>
    </div>
  );
};

export default Weather;
