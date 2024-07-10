import React from 'react';
import {motion} from "framer-motion";
import CloudImage from "../../assets/cloud.png";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import "./MomentsPage.css";
import ScientistImage from "../../assets/scientist.png";

const MomentsPage = () => {
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
                <h1 className="notifications-page__title">Moments</h1>
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
                            className="notifications-page__cloud-image" src={ScientistImage} />
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.9,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                        >Moments is still under development</motion.h2>
                        <motion.p
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 1,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                        >
                            Our programmers don't sleep day and night to create these cool moments for you and only you</motion.p>
                    </div>
                </div>
            </motion.div>
            <BottomNavbar />
        </>
    );
};

export default MomentsPage;