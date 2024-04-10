import React from 'react';
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import "./NotificationsPage.css";
import CloudImage from "../../assets/cloud.png";
import {motion} from "framer-motion";
const NotificationsPage = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
                className="notifications-page">
                <h1 className="notifications-page__title">Notifications</h1>
                <div className="notifications-page__content">
                    <div className="notification-page__without-notifications">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.7,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                            className="notifications-page__cloud-image" src={CloudImage} />
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.9,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                        >Notifications are empty</motion.h2>
                        <motion.p
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 1,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                        >
                            Our cloud is watching and waiting for your new notifications, beep beep beep, wait for it</motion.p>
                    </div>
                </div>
            </motion.div>
            <BottomNavbar />
        </>
    );
};

export default NotificationsPage;