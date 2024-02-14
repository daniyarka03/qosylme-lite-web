import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Button} from '@nextui-org/react';
import style from './EventPage.module.css';
import { SHOW_EVENT_BY_ID } from '../../graphQL/Queries';
import {DELETE_EVENT, UPDATE_EVENT_JOIN_FUNCTION} from '../../graphQL/Mutations';
import {useMutation, useQuery} from '@apollo/client';
import {useInfoProfile} from "../../hooks/useInfoProfile";
import ModalSuccessJoinedEvent from "../../components/ModalSuccessJoinedEvent/ModalSuccessJoinedEvent";
import {useModalSuccessJoinEventStore} from "../../store/store";
import ArrowBackIcon from "../../assets/ArrowBack.svg";
import LocationIcon from "../../assets/location-icon.svg";
import CalendarIcon from "../../assets/calendar-icon.svg";
import {useChangeFormatDate} from "../../hooks/useChangeFormatDate";
import GuestCardList from "../../components/GuestCardList/GuestCardList";

interface EventPageProps {
    eventId: number;
    name: string;
    description: string;
    imageCover: string;
    location: string;
    date: string;
    time: string;
    guests: string;
    authorEvent: {
        userId: number;
        firstname: string;
    }
}

const EventPage = () => {
    const { id } = useParams();
    // @ts-ignore
    if (id !== undefined) {
        const { error, loading, data } = useQuery(SHOW_EVENT_BY_ID, {
            variables: { eventId: parseInt(id) },
        });

    const [updateEventFunction, {data: data2}] = useMutation(UPDATE_EVENT_JOIN_FUNCTION);
    const [stateJoinText, setStateJoinText] = React.useState('Join Event');
    const [isAuthor, setIsAuthor] = React.useState(false);
    const [newDate, setNewDate] = React.useState('');
    const [newTime, setNewTime] = React.useState('');
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
    const [guestsList, setGuestsList] = React.useState<number[]>([]);
    useEffect(() => {
        if (data) {
            setEvent(data.eventById);
            setGuestsList(JSON.parse(data.eventById.guests));
            const dateEvent = new Date(data.eventById.date);
            const goodFormatDate = useChangeFormatDate({ date: dateEvent, language: 'en-US' });
            let parts = data.eventById.time.split(':');
            let hours = parts[0];
            let minutes = parts[1];
            let formattedTime = hours + ":" + minutes;
            setNewDate(goodFormatDate);
            setNewTime(formattedTime);
            if (profileData && data.eventById.authorEvent.userId === profileData.userId) {
                setIsAuthor(true);
            }
            if (profileData && JSON.parse(data.eventById.guests).includes(parseInt(profileData.userId))) {
                setStateJoinText('Leave Event')
            }
        }
    }, [data, profileData]);


    const handleDelete = async () => {
        try {
            const { data: deleteData } = await deleteEvent({
                variables: { eventId: id },
            });

            console.log('Deleted Event:', deleteData.deleteEvent);
            // Добавь обработку успешного удаления мероприятия
            // Перенаправление на главную страницу после удаления
            window.location.href = '/events';
        } catch (error: any) {
            console.error('Error deleting event:', error.message);
            // Добавь обработку ошибок
        }
    };

    const joinGuestHandler = async () => {
        const currentGuests = guestsList;
        console.log('currentGuests', currentGuests)
        if (currentGuests.includes(parseInt(profileData.userId))) {
            console.log('ОН УЖЕ В МЕРОПРИЯТИИ')
            try {
                const updatedGuests = currentGuests.filter((guest) => {
                    console.log("guest === profileData.userId", guest !== parseInt(profileData.userId))
                    return guest !== parseInt(profileData.userId)
                });
                const { data: joinData } = await updateEventFunction({
                    variables: { eventId: id, guests: updatedGuests },
                });

                setGuestsList(updatedGuests)
                setStateJoinText('Join Event')

                console.log("updatedGuests", updatedGuests)

            } catch (error: any) {
                console.error('Error joining event:', error.message);
            }
        } else {
            console.log('ОН НОВЫЙ')
            try {
                const updatedGuests = [...currentGuests, parseInt(profileData.userId)];
                console.log(updatedGuests)
                const { data: joinData } = await updateEventFunction({
                    variables: { eventId: id, guests: updatedGuests },
                });

                setGuestsList(updatedGuests)
                setStateJoinText('Leave Event')
                toggleModal();

            } catch (error: any) {
                console.error('Error joining event:', error.message);
            }
        }
    }

    return (
        <div className={`${style.eventBlock}`}>
            {isMobile && (<Link to={"/events"}><button className={style.eventButtonBack}><img src={ArrowBackIcon} /></button></Link>)}
            {event && (
                <>
                    <div className={style.cardBlock} style={{
                        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.92) 100%), url(${event.imageCover}) lightgray 50% / cover no-repeat`,
                        borderRadius: isMobile ? "0 0 30px 30px" : "20px"
                    }}>
                        <div className={style.cardEventBody}>
                            <div className={style.cardEventContent}>
                                <h1 className={style.cardEventTitle}>{event.name}</h1>
                            </div>
                        </div>
                    </div>

                    <div className={style.eventInfoBlock}>
                        <div className={style.eventInfoDate}>
                            <img src={CalendarIcon} />
                            <div>
                                <p className={style.eventInfoDateText}>{newDate}</p>
                                <p className={style.eventInfoTimeText}>{newTime}</p>
                            </div>
                        </div>
                        <div className={style.eventInfoLocation}>
                            <img src={LocationIcon} />
                            <p className={style.eventInfoLocationText}>{event.location}</p>
                        </div>
                    </div>

                    <div className={style.eventInfoBlock}>
                        <div className={style.eventInfoDescription}>
                            <h2 className={style.eventInfoDescriptionTitle}>About event</h2>
                            <p className={style.eventInfoDescriptionText}>{event.description}</p>
                        </div>
                    </div>

                    <div className={style.eventInfoBlock}>
                        <div className={style.eventInfoAuthor}>
                            <h2 className={style.eventInfoAuthorTitle}>Author</h2>
                            <GuestCardList guest={event.authorEvent.userId} />
                        </div>
                    </div>

                    <div className={style.eventInfoBlock}>
                        <div className={style.eventInfoAuthor}>
                            <h2 className={style.eventInfoAuthorTitle}>Guests</h2>
                            { event.guests && (
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

                    <div className={style.eventInfoBlock}>
                        <div className={style.eventInfoLocationSection}>
                            <h2 className={style.eventInfoLocationSectionTitle}>Location</h2>
                            <p className={style.eventInfoLocationSectionTextValue}>{event.location}</p>
                        </div>
                    </div>


                    <br />
                    <div className={isMobile ? style.eventControlBlockMobile : style.eventControlBlockDesktop}>
                        {isAuthor && (
                            <div className={style.eventInfoBlock}>
                                <Link to="./edit">
                                    <Button fullWidth={true} style={{
                                        height: "70px",
                                        fontWeight: "700",
                                        fontSize: "18px",
                                        borderRadius: "20px",
                                        marginBottom: "10px"
                                    }} color="primary">Edit info of Event</Button></Link>
                                <Button color="danger" fullWidth={true} style={{
                                    height: "70px",
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    borderRadius: "20px"
                                }} onClick={() => handleDelete()}>Delete Event</Button>
                            </div>
                        ) || (
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
                </>
            )}
        </div>
    );
    }
    return null;
};

export default EventPage;
