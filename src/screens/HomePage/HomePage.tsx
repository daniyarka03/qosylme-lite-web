import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import "./HomePage.css";
import {useChangeFormatDate} from "../../hooks/useChangeFormatDate";
import DiscoveryIcon from "../../assets/Discovery.svg";
import TicketIcon from "../../assets/Ticket.svg";
import ReportIcon from "../../assets/Danger.svg";
import StarIcon from "../../assets/Game.svg";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {motion} from "framer-motion";
import style from "../EventListPage/EventListPage.module.css";
const HomePage = () => {

    const dateEvent = new Date();
    const goodFormatDate = useChangeFormatDate({ date: dateEvent, language: 'en-US' });
    const infoProfile = useInfoProfile();
    const [firstname, setFirstname] = useState<string>("");

    useEffect(() => {
        if (infoProfile) {
            setFirstname(infoProfile.firstname)
        }
    }, [infoProfile]);


    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]}}
                className="home-page" >
                <div className="home-page__date">
                    <div className="row">
                        <span className="row__date">{goodFormatDate}</span>

                    </div>
                    <div

                        className="row">
                        <span className="row__name">Hello {firstname}</span>
                    </div>
                </div>

                <div className="home-page__navigation">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.7,
                            ease: [0, 0.71, 0.2, 1.01]}}
                        className="navigation__item">
                        <Link to="/events">
                            <motion.div whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                <img src={DiscoveryIcon} alt="Discovery" />
                            </motion.div>
                            <span>Moments</span>
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.9,
                            ease: [0, 0.71, 0.2, 1.01]}}
                        className="navigation__item">
                        <Link to="/events">
                            <motion.div  whileHover={{ scale: 1.1 }}
                                         whileTap={{ scale: 0.9 }}
                                         transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                <img src={TicketIcon} alt="Ticket" />
                            </motion.div>
                            <span>Ticket</span>
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.1,
                            ease: [0, 0.71, 0.2, 1.01]}}
                        className="navigation__item">
                        <Link to="/challenges" className="">
                            <motion.div whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                <img src={StarIcon} alt="Work" />
                            </motion.div>
                            <span>Challenges</span>
                        </Link>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.3,
                            ease: [0, 0.71, 0.2, 1.01]}}
                        className="navigation__item">
                        <Link to="/event/report">
                            <motion.div whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        whileTap={{ scale: 0.9 }}
                            >
                                <img src={ReportIcon} alt="Report" />
                            </motion.div>
                            <span>Report</span>
                        </Link>
                    </motion.div>
                </div>

            </motion.div>
            <BottomNavbar />
        </>

    );
};

export default HomePage;