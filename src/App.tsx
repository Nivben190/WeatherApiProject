import React from 'react';
import logo from './logo.svg';
import { IWeather } from './models/IWeather';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  //get current weather from openweatherapi
  const [city, setCity] = useState('London');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //use Weather interface to init state
  const [weather, setWeather] = useState<IWeather>();
  
  const apiKey= "3b2ab293517107856f588a1e77e122ee"
  const uri=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // functin that get current weather from openweatherapi
    const getWeather=async(e: React.FormEvent<HTMLFormElement>)=>
     {
       e.preventDefault();
      setLoading(true);
      const data = await axios.get(uri);    
       setWeather(data.data);
    }
 
    //use effect to get weather
  

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Weather App</h1>
             
                <form onSubmit={getWeather}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Get Weather
                  </button>
                </form>
                
                {weather && ( <div className="alert alert-success mt-3">City: {city} <br/> Temperature: {weather.main.temp}°C</div> )}

                {loading && <p>Loading...</p>}
                {error && <p>City not found</p>}
              

                {error && ( <div className="alert alert-danger mt-3">City not found</div> )}
                {!error && !loading && ( <div className="alert alert-info mt-3">Loading</div> )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
