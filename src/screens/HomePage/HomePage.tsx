import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@nextui-org/react";
import {Link} from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import "./HomePage.css";
import sunIcon from "../../assets/sun.png";
import {useChangeFormatDate} from "../../hooks/useChangeFormatDate";
import WorkIcon from "../../assets/Work2.svg";
import DiscoveryIcon from "../../assets/Discovery.svg";
import TicketIcon from "../../assets/Ticket.svg";
import ReportIcon from "../../assets/Danger.svg";
import StarIcon from "../../assets/Game.svg";
const HomePage = () => {

    const dateEvent = new Date();
    const goodFormatDate = useChangeFormatDate({ date: dateEvent, language: 'en-US' });


    return (
        <div className="home-page">
            <div className="home-page__date">
                <div className="row">
                    <span className="row__date">{goodFormatDate}</span>

                </div>
                <div className="row">
                    <span className="row__name">Hello Andrew</span>
                </div>
            </div>

            <div className="home-page__navigation">
                <div className="navigation__item">
                    <Link to="/events">
                        <div>
                            <img src={DiscoveryIcon} alt="Discovery" />
                        </div>
                        <span>Moments</span>
                    </Link>
                </div>
                <div className="navigation__item">
                    <Link to="/event/ticket">
                        <div>
                            <img src={TicketIcon} alt="Ticket" />
                        </div>
                        <span>Ticket</span>
                    </Link>
                </div>
                <div className="navigation__item">
                    <Link to="/challenges" className="">
                        <div>
                            <img src={StarIcon} alt="Work" />
                        </div>
                        <span>Challenges</span>
                    </Link>
                </div>


                <div className="navigation__item">
                    <Link to="/event/report">
                        <div>
                            <img src={ReportIcon} alt="Report" />
                        </div>
                        <span>Report</span>
                    </Link>
                </div>
            </div>


            <BottomNavbar />
        </div>
    );
};

export default HomePage;