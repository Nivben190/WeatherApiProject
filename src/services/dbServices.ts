import axios from "axios";
//get default city from openweather api
const apiKey= "3b2ab293517107856f588a1e77e122ee"

export const getWeatherByName = async (city:string,setData:any,setLoading:any,setError:any,e?: React.FormEvent<HTMLFormElement>) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   e?.preventDefault();
    setLoading(true);
    //set try catch for api req
    try {
      const res = await axios.get(url);
      setData(res.data);
      setLoading(false);
      setError(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
    };
