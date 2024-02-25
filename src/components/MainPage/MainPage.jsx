import React, { useState, useEffect } from 'react';

import Slider from "../Slider/Slider";
import magnifyingGlass from "./../../img/magnifyingGlass.png";
import "./MainPage.css";
import ErrorePage from '../ErrorePage/ErrorePage';

const KEY = "fda50e55472b4029829103320240402"

export default function MainPage() {
    const [weatherHistoryData, setWeatherHistoryData] = useState([]);
    const [weatherFutureData, setWeatherFutureData] = useState([]);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState("Kharkiv");
    const [searchInput, setSearchInput] = useState("");

    const currentDate = new Date();

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(currentDate.getDate() - 2);
    currentDate.setDate(currentDate.getDate() - 1);

    const start = formatDate(twoDaysAgo);
    const end = formatDate(currentDate);

    const queryForecast = `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${location}&days=3`;
    const queryHistory = `https://api.weatherapi.com/v1/history.json?key=${KEY}&q=${location}&dt=${start}&end_dt=${end}`;

    useEffect(() => {
        try {
            fetch(queryHistory).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.error !== undefined) {
                    setError(data.error);
                }
                else {
                    setError(null);
                    setWeatherHistoryData(setData(data));
                }
            })

            fetch(queryForecast).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.error == undefined) {
                    setWeatherFutureData(setData(data));
                }
            })
        } catch (error) {
            setError(error);
        }
    }, [location]);

    const weatherData = weatherHistoryData.concat(weatherFutureData);

    const inputLocation = () => {
        if (searchInput !== "") {
            setLocation(searchInput);
        }
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function setData(data) {
        let loca = data.location.name;
        let weatherInfo = [];

        data.forecast.forecastday.map(item => {
            let info = {
                name: loca,
                date: "0",
                mintemp_c: 0,
                maxtemp_c: 0,
                icon: "",
                avghumidity: 0,
                pressure_mb: 0,
                avgvis_km: 0,
                maxwind_kph: 0,
                hours: []
            }

            let avg_pressure_mb = 0;

            info.date = item.date;
            info.mintemp_c = item.day.mintemp_c;
            info.maxtemp_c = item.day.maxtemp_c;
            info.icon = item.day.condition.icon;
            info.avghumidity = item.day.avghumidity;
            info.avgvis_km = item.day.avgvis_km;
            info.maxwind_kph = item.day.maxwind_kph;

            for (let i = 2; i < item.hour.length; i += 4) {
                const words = item.hour[i].time.split(' ');
                let hourInfo = {
                    time: words[1],
                    temp: item.hour[i].temp_c,
                    icon: item.hour[i].condition.icon,
                }
                info.hours.push(hourInfo);
                avg_pressure_mb += item.hour[i].pressure_mb;
            }

            info.pressure_mb = avg_pressure_mb / 6;
            weatherInfo.push(info);
        });
        return weatherInfo;
    }

    return (
        <div className="mainPage">
            <div className="mainPage__search-bar-wrapper">
                <div className="mainPage__search-bar">
                    <input type="text" placeholder="Enter city name"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)} />
                    <div className="mainPage__btn" onClick={inputLocation}>
                        <img src={magnifyingGlass} alt="" />
                    </div>
                </div>
            </div>
            {error !== null ? <ErrorePage secondary="" message={error.message} /> : ""}
            <Slider info={weatherData} />
        </div>
    );
}