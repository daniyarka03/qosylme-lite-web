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

interface EventPageProps {
    eventId: number;
    name: string;
    description: string;
    imageCover: string;
    location: string;
    date: string;
    time: string;
    guests: string;
}

const EventPage = () => {
    const { id } = useParams();
    const { error, loading, data } = useQuery(SHOW_EVENT_BY_ID, {
        variables: { eventId: parseInt(id) }, // Convert id to integer if needed
    });
    const [updateEventFunction, {data: data2}] = useMutation(UPDATE_EVENT_JOIN_FUNCTION);
    const [stateJoinText, setStateJoinText] = React.useState('Join Event');
    const [isAuthor, setIsAuthor] = React.useState(false);

    const profileData = useInfoProfile();
    const {toggleModal} = useModalSuccessJoinEventStore();

    const [event, setEvent] = React.useState<EventPageProps | null>(null);
    const [deleteEvent, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_EVENT);
    const [guestsList, setGuestsList] = React.useState<number[]>([]);
    useEffect(() => {
        if (data) {
            setEvent(data.eventById);
            setGuestsList(JSON.parse(data.eventById.guests));

            if (profileData && data.eventById.authorEvent.userId === profileData.userId) {
                setIsAuthor(true);
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
                    <Image alt="event image" src={event.imageCover} className={style.eventImage} />
                    <h1 className={style.eventTitle}>{event.name}</h1>
                    <p>{event.description}</p>
                    {event.guests && (
                        <>
                            {
                                guestsList.length > 0 && (
                                    <div>
                                        <h2>Guests:</h2>
                                        {guestsList.map((guest: number) => (
                                            <Chip color="primary" size="sm" style={{ margin: "5px" }}>
                                                {guest}
                                            </Chip>
                                        ))}
                                    </div>
                                )
                            }
                        </>)
                    }
                    <br />
                    {isAuthor && (
                        <div className="row">
                            <Link to="./edit"><Button color="primary" className="ml-2">Edit info of Event</Button></Link>
                            <Button color="danger" onClick={() => handleDelete()}>Delete Event</Button>
                        </div>
                    ) || (
                        <div className="row">
                            <Button color={stateJoinText === "Join Event" ? "primary" : "danger"} onClick={() => joinGuestHandler()}>{stateJoinText}</Button>
                        </div>
                        )}
                    <ModalSuccessJoinedEvent event={event} />
                </>
            )}
        </div>
    );
};

export default EventPage;
