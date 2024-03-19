import React, {useEffect, useState} from 'react';
import "./ProfilePage.css";
import {Avatar, Button, Chip, Image, Tab, Tabs} from "@nextui-org/react";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {useQuery} from "@apollo/client";
import {
    GET_ATTENDED_EVENTS,
    GET_CREATED_EVENTS,
    GET_USER_BY_ID,
    SHOW_ALL_EVENTS
} from "../../graphQL/Queries";
import {Link} from "react-router-dom";
import CardEvent from "../../components/CardEvent/CardEvent";
import AvatarStaticImage from "../../assets/avatar-static.png";
import SettingsIcon from "../../assets/Setting.svg";
import LogoutIcon from "../../assets/Logout.svg";
import EditIconComponent from "../../EditIconComponent";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import CardEventMinimized from "../../components/CardEventMinimized/CardEventMinimized";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {jwtDecode} from "jwt-decode";

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
    const {data} = useQuery(GET_ATTENDED_EVENTS, {
        variables: {
            userId: decodedToken.userId
        }
    });
    const [profile, setProfile] = useState<any>(null);
    const [events, setEvents] = React.useState([]);
    const [myCreatedEvents, setMyCreatedEvents] = React.useState([]);
    const [isMobile, setIsMobile] = useState(false);
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
        setTimeout(() => {
            const events = data.getUserById.attendedEvents;
            const sortedEvents = events.slice().sort((a: any, b: any) => {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
             });
             setEvents(sortedEvents)
            console.log(data.getUserById)
        }, 2000);

        // if (data.getUserById.attendedEvents) {
        //     const events = data.getUserById.attendedEvents;
        //     const sortedEvents = events.slice().sort((a: any, b: any) => {
        //         return new Date(a.date).getTime() - new Date(b.date).getTime();
        //     });
        //     setEvents(sortedEvents)
        // }
        // if (attendedEvents.getEvents && infoProfile) {
        //     const events = attendedEvents.getEvents;
        //     const newEvents = events.filter((event: any) => {
        //         return event.guests.includes(infoProfile.userId);
        //     });
        //
        //     const {data} = useQuery(GET_CREATED_EVENTS, {
        //         variables: {
        //             userId: infoProfile.userId
        //         }
        //     });
        //
        //     console.log(data.getEventsByUserId)
        //
        //     const newMyEvents = data.getEventsByUserId;
        //
        //
        //     if (newEvents && newMyEvents) {
        //         const sortedEvents = newEvents.slice().sort((a: any, b: any) => {
        //             return new Date(a.date).getTime() - new Date(b.date).getTime();
        //         });
        //         const sortedMyEvents = newMyEvents.slice().sort((a: any, b: any) => {
        //             return new Date(a.date).getTime() - new Date(b.date).getTime();
        //         });
        //         setEvents(sortedEvents)
        //         setMyCreatedEvents(sortedMyEvents)
        //     }
        // }
    }, [infoProfile]);
    const logoutHandler = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }



    return (
        <div className="main">
            {infoProfile && (
                <>
                    {/*<BottomNavbar />*/}
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
                                <div className="profile__info-item"  style={{marginTop: "10px"}}>
                                    {/*<div className="profile__info-username">*/}
                                    {/*    <span className="profile__info-item-value">{infoProfile.username}</span>*/}
                                    {/*</div>*/}
                                    <Link to="/profile/edit"><Button color="primary" style={{fontWeight: 500}} startContent={<EditIconComponent />}>Edit profile</Button></Link>

                                </div>
                            </div>
                        </div>

                        <Tabs style={{marginTop: "150px", height: "40px"}} classNames={{
                            tab: "panel__tab",
                            tabContent: "panel__tab-content",
                        }} fullWidth={true} size="lg" aria-label="Options" color="primary" variant="bordered">
                            <Tab
                                key="photos"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <span>My created events</span>
                                        <Chip size="sm" color="default">{myCreatedEvents.length}</Chip>
                                    </div>
                                }
                            >

                                <div className="profile__list-events">
                                    <h2 className="profile__list-events__title">My created events</h2>
                                    {myCreatedEvents && myCreatedEvents.map((event: any, index) => (
                                            <CardEvent style={{marginBottom: "40px"}} key={index} data={event} />
                                        )
                                    )}
                                </div>

                            </Tab>
                            <Tab
                                key="music"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <span>My Attended events</span>
                                        <Chip size="sm" color="default">{events.length}</Chip>
                                    </div>
                                }
                            >
                                <div className="profile__attended-event">
                                        {events && events.map((event, index) => (
                                            <CardEventMinimized key={index} data={event} />
                                        ))}
                                </div>

                            </Tab>

                        </Tabs>


                    </div>
                </section>

                </>
            )}
        </div>
    );
};

export default ProfilePage;