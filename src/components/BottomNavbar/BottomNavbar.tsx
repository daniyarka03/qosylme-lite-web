import React, {useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../../assets/Home.svg";
import ExploreIcon from "../../assets/Discovery.svg";
import NotificationIcon from "../../assets/Notification.svg";
import ProfileIcon from "../../assets/Profile.svg";
import "./BottomNavbar.css";

const BottomNavbar = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    const detectDeviceType = () => {
        setIsMobile(window.innerWidth <= 768); // Примерный порог для мобильных устройств
    };

    useEffect(() => {
        detectDeviceType();
        // Добавляем прослушиватель изменения размера окна для реакции на изменение типа устройства
        window.addEventListener('resize', detectDeviceType);
        // Убираем прослушиватель при размонтировании компонента
        return () => window.removeEventListener('resize', detectDeviceType);
    }, []);


    return (
        <>
            {isMobile && (
                <div className="bottom-navbar">
                    <Link to={"/"} className={location.pathname === "/" ? "bottom-navbar-item bottom-navbar__active" : "bottom-navbar-item"}>
                        <img className="bottom-navbar__icon" src={HomeIcon} />
                    </Link>
                    <Link to={"/events"} className={location.pathname === "/events" ? "bottom-navbar-item bottom-navbar__active" : "bottom-navbar-item"}>
                        <img className="bottom-navbar__icon" src={ExploreIcon} />
                    </Link>
                    <Link to={"/notifications"} className={location.pathname === "/notifications" ? "bottom-navbar-item bottom-navbar__active" : "bottom-navbar-item"}>
                        <img className="bottom-navbar__icon" src={NotificationIcon} />
                    </Link>
                    <Link to={"/profile"} className={location.pathname === "/profile" ? "bottom-navbar-item bottom-navbar__active" : "bottom-navbar-item"}>
                        <img className="bottom-navbar__icon" src={ProfileIcon} />
                    </Link>
                </div>
            ) || null}
        </>
    );
};

export default BottomNavbar;
