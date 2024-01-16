import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from '@nextui-org/react';
import photo from '../../assets/image.jpg';
import style from './EventPage.module.css';
import { SHOW_EVENT_BY_ID } from '../../graphQL/Queries';
import { useQuery } from '@apollo/client';

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

    const [event, setEvent] = React.useState<EventPageProps | null>(null);

    useEffect(() => {
        if (data) {
            setEvent(data.eventById);
        }
    }, [data]);

    return (
        <div className={`${style.eventBlock}`}>
            {event && (
                <>
                    <Image alt="event image" src={event.imageCover} className={style.eventImage} />
                    <h1 className={style.eventTitle}>{event.name}</h1>
                    <p>{event.description}</p>
                    <br />
                    <Button color="primary">Join Event</Button>
                </>
            )}
        </div>
    );
};

export default EventPage;
