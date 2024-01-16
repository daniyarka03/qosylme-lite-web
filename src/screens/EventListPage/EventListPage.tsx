import React, {useEffect} from 'react';
import CardEvent from "../../components/CardEvent/CardEvent";
import style from './EventListPage.module.css';
import {useQuery} from "@apollo/client";
import {SHOW_ALL_EVENTS} from "../../graphQL/Queries";
const EventListPage = () => {

    const {error, loading, data} = useQuery(SHOW_ALL_EVENTS);
    const [events, setEvents] = React.useState([]);

    useEffect(() => {
        if (data) {
            setEvents(data.events);
            console.log(data.events)
        }
    }, [data]);

    const dataEvent = [
        {
            id: 1,
            title: "Concert",
            author: "Author 1",
            eventImage: "https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: "O2 Arena"
        },
        {
            id: 2,
            title: "Собираемся в горы на выходных",
            author: "Author 2",
            eventImage: "https://images.unsplash.com/photo-1503401639559-b16332601594?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: "Mountains"
        },
        {
            id: 3,
            title: "Hiking",
            author: "Author 2",
            eventImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            location: "Mountains"
        },
    ];

    return (
        <div className={style.main}>
            <h1 className={`text-primary mt-8 mb-6 ${style.title}`}>
                Event List Page
            </h1>

            <div className="flex flex-col items-center h-screen">
                {events.map((item, index) => (
                    <CardEvent style={{marginBottom: "40px"}} key={`${item}-${index}`} data={item} />
                ))}
            </div>

        </div>
    );
};

export default EventListPage;