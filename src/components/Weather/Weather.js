import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TiArrowUp, TiThermometer, TiWeatherCloudy, TiWeatherShower } from "react-icons/ti";
import { FaWind } from "react-icons/fa";
import toast from 'react-hot-toast';

const Weather = () => {
    const [city, setCity] = useState('delhi');
    const [weatherData, setWeatherData] = useState(null);

    const apikey  = process.env.REACT_APP_WEATHER_API_KEY;


    const fetchWeatherData = async () => {
        try {
          const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
          setWeatherData(res.data);
        } catch (error) {
          if (error.response) {
            console.error('Server responded with an error:', error.response.data);
            toast.error('Please enter correct city name.')
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error setting up the request:', error.message);
          }
          setWeatherData(null);
        }
      };

    useEffect(() => {
        fetchWeatherData()
    }, []);

    const handleInputChange = (e) => {
        setCity(e.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
      };

    return (
        <div className='mx-auto w-[300px] md:w-[400px] py-5'>
            <p className='mb-4 text-center text-2xl font-bold'>Weather Report</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter city name"
                 className="input input-bordered input-accent w-full"
                 value={city}
                 onChange={handleInputChange} />
                <div className='flex justify-center'>
                    <button type='submit' className="btn btn-sm btn-active btn-accent text-white mt-2">Get Weather</button>
                </div>
            </form>
            
            {weatherData ? (
        <>
          <h2 className='text-xl font-bold'>City: {weatherData.name}</h2>
          <div className='flex items-center gap-4 my-3'>
            <p className="flex items-center gap-1 text-lg">
                <TiThermometer/>
                <span className='font-bold'>Temp:</span> 
                {weatherData.main.temp}°C
            </p>
            <p className="flex items-center gap-1 text-lg">
                <TiWeatherCloudy/>
                <span className='font-bold'>Description:</span> {weatherData.weather[0].description}
            </p>
          </div>
          <div className='flex items-center gap-4 my-3'>
            <p className="flex items-center gap-1 text-lg">
                <TiThermometer/>
                <span className='font-bold'>Feels like:</span> {weatherData.main.feels_like}°C
            </p>
            <p className="flex items-center gap-1 text-lg">
                <TiWeatherShower/>
                <span className='font-bold'>Humidity:</span> {weatherData.main.humidity}%
            </p>
          </div>
          <div className='flex items-center gap-4 my-3'>
            <p className="flex items-center gap-1 text-lg">
                <TiArrowUp/>
                <span className='font-bold'>Pressure:</span> {weatherData.main.pressure}
            </p>
            <p className="flex items-center gap-1 text-lg">
                <FaWind/>
                <span className='font-bold'>Wind Speed :</span> {weatherData.wind.speed}m/s
            </p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
        </div>
    );
};

export default Weather;