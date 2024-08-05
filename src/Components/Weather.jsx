import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import SearchIcon from '../assets/search.png';
import cloudyIcon from '../assets/cloudy.png';
import drizzleIcon from '../assets/drizzle.png';
import rainIcon from '../assets/rain.png';
import snowIcon from '../assets/snow.png';
import sunnyIcon from '../assets/sunny.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';


const Weather = () => {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": sunnyIcon,
        "01n": sunnyIcon,
        "02d": cloudyIcon,
        "02n": cloudyIcon,
        "03d": cloudyIcon,
        "03n": cloudyIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,         
    }

    const search = async (city) => {

        if (city.trim() === "") {
            alert("Enter City Name");
            return;
          }

        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch (url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || sunnyIcon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weatherdata");
        }
    }

    useEffect (() => {
        search("Buea");
    }, [])

  return (
    <div className='weather'>
      <div className="searchbar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={SearchIcon} alt="" onClick={() => search(inputRef.current.value)}/>
      </div>
      {weatherData? <>
        <img src={weatherData.icon} alt=""  className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}℃</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidityIcon} alt="" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={windIcon} alt="" />
            <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
      </>:<></>}
    </div>
  )
}

export default Weather