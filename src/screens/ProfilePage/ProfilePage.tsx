import React, {useEffect, useState} from 'react';
import "./ProfilePage.css";
import {Avatar, Button, Chip, Image, Tab, Tabs} from "@nextui-org/react";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {useQuery} from "@apollo/client";
import {
    GET_ATTENDED_EVENTS, GET_CREATED_EVENTS, GET_USER_BY_ID, GET_USERS_CHALLENGES
} from "../../graphQL/Queries";
import {Link} from "react-router-dom";
import CardEvent from "../../components/CardEvent/CardEvent";
import AvatarStaticImage from "../../assets/avatar-static.png";
import SettingsIcon from "../../assets/Setting.svg";
import LogoutIcon from "../../assets/Logout.svg";
import PlusIcon from "../../assets/Plus.svg";
import EditIconComponent from "../../EditIconComponent";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import CardEventMinimized from "../../components/CardEventMinimized/CardEventMinimized";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {jwtDecode} from "jwt-decode";
import PlusIconComponent from "../../components/PlusIconComponent";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
import {motion} from "framer-motion";

interface Event {
    getEvents: {
        event_id: number,
        name: string,
        description: string,
        location: string,
        date: string,
        image_cover: string,
        author_event: {
            user_id: number,
            firstname: string,
            lastname: string,
            email: string,
        },
        guests: {
            user_id: number,
            firstname: string,
            lastname: string,
            email: string,
        }[]
    }

}

const ProfilePage = () => {

    const infoProfile = useInfoProfile();
    const decodedToken: any = jwtDecode(localStorage.getItem('token') || "");
    const {data: attendedEvents} = useQuery(GET_ATTENDED_EVENTS, {
        variables: {
            userId: decodedToken.userId
        }
    });
    const {data: createdEvents} = useQuery(GET_CREATED_EVENTS, {
        variables: {
            userId: decodedToken.userId
        }
    });
    const {data: usersChallenges} = useQuery(GET_USER_BY_ID, {
        variables: {
            userId: decodedToken.userId
        }
    });
    const [profile, setProfile] = useState<any>(null);
    const [events, setEvents] = React.useState([]);
    const [myCreatedEvents, setMyCreatedEvents] = React.useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [usersChallengesList, setUsersChallengesList] = useState<any>(null);
    const detectDeviceType = () => {
        setIsMobile(window.innerWidth <= 768); // Примерный порог для мобильных устройств
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        detectDeviceType();
        // Добавляем прослушиватель изменения размера окна для реакции на изменение типа устройства
        window.addEventListener('resize', detectDeviceType);
        // Убираем прослушиватель при размонтировании компонента
        return () => window.removeEventListener('resize', detectDeviceType);
    }, []);


    useEffect(() => {
        try {
            if (infoProfile && decodedToken && attendedEvents && attendedEvents.getUserById) {
                const events = attendedEvents.getUserById.attendedEvents;
                setEvents(events)
            }

            if (infoProfile && decodedToken && createdEvents && createdEvents.getEventsByUser) {
                const events = createdEvents.getEventsByUser;
                setMyCreatedEvents(events)
            }

            // console.log(usersChallenges)
            //
            if (infoProfile && decodedToken && usersChallenges) {
                setUsersChallengesList(usersChallenges.getUserById.participatedChallenges)
            }
        } catch (error) {
            console.error('Error fetching attended events:', error);
        }
    }, [infoProfile, decodedToken]);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }




    return (
        <div

            className="main">
            {infoProfile && (
                <>
                    {/*<BottomNavbar />*/}
                    <section className="section-profile">
                        <div className="container">
                            <div className="profile-cover">

                            </div>
                            <div className="profile">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.5,
                                        ease: [0, 0.71, 0.2, 1.01]}}
                                    className="profile__image">
                                    <Avatar style={{
                                        top: "-80px",
                                        left: 0,
                                        right: 0,
                                        position: "absolute",
                                        margin: "0 auto",
                                        width: "146px",
                                        height: "146px"
                                    }} src={import.meta.env.VITE_SERVER_URL + infoProfile.avatar}/>
                                </motion.div>
                                <div className="profile-controls">
                                    <Link to="/settings">
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.7,
                                                ease: [0, 0.71, 0.2, 1.01]}}
                                            className="profile-settings__button"><img src={SettingsIcon} alt=""/>
                                        </motion.button>
                                    </Link>
                                    {!isMobile &&
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.8,
                                                ease: [0, 0.71, 0.2, 1.01]}}
                                            onClick={logoutHandler} className="profile-logout__button"><img
                                            src={LogoutIcon} alt=""/></motion.button>}
                                </div>
                                <div className="profile__info">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.6,
                                            ease: [0, 0.71, 0.2, 1.01]}}
                                        className="profile__info-item">
                                        <span

                                            className="profile__info-item-value">{infoProfile.firstname + " " + infoProfile.lastname}</span>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.8,
                                            ease: [0, 0.71, 0.2, 1.01]}}
                                        className="profile__info-item" style={{marginTop: "10px"}}>
                                        {/*<div className="profile__info-username">*/}
                                        {/*    <span className="profile__info-item-value">{infoProfile.username}</span>*/}
                                        {/*</div>*/}
                                        <Link to="/profile/edit"><Button color="primary" style={{fontWeight: 500}}
                                                                         startContent={<EditIconComponent/>}>Edit
                                            profile</Button></Link>
                                        {!isMobile &&
                                            <Link to="/event/create">
                                                <Button
                                                    color="primary"
                                                    style={{fontWeight: 500, marginLeft: "20px"}}
                                                    startContent={<PlusIconComponent />}>
                                                    Create event
                                                </Button>
                                            </Link>
                                        }

                                    </motion.div>
                                </div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 1,
                                    ease: [0, 0.71, 0.2, 1.01]}}
                            >
                                <Tabs style={{marginTop: "150px", height: "40px"}} classNames={{
                                    tab: "panel__tab",
                                    tabContent: "panel__tab-content",
                                }} fullWidth={true} size="lg" aria-label="Options" color="primary" variant="light">
                                    <Tab
                                        key="photos"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span>My events</span>
                                                <Chip size="sm" color="default">{myCreatedEvents.length}</Chip>
                                            </div>
                                        }
                                    >

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2,
                                                ease: [0, 0.71, 0.2, 1.01]}}
                                            className="profile__list-events">
                                            {myCreatedEvents && myCreatedEvents.map((event: any, index) => (
                                                    <CardEvent style={{marginBottom: "40px"}} key={index} data={event}/>
                                                )
                                            )}
                                        </motion.div>

                                    </Tab>
                                    <Tab
                                        key="music"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span>Attending events</span>
                                                <Chip size="sm" color="default">{events.length}</Chip>
                                            </div >
                                        }
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2,
                                                ease: [0, 0.71, 0.2, 1.01]}}
                                            className="profile__attended-event">
                                            {events && events.map((event, index) => (
                                                <CardEventMinimized key={index} data={event}/>
                                            ))}
                                        </motion.div>
                                    </Tab>
                                    <Tab
                                        key="challenge"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span>My Challenges</span>
                                                <Chip size="sm" color="default">{usersChallengesList ? usersChallengesList.length : ""}</Chip>
                                            </div>
                                        }>
                                        <motion.div className="profile__challenges"
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{
                                                        duration: 0.8,
                                                        delay: 0.2,
                                                        ease: [0, 0.71, 0.2, 1.01]}}>
                                            {usersChallengesList && usersChallengesList.map((item: any, key: number) => (
                                                <ChallengeCard key={key} challenge_id={item.challenge.challenge_id} title={item.challenge.name} description={item.challenge.description} deadline={item.challenge.deadline} xp={item.challenge.xp_award} coins={item.challenge.coins_award} image_cover={item.challenge.image_cover} />
                                            ))}
                                        </motion.div>
                                    </Tab>
                                </Tabs>
                            </motion.div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default ProfilePage;