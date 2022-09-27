import React from 'react';
import { IWeather } from './models/IWeather';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { getWeatherByName } from './services/dbServices';

function App() {
  //get current weather from openweatherapi
  const [city, setCity] = useState('London');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //use Weather interface to init state
  const [weather, setWeather] = useState<IWeather>();


    //use effect 
    useEffect(() => {
     getWeatherByName("London",setWeather,setLoading,setError);

    }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Weather App</h1>
             
                <form onSubmit={(e)=>getWeatherByName(city,setWeather,setLoading,setError,e)}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className='weatherDiv'>
                  {weather && ( <div className="alert alert-success mt-3">
                   <h3 className='cityH3'>{weather.name}</h3>  <br/> <h3 className='tempH3'>{weather.main.temp}°C</h3> </div> )}
                 <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`} alt="weather icon"/>
                  </div>
                  <button type="submit" className="btn  btn-block">
                    Get Weather
                  </button>
                </form>
                
   
                {loading && <p>Loading...</p>}
                {error && ( <div className="alert alert-danger mt-3">City not found</div> )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
