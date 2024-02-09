import React, {useEffect} from 'react';
import CardEvent from "../../components/CardEvent/CardEvent";
import style from './EventListPage.module.css';
import {useQuery} from "@apollo/client";
import {SHOW_ALL_EVENTS} from "../../graphQL/Queries";
import {Input} from "@nextui-org/react";
const EventListPage = () => {

    const {error, loading, data} = useQuery(SHOW_ALL_EVENTS);
    const [events, setEvents] = React.useState([]);

    useEffect(() => {
        if (data) {
            setEvents(data.events);
            console.log(data.events)
        }
    }, [data]);

    return (
        <div className={style.main}>
            <h1 className={`text-primary mt-8 mb-6 ${style.title}`}>
                Event List Page
            </h1>

            <Input
                label="Search"
                isClearable
                radius="lg"
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focused=true]:bg-default-200/50",
                        "dark:group-data-[focused=true]:bg-default/60",
                        "!cursor-text",
                    ],
                }}
                placeholder="Type to search..."
                className={style.input_search}
            />

            <div className="flex flex-col items-center h-screen" style={{marginBottom: "100px"}}>
                {events.map((item, index) => (
                    <CardEvent style={{marginBottom: "40px"}} key={`${item}-${index}`} data={item} />
                ))}
            </div>

        </div>
    );
};

export default EventListPage;