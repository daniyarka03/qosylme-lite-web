import React, {useEffect} from 'react';
import "./ProfilePage.css";
import {Button, Chip, Image, Tab, Tabs} from "@nextui-org/react";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {useQuery} from "@apollo/client";
import {GET_CURRENT_USER, SHOW_ALL_EVENTS} from "../../graphQL/Queries";
import {Link} from "react-router-dom";
import CardEvent from "../../components/CardEvent/CardEvent";

const ProfilePage = () => {

    const infoProfile = useInfoProfile();
    const allEvents = useQuery(SHOW_ALL_EVENTS);
    const [events, setEvents] = React.useState([]);
    const [myCreatedEvents, setMyCreatedEvents] = React.useState([]);

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
    }, [allEvents]);
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
                <h2>Profile</h2>
                <section className="section-profile">
                    <div className="container">
                        <div className="profile">
                            <div className="profile__image">
                                <Image
                                    width={300}
                                    height={200}
                                    alt="NextUI hero Image with delay"
                                    src="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                                />
                            </div>
                            <div className="profile__info">
                                <div className="profile__info-item">
                                    <span className="profile__info-item-title">Name: </span>
                                    <span className="profile__info-item-value">{infoProfile.firstname + " " + infoProfile.lastname}</span>
                                </div>
                                <div className="profile__info-item">
                                    <span className="profile__info-item-title">Email:</span>
                                    <span className="profile__info-item-value">{infoProfile.email}</span>
                                </div>
                            </div>
                            <div className="profile__settings">
                               <Link to={"/settings"}><Button color="primary" className="btn__settings">Settings</Button></Link>
                            </div>
                            <div className="profile__logout">
                                <Button color="danger" className="btn__logout" onClick={logoutHandler}>Logout</Button>
                            </div>
                        </div>

                        <Tabs aria-label="Options" color="primary" variant="bordered">
                            <Tab
                                key="photos"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <span>My created events</span>
                                        <Chip size="sm" color="default">9</Chip>
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
                                        <Chip size="sm" color="default">9</Chip>
                                    </div>
                                }
                            >
                                <div className="profile__list-events">
                                    <h2 className="profile__list-events__title">My next attended events</h2>
                                    {events && events.map((event: any, index) => (
                                            <CardEvent style={{marginBottom: "40px"}} key={index} data={event} />
                                        )
                                    )}
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