import React, {useEffect, useState} from 'react';
import "./ProfilePage.css";
import {Avatar, Button, Chip, Image, Tab, Tabs} from "@nextui-org/react";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {useQuery} from "@apollo/client";
import {GET_CURRENT_USER, SHOW_ALL_EVENTS} from "../../graphQL/Queries";
import {Link} from "react-router-dom";
import CardEvent from "../../components/CardEvent/CardEvent";
import AvatarStaticImage from "../../assets/avatar-static.png";
import SettingsIcon from "../../assets/Setting.svg";
import LogoutIcon from "../../assets/Logout.svg";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";

const ProfilePage = () => {

    const infoProfile = useInfoProfile();
    const allEvents = useQuery(SHOW_ALL_EVENTS);
    const [events, setEvents] = React.useState([]);
    const [myCreatedEvents, setMyCreatedEvents] = React.useState([]);
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
    useEffect(() => {
        if (allEvents.data && infoProfile) {
            const events = allEvents.data.events;
            const newEvents = events.filter((event: any) => {
                return event.guests.includes(infoProfile.userId);
            });
            const newMyEvents = events.filter((event: any) => {
                console.log("myEvents", event.authorEvent.userId === infoProfile.userId)
                return event.authorEvent.userId === infoProfile.userId;
            });
            if (newEvents && newMyEvents) {
                setEvents(newEvents)
                setMyCreatedEvents(newMyEvents)
            }
        }
    }, [allEvents.data, infoProfile]);
    const logoutHandler = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    if (events) {
        console.log(events)
    }

    return (
        <div className="main">
            {infoProfile && (
                <>
                    <BottomNavbar />
                <section className="section-profile">
                    <div className="container">
                        <div className="profile-cover">

                        </div>
                        <div className="profile">
                            <div className="profile__image">
                                <Avatar style={{top: "-80px", left: 0, right: 0, position: "absolute", margin: "0 auto", width: "146px", height: "146px"}} src={AvatarStaticImage} />
                            </div>
                            <div className="profile-controls">
                                <Link to="/settings"><button className="profile-settings__button"><img src={SettingsIcon} alt=""/></button></Link>
                                {!isMobile && <button onClick={logoutHandler} className="profile-logout__button"><img src={LogoutIcon} alt=""/></button>}
                            </div>
                            <div className="profile__info">
                                <div className="profile__info-item">
                                    <span className="profile__info-item-value">{infoProfile.firstname + " " + infoProfile.lastname}</span>
                                </div>
                                <div className="profile__info-item">
                                    {/*<div className="profile__info-username">*/}
                                    {/*    <span className="profile__info-item-value">{infoProfile.username}</span>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>

                        {/*<Tabs aria-label="Options" color="primary" variant="bordered">*/}
                        {/*    <Tab*/}
                        {/*        key="photos"*/}
                        {/*        title={*/}
                        {/*            <div className="flex items-center space-x-2">*/}
                        {/*                <span>My created events</span>*/}
                        {/*                <Chip size="sm" color="default">{myCreatedEvents.length}</Chip>*/}
                        {/*            </div>*/}
                        {/*        }*/}
                        {/*    >*/}

                        {/*        <div className="profile__list-events">*/}
                        {/*            <h2 className="profile__list-events__title">My created events</h2>*/}
                        {/*            {myCreatedEvents && myCreatedEvents.map((event: any, index) => (*/}
                        {/*                    <CardEvent style={{marginBottom: "40px"}} key={index} data={event} />*/}
                        {/*                )*/}
                        {/*            )}*/}
                        {/*        </div>*/}

                        {/*    </Tab>*/}
                        {/*    <Tab*/}
                        {/*        key="music"*/}
                        {/*        title={*/}
                        {/*            <div className="flex items-center space-x-2">*/}
                        {/*                <span>My Attended events</span>*/}
                        {/*                <Chip size="sm" color="default">{events.length}</Chip>*/}
                        {/*            </div>*/}
                        {/*        }*/}
                        {/*    >*/}
                        {/*        <div className="profile__list-events">*/}
                        {/*            <h2 className="profile__list-events__title">My next attended events</h2>*/}
                        {/*            {events && events.map((event: any, index) => (*/}
                        {/*                    <CardEvent style={{marginBottom: "40px"}} key={index} data={event} />*/}
                        {/*                )*/}
                        {/*            )}*/}
                        {/*        </div>*/}
                        {/*    </Tab>*/}

                        {/*</Tabs>*/}


                    </div>
                </section>

                </>
            )}
        </div>
    );
};

export default ProfilePage;