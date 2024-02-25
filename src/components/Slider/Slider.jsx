import React, { useState, useEffect, Children, cloneElement } from "react";
import leftArrow from "./../../img/leftArrow.png";
import rightArrow from "./../../img/rightArrow.png";
import "./Slider.css";
import BigCard from "../BigCard/BigCard";
import SmallCard from "../SmallCard/SmallCard";

export default function Slider(prop) {
    const [pageWidth, setPageWidth] = useState(900);
    const [smallPageWidth, setSmallPageWidth] = useState(1055);

    const [page, setPage] = useState(0);
    const [smallPage, setSmallPage] = useState(0);
    const [sizeCard, setSizeCard] = useState(2);
    const [pages, setPages] = useState([]);
    const [smallCardPages, setSmallCardPages] = useState([]);

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setPageWidth(600);
            setSmallPageWidth(560);
        }
        if (window.innerWidth < 500) {
            setPageWidth(400);
            setSmallPageWidth(400);
        }
        updatePages();
        Foo();
    }, [sizeCard, prop.info]);

    const muveLeft = () => {
        if (sizeCard > 0) {
            setSizeCard(sizeCard - 1);
            setPage(page + pageWidth);
            setSmallPage(smallPage + smallPageWidth);
        }
    }

    const muveRight = () => {
        if (sizeCard < prop.info.length - 1) {
            setSizeCard(sizeCard + 1);
            setPage(page - pageWidth);
            setSmallPage(smallPage - smallPageWidth);
        }
    }

    const updatePages = () => {
        setPages(
            prop.info.map((item, index) => {
                if (index !== sizeCard) {
                    return cloneElement(<BigCard bigCardInfo={item} id={`card-${index}`} />, {
                        style: {
                            transform: 'scale(0.8)',
                        }
                    });
                } else {
                    return cloneElement(<BigCard bigCardInfo={item} id={`card-${index}`} />, {
                        style: {
                            transform: 'scale(1)',
                        }
                    });
                }
            })
        );
    }

    const Foo = () => {
        setSmallCardPages(
            prop.info.map((item, index) => {
                return cloneElement(<SmallCard smallCardInfo={item.hours} id={`card-${index}`} />);
            })
        )
    }

    return (
        <div className="main-container">
            <div className="window">
                <div style={{
                    transform: `translateX(${page}px)`,
                }} className="all-pages-container">
                    {pages}
                </div>
            </div>
            <div className="slider-btn">
                <img src={leftArrow} onClick={muveLeft}></img>
                <img src={rightArrow} onClick={muveRight}></img>
            </div>
            <div className="small-window-wrapper">
                <div className="small-window">
                    <div style={{
                        transform: `translateX(${smallPage}px)`,
                    }} className="all-small-pages-container">
                        {smallCardPages}
                    </div>
                </div>
            </div>
        </div>
    );
}