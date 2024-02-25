import Location from './../../img/location.png';
import Temperature from './../../img/temperature.png';
import Humidity from './../../img/humidity.png';
import Gauge from './../../img/gauge.png';
import Visibility from './../../img/visibility.png';
import WindSpeed from './../../img/wind-speed.png';

import "./BigCard.css";

export default function BigCard(prop) {
    return (
        <div style={prop.style} className="bigCard" id={prop.id}>
            <div className="bigCard__title">
                <div className="bigCard__title-left">
                    <h2>{prop.bigCardInfo.name}</h2>
                    <img src={Location} alt="" />
                </div>
                <div className="bigCard__title-right">
                    <h5>{prop.bigCardInfo.date}</h5>
                </div>
            </div>
            <div className="bigCard__main">
                <div className="bigCard__main-temp-wrapper">
                    <div className="bigCard__main-temp">
                        <img src={Temperature} alt="" />
                        <h1>{Math.floor(prop.bigCardInfo.mintemp_c)}°<span>/</span>{Math.floor(prop.bigCardInfo.maxtemp_c)}°</h1>
                    </div>
                </div>
                <div className="bigCard__main-img-wrapper">
                    <img className="bigCard__main-img" src={prop.bigCardInfo.icon} alt="" />
                </div>
            </div>
            <div className="bigCard__bottom-wrapper">
                <div className="bigCard__bottom">
                    <div className="bigCard__bottom-item">
                        <img src={Humidity} alt="" />
                        <div className="bigCard__bottom-item-text">
                            <h5>{prop.bigCardInfo.avghumidity}%</h5>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="bigCard__bottom-item">
                        <img src={Gauge} alt="" />
                        <div className="bigCard__bottom-item-text">
                            <h5>{Math.floor(prop.bigCardInfo.pressure_mb / 1.333)} mm</h5>
                            <p>Air Pressure</p>
                        </div>
                    </div>
                    <div className="bigCard__bottom-item">
                        <img src={Visibility} alt="" />
                        <div className="bigCard__bottom-item-text">
                            <h5>{prop.bigCardInfo.avgvis_km} km</h5>
                            <p>Visibility</p>
                        </div>
                    </div>
                    <div className="bigCard__bottom-item">
                        <img src={WindSpeed} alt="" />
                        <div className="bigCard__bottom-item-text">
                            <h5>{prop.bigCardInfo.maxwind_kph} km/h</h5>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}