import React, { useState } from 'react';
import close from "./../../img/Close.png"

import "./ErrorePage.css";

export default function ErrorePage(prop) {
    const [erroreStyle, setErroreStyle] = useState(prop.secondary);
    const colseError = () => {
        setErroreStyle("close");
    }
    return (
        <div className={"errorePage " + erroreStyle}>
            <h2>{prop.message}</h2>
            <div className="errorePage__close" onClick={colseError}>
                <img src={close} alt="" />
            </div>
        </div>
    );
}