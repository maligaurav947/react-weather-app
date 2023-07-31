import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { FiMoon, FiSun } from "react-icons/fi";
import { HiOutlineCloud } from "react-icons/hi";
import { BsDropletHalf ,BsSpeedometer } from "react-icons/bs";
import {GiPressureCooker} from "react-icons/gi"
import gif from "./clouds.gif"
function App() {
  const apiKey = `${process.env.REACT_APP_API_KEY}`;

  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(inputCity);
  };

  return (
    <>
      <div className="">
        <a
          href="#"
          className="text-2xl flex items-center gap-2 absolute top-2 left-2 font-semibold"
        >
          <img src={gif} className="w-[50px]"/> react-weather-app
        </a>
        <div className="p-5 lg:p-10">
          <div className="h-56 flex flex-col items-center justify-center ">
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
              className="icon-button"
            >
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onClick={toggleTheme}
              />
              <label for="checkbox" className="label">
                <FiMoon color="white" />
                <FiSun color="yellow" />
                <div className="ball"></div>
              </label>
            </div>
            <div className="text-black grid gap-5">
              <input
                type="text"
                className="bg-transparent outline-none border-b-2 w-96 h-12 pl-2 pr-2  capitalize"
                placeholder="Enter Your City"
                value={inputCity}
                onChange={handleChangeInput}
              />
              <button className="bn3" type="" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          {Object.keys(data).length > 0 && (
            <div className="text-center" role="status">
              <div className="grid ">
                <div className="flex flex-col items-center justify-center">
                  <h5 className="text-5xl flex items-center gap-5">
                  <img
                    className="object-contain"
                    src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                  /><span>
                  {data?.name},<span> {data?.sys?.country}</span></span>
                  </h5>
                  <h2 className="text-2xl capitalize">
                    {data?.weather[0]?.description}
                  </h2>
                </div>
                <h6 className="text-6xl gap-2 mb-5 lg:grid">
                    {~~(data?.main?.temp - 273.15).toFixed(2)}°C
                    <span className="text-lg">
                      Feel Like {~~(data?.main?.temp - 273.15).toFixed(2) - 1}°C
                    </span>
                  </h6>
                <div className="grid grid-cols-2 gap-5 md:xl:2xl:grid-cols-3 place-content-center">
                  <div className="border-2 rounded-lg p-2">
                    <h3 className="flex text-center items-center justify-center gap-2 rounded-lg">
                      <BsDropletHalf size={30} /> {data?.main?.humidity}%
                      humidity
                    </h3>
                  </div>
                  <div className="border-2 rounded-lg p-2">
                   <h3 className="flex text-center items-center justify-center gap-2">
                      <BsSpeedometer size={30}/>
                    {data?.wind?.speed}
                    <span>Speed</span>                    
                    </h3>
                  </div>
                  <div className="border-2 rounded-lg p-2">
                  <h3 className="flex text-center items-center justify-center gap-2">
                     <GiPressureCooker size={30}/>  
                    {data?.main?.pressure}  
                    <span>Pressure</span>                    
                  </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <a
        href="https://maligaurav947.github.io/Portfolio/"
        target={"_blank"}
        className="text-5xl font-medium absolute bottom-5 right-5"
      >
        me
      </a>
    </>
  );
}

export default App;
