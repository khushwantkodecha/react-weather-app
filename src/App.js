import React, { useState } from "react";
import "./App.css";
import "./weather-icons-master/css/weather-icons.css";
import axios from "axios";
import Form from "./Form";
import Weather from "./Weather";

function App() {
  const [data, setData] = useState({ error: false });
  const [icon, setIcon] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [formError, setFormError] = useState(false);

  const minMax = (min, max) => {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  };

  const api_key = "0e20d07828c12e4366775ec6a42e5a16";
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`;

  const getWeather = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: api_url,
      });
      setData({
        ...data,
        city: response.data.name,
        country: response.data.sys.country,
        temparature: caluculateCelcius(response.data.main.temp),
        temp_min: caluculateCelcius(response.data.main.temp_min),
        temp_max: caluculateCelcius(response.data.main.temp_max),
        description: response.data.weather[0].description,
        error: false,
      });

      getWeatherIcon(response.data.weather[0].id);
    } catch (err) {
      setData({
        ...data,
        error: true,
      });
    }
  };

  const caluculateCelcius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  const weatherIcon = {
    thunderstom: "wi-thunderstrom",
    drizzle: "wi-sleet",
    rain: "wi-strom-showers",
    snow: "wi-snow",
    atmosphere: "wi-fog",
    clear: "wi-day-sunny",
    clouds: "wi-day-fog",
  };

  const getWeatherIcon = (icons, rangeID) => {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        setIcon(weatherIcon.thunderstom);
        break;
      case rangeID >= 300 && rangeID <= 321:
        setIcon(weatherIcon.drizzle);
        break;
      case rangeID >= 500 && rangeID <= 531:
        setIcon(weatherIcon.rain);
        break;
      case rangeID >= 600 && rangeID <= 622:
        setIcon(weatherIcon.snow);
        break;

      case rangeID >= 701 && rangeID <= 781:
        setIcon({
          ...data,
          icon: weatherIcon.snow,
        });
        break;

      case rangeID == 800:
        setIcon(weatherIcon.clear);
        break;

      case rangeID >= 801 && rangeID <= 804:
        setIcon(weatherIcon.clouds);
        break;

      default:
        setIcon(weatherIcon.clouds);
        break;
    }
  };

  const loadWeatherData = (e) => {
    e.preventDefault();
    if (!city && !country) {
      setFormError(true);
    } else {
      setFormError(false);
      getWeather();
    }
  };

  const hadnleChange = (e) => {
    setFormError(false);
    if (e.target.name === "city") {
      setCity(e.target.value);
    } else {
      setCountry(e.target.value);
    }
  };

  return (
    <div className="app">
      <Form
        loadWeatherData={loadWeatherData}
        error={data.error}
        formError={formError}
        hadnleChange={hadnleChange}
      />
      <Weather
        city={data.city}
        error={data.error}
        icon={icon}
        temparature={data.temparature}
        minMax={minMax}
        temp_min={data.temp_min}
        temp_max={data.temp_max}
        description={data.description}
      />
    </div>
  );
}

export default App;
