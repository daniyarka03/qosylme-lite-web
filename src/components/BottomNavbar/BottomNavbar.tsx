import React, {useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "../../assets/Iconly/Regular/Bold/Home.svg";
import ExploreIcon from "../../assets/Iconly/Regular/Bold/Discovery.svg";
import NotificationIcon from "../../assets/Iconly/Regular/Bold/Notification.svg";
import ProfileIcon from "../../assets/Iconly/Regular/Bold/Profile.svg";
import PlusIcon from "../../assets/Iconly/Regular/Bold/Plus.svg";

import HomeOutlineIcon from "../../assets/Iconly/Regular/Light/Home.svg";
import ExploreOutlineIcon from "../../assets/Iconly/Regular/Light/Discovery.svg";
import NotificationOutlineIcon from "../../assets/Iconly/Regular/Light/Notification.svg";
import ProfileOutlineIcon from "../../assets/Iconly/Regular/Light/Profile.svg";
import PlusOutlineIcon from "../../assets/Iconly/Regular/Light/Plus.svg";
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
                    <Link to={"/"} className={"bottom-navbar-item"}>
                        <img className="bottom-navbar__icon" src={location.pathname === "/" ? HomeIcon : HomeOutlineIcon} />
                    </Link>
                    <Link to={"/events"} className={"bottom-navbar-item"}>
                        <img className="bottom-navbar__icon" src={location.pathname === "/events" ? ExploreIcon : ExploreOutlineIcon} />
                    </Link>
                    <Link to={"/event/create"} className={"bottom-navbar-item"}>
                        <img className="bottom-navbar__icon" src={location.pathname === "/event/create" ? PlusIcon : PlusOutlineIcon} />
                    </Link>
                    <Link to={"/notifications"} className={"bottom-navbar-item"}>
                        <img className="bottom-navbar__icon" src={location.pathname === "/notifications" ? NotificationIcon : NotificationOutlineIcon} />
                    </Link>
                    <Link to={"/profile"} className={"bottom-navbar-item"}>
                        <img className="bottom-navbar__icon" src={location.pathname === "/profile" ? ProfileIcon : ProfileOutlineIcon} />
                    </Link>
                </div>
            ) || null}
        </>
    );
};

export default BottomNavbar;
