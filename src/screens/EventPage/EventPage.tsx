import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Button} from '@nextui-org/react';
import style from './EventPage.module.css';
import { SHOW_EVENT_BY_ID } from '../../graphQL/Queries';
import {
    ADD_GUEST_TO_EVENT,
    DELETE_EVENT,
    DELETE_GUEST_FROM_EVENT,
    UPDATE_EVENT_JOIN_FUNCTION
} from '../../graphQL/Mutations';
import {useMutation, useQuery} from '@apollo/client';
import {useInfoProfile} from "../../hooks/useInfoProfile";
import ModalSuccessJoinedEvent from "../../components/ModalSuccessJoinedEvent/ModalSuccessJoinedEvent";
import {useModalEventSettingsStore, useModalSuccessJoinEventStore} from "../../store/store";
import ArrowBackIcon from "../../assets/ArrowBack.svg";
import LocationIcon from "../../assets/location-icon.svg";
import CalendarIcon from "../../assets/calendar-icon.svg";
import {useChangeFormatDate} from "../../hooks/useChangeFormatDate";
import GuestCardList from "../../components/GuestCardList/GuestCardList";
import CardEventPropertyBlock from "../../components/CardEventPropertyBlock/CardEventPropertyBlock";
import LocationRedColor from "../../assets/LocationRedColor.svg";
import TimeCircleBlue from "../../assets/TimeCircleBlueColor.svg";
import EventSettingsModal from "../../components/EventSettingsModal/EventSettingsModal";
import { Clipboard } from '@capacitor/clipboard'; // Import the Clipboard plugin
import ChangeSettingsPrivacyEventModal
    from "../../components/ChangeSettingsPrivacyEventModal/ChangeSettingsPrivacyEventModal";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";





interface EventPageProps {
    eventId: number;
    name: string;
    description: string;
    image_cover: string;
    location: string;
    date: string;
    time: string;
    guests: {
        user_id: string;
        firstname: string;
        lastname: string;
        email: string;
    }[];
    author_event: string;
    authorEvent: {
        userId: number;
        firstname: string;
    }
}

interface Guest {
    user_id: string;
    firstname: string;
    lastname: string;
    email: string;
}



const EventPage = () => {
    const { id } = useParams();
    // @ts-ignore
    if (id !== undefined) {
        const { error, loading, data } = useQuery(SHOW_EVENT_BY_ID, {
            variables: { eventId: id },
        });
    const {toggleModal: toggleEventSettingsModal} = useModalEventSettingsStore();
    const [updateEventFunction, {data: data2}] = useMutation(UPDATE_EVENT_JOIN_FUNCTION);
    const [stateJoinText, setStateJoinText] = React.useState('Join Event');
    const [isAuthor, setIsAuthor] = React.useState(false);
    const [newDate, setNewDate] = React.useState('');
    const [newTime, setNewTime] = React.useState('');
    const [shareEventValue, setShareEventValue] = React.useState('Share Event');
    const profileData = useInfoProfile();
    const {toggleModal} = useModalSuccessJoinEventStore();
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

    const [event, setEvent] = React.useState<EventPageProps | null>(null);
    const [deleteEvent, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_EVENT);
    const [updateGuestsEvent, { loading: updateLoading, error: updateError }] = useMutation(ADD_GUEST_TO_EVENT);
    const [deleteGuestsEvent, { loading: deleteGuestsLoading, error: deleteGuestsError }] = useMutation(DELETE_GUEST_FROM_EVENT);
    const [guestsList, setGuestsList] = React.useState<number[]>([]);
    useEffect(() => {
        if (data) {
            const event = data.getEventById;
            setEvent(event);
            setGuestsList(event.guests);
            const dateEvent = new Date(event.date);
            const goodFormatDate = useChangeFormatDate({ date: dateEvent, language: 'en-US', monthFormat: 'long' });
            let parts = event.time.split(':');
            let hours = parts[0];
            let minutes = parts[1];
            let formattedTime = hours + ":" + minutes;
            setNewDate(goodFormatDate);
            setNewTime(formattedTime);
            if (event && profileData && event.author_event.user_id === profileData.user_id) {
                setIsAuthor(true);
            } else {
                if (profileData && event.guests.find((guest: any) => guest.user_id === profileData.user_id)) {
                    setStateJoinText('Leave Event')
                } else {
                    setStateJoinText('Join Event')
                }
            }
            // const myGuest = event && event.guests && event.guests.find(guest => guest.user_id === profileData.user_id);
            // if (profileData && event.guests.includes((profileData.user_id)) {
            //     setStateJoinText('Leave Event')
            // }
        }
    }, [data, profileData]);



    const handleDelete = async () => {
        try {
            const { data: deleteData } = await deleteEvent({
                variables: { eventId: id },
            });


            window.location.href = '/events';
        } catch (error: any) {
            console.error('Error deleting event:', error.message);
            // Добавь обработку ошибок
        }
    };

    const joinGuestHandler = async  () => {

        const currentGuests = guestsList;


        if (currentGuests && currentGuests.find((guest: any) => guest.user_id === profileData.user_id)) {
            const { data: deleteData } = await deleteGuestsEvent({
                variables: { eventId: id, guestId: profileData.user_id },
            });
            if (deleteData && deleteData.deleteEventGuest) {
                setGuestsList(deleteData.deleteEventGuest.guests);
                toast.success("You left from event", {
                    position: "top-center",
                    autoClose: 1500,
                });
            }
            setStateJoinText('Join Event');
        }

        if (currentGuests && !currentGuests.find((guest: any) => guest.user_id === profileData.user_id)) {
            const { data: joinData } = await updateGuestsEvent({
                variables: { eventId: id, guests: [profileData.user_id] },
            });
            if (joinData && joinData.updateEventGuests) {
                setGuestsList(joinData.updateEventGuests.guests);
                toggleModal();
            }
            setStateJoinText('Leave Event');
        }
    }





        const handleGoogleMapsClick = (location: any) => {
            const formattedAddress = encodeURIComponent(location);
            window.open(`https://www.google.com/maps/search/?api=1&query=${formattedAddress}`, '_blank');
        };




        const shareEventHandler = async () => {
            const currentUrl = window.location.href;
            await Clipboard.write({
                string: currentUrl
            });
            toast.info("URL copied!", {
                position: "top-center",
                autoClose: 1500,
            });
            setShareEventValue('Copied URL');
        }



    return (
        <div className={`${style.eventBlock}`}>
            {isMobile && (<Link to={"/events"}><button className={style.eventButtonBack}><img src={ArrowBackIcon} /></button></Link>)}
            {event && (
                <>
                    <div className={style.cardBlock} style={{
                        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.92) 100%), url(${event.image_cover}) lightgray 50% / cover no-repeat`,
                        borderRadius: isMobile ? "0 0 30px 30px" : "20px"
                    }}>
                        <div className={style.cardEventBody}>
                            <div className={style.cardEventContent}>
                                <h1 className={style.cardEventTitle}>{event.name}</h1>
                            </div>
                        </div>
                    </div>

                    <div className={style.eventInfoBlock}>
                        <Button
                            color="primary"
                            style={{  width: "100%",
                                height: "70px",
                                fontWeight: "700",
                                fontSize: "20px",
                                borderRadius: "20px",
                                border: "2px solid #fff",
                                marginTop: "20px",
                            }}
                            onClick={() => shareEventHandler()}
                        >{shareEventValue}</Button>
                    </div>

                    {isAuthor && (
                        <div className={style.eventInfoBlock}>
                            <Button
                                color="primary"
                                style={{  width: "100%",
                                    height: "70px",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    borderRadius: "20px",
                                    border: "2px solid #fff",
                                    marginTop: "20px",
                                }}
                                onClick={() => toggleEventSettingsModal()}
                            >Event settings</Button>
                        </div>
                    )}



                    <div className={style.eventInfoBlock} style={{display: "flex", marginTop: "20px"}}>
                        <CardEventPropertyBlock valueButton="Open Maps" value={(event.location).split(",")[0]} toggleModal={() => handleGoogleMapsClick(event.location)} label={"location"} icon={LocationRedColor} />
                        <CardEventPropertyBlock withButton={false} value={newDate} value2={newTime} toggleModal={() => alert('321')} label={"date"} icon={TimeCircleBlue} />
                    </div>

                    <div className={style.eventInfoBlock}>
                        <div className={style.eventInfoDescription}>
                            <h2 className={style.eventInfoDescriptionTitle}>About event</h2>
                            <p style={{ whiteSpace: 'pre-wrap' }} className={style.eventInfoDescriptionText}>{event.description}</p>
                        </div>
                    </div>

                    <div className={style.eventInfoBlock}>
                        <div className={style.eventInfoAuthor}>
                            <h2 className={style.eventInfoAuthorTitle}>Organizer</h2>
                            <GuestCardList guest={event.author_event} />
                        </div>
                    </div>

                    <div className={style.eventInfoBlock}>
                        <div className={style.eventInfoAuthor}>
                            <h2 className={style.eventInfoAuthorTitle}>Guests</h2>
                            {event.guests && (
                                <>
                                    {
                                        guestsList.length > 0 && (
                                            <div>
                                                {guestsList.map((guest: number) => (
                                                    <GuestCardList guest={guest} />
                                                ))}
                                            </div>
                                        )
                                    }
                                </>)
                            }
                        </div>
                    </div>

                    <br />
                    <div className={isMobile ? style.eventControlBlockMobile : style.eventControlBlockDesktop}>
                        {!isAuthor && (
                            <div className={style.eventControlSubblock}>
                                <div className={style.eventControlCountGuests}>
                                    <h2>Бесплатно</h2>
                                    <p>Количество гостей: {guestsList.length}</p>
                                </div>
                                <Button  style={{
                                    width: "45%",
                                    height: "70px",
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    borderRadius: "20px",
                                    border: "2px solid #fff"
                                }}  className={style.eventBlockButton} color={stateJoinText === "Join Event" ? "primary" : "danger"} onClick={() => joinGuestHandler()}>{stateJoinText}</Button>
                            </div>
                        )}
                    </div>
                    <ModalSuccessJoinedEvent event={event} />
                    <EventSettingsModal />
                    <ChangeSettingsPrivacyEventModal />
                    <ToastContainer limit={1} />
                </>
            )}
        </div>
    );
    }
    return null;
};

export default EventPage;
