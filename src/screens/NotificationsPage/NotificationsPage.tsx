import React from 'react';
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import "./NotificationsPage.css";
import CloudImage from "../../assets/cloud.png";
const NotificationsPage = () => {
    return (
        <>
            <div className="notifications-page">
                <h1 className="notifications-page__title">Notifications</h1>
                <div className="notifications-page__content">
                    <div className="notification-page__without-notifications">
                        <img className="notifications-page__cloud-image" src={CloudImage} />
                        <h2>Notifications are empty</h2>
                        <p>
                            Our cloud is watching and waiting for your new notifications, beep beep beep, wait for it</p>
                    </div>
                </div>
            </div>
            <BottomNavbar />
        </>
    );
};

export default NotificationsPage;