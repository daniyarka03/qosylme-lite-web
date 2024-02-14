import React from 'react';
import HomeIcon from "../../assets/Home.svg";
import ExploreIcon from "../../assets/Discovery.svg";
import NotificationIcon from "../../assets/Notification.svg";
import ProfileIcon from "../../assets/Profile.svg";
import "./BottomNavbar.css";
import {Link} from "react-router-dom";
const BottomNavbar = () => {
    return (
        <div className="bottom-navbar">
            <Link to={"/"}><img className="bottom-navbar__icon" src={HomeIcon} /></Link>
            <Link to={"/events"}> <img className="bottom-navbar__icon" src={ExploreIcon} /></Link>
            <Link to={"/"}><img className="bottom-navbar__icon" src={NotificationIcon} /></Link>
            <Link to={"/profile"}><img className="bottom-navbar__icon" src={ProfileIcon} /></Link>
        </div>
    );
};

export default BottomNavbar;