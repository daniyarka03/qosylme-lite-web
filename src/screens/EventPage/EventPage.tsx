import React, { useEffect } from 'react';
import {json, Link, useParams} from 'react-router-dom';
import {Image, Button, Chip} from '@nextui-org/react';
import style from './EventPage.module.css';
import { SHOW_EVENT_BY_ID } from '../../graphQL/Queries';
import {DELETE_EVENT, UPDATE_EVENT_JOIN_FUNCTION} from '../../graphQL/Mutations';
import {useMutation, useQuery} from '@apollo/client';
import {useInfoProfile} from "../../hooks/useInfoProfile";
import ModalSuccessJoinedEvent from "../../components/ModalSuccessJoinedEvent/ModalSuccessJoinedEvent";
import {useModalLoadingStore, useModalSuccessJoinEventStore} from "../../store/store";
import ArrowIcon from "../../assets/arrow.svg";
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
    }, [data]);


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
        if (currentGuests.includes(parseInt(profileData.userId))) {
            //console.log('ОН УЖЕ В МЕРОПРИЯТИИ')
            try {
                const updatedGuests = currentGuests.filter((guest) => {
                    return guest === profileData.userId
                });
                const { data: joinData } = await updateEventFunction({
                    variables: { eventId: id, guests: updatedGuests },
                });

                setGuestsList(updatedGuests)
                setStateJoinText('Join Event')

            } catch (error: any) {
                console.error('Error joining event:', error.message);
            }
        } else {
            try {
                const updatedGuests = [...currentGuests, parseInt(profileData.userId)];
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
            {event && (
                <>
                    <div className={style.cardBlock} style={{
                        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.92) 100%), url(${event.imageCover}) lightgray 50% / cover no-repeat`
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
                            <p className={style.eventInfoAuthorText}>{event.authorEvent.firstname}</p>
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
                        <div className={style.eventInfoBlock}>
                            <Button fullWidth={true} style={{
                                height: "70px",
                                fontWeight: "700",
                                fontSize: "18px",
                                borderRadius: "20px"
                            }} className={style.eventBlockButton} color={stateJoinText === "Join Event" ? "primary" : "danger"} onClick={() => joinGuestHandler()}>{stateJoinText}</Button>
                        </div>
                        )}
                    <ModalSuccessJoinedEvent event={event} />
                </>
            )}
        </div>
    );
};

export default EventPage;
