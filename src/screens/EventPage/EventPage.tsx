import React, { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import { Image, Button } from '@nextui-org/react';
import style from './EventPage.module.css';
import { SHOW_EVENT_BY_ID } from '../../graphQL/Queries';
import { DELETE_EVENT } from '../../graphQL/Mutations';
import {useMutation, useQuery} from '@apollo/client';
import {useInfoProfile} from "../../hooks/useInfoProfile";

interface EventPageProps {
    eventId: number;
    name: string;
    description: string;
    imageCover: string;
    location: string;
    date: string;
    time: string;
}

const EventPage = () => {
    const { id } = useParams();
    const { error, loading, data } = useQuery(SHOW_EVENT_BY_ID, {
        variables: { eventId: id }, // Convert id to integer if needed
    });

    const [isAuthor, setIsAuthor] = React.useState(false);

    const profileData = useInfoProfile();

    const [event, setEvent] = React.useState<EventPageProps | null>(null);
    const [deleteEvent, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_EVENT);
    useEffect(() => {
        if (data) {
            setEvent(data.eventById);
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


    return (
        <div className={`${style.eventBlock}`}>
            {event && (
                <>
                    <Image alt="event image" src={event.imageCover} className={style.eventImage} />
                    <h1 className={style.eventTitle}>{event.name}</h1>
                    <p>{event.description}</p>
                    <br />
                    {isAuthor && (
                        <div className="row">
                            <Link to="./edit"><Button color="primary" className="ml-2">Edit info of Event</Button></Link>
                            <Button color="danger" onClick={() => handleDelete()}>Delete Event</Button>
                        </div>
                    ) || (
                        <div className="row">
                            <Button color="primary">Join Event</Button>
                        </div>
                        )}
                </>
            )}
        </div>
    );
};

export default EventPage;
