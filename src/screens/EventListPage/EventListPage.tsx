import React, {useEffect} from 'react';
import CardEvent from "../../components/CardEvent/CardEvent";
import style from './EventListPage.module.css';
import {useQuery} from "@apollo/client";
import {SHOW_ALL_EVENTS} from "../../graphQL/Queries";
import {Input, Skeleton} from "@nextui-org/react";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import searchIcon from "../../assets/Search.svg";
import settingsGray from "../../assets/settingGray.svg";


const EventListPage = () => {

    const {error, loading, data} = useQuery(SHOW_ALL_EVENTS, );
    const [events, setEvents] = React.useState<any>([]);
    const [isLoaded, setIsLoaded] = React.useState(false);



    useEffect(() => {
        if (data) {

            const sortedEvents = data.events.slice().sort((a: any, b: any) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });


            setEvents(sortedEvents);
            setIsLoaded(true);
        }
    }, [data]);

    return (
        <div className={style.main}>
            <div className={style.eventListHeader}>
                <h1 className={style.eventListTitle}>
                    Events
                </h1>

                <div className={style.eventListControls}>
                    <button className={style.eventListControlsButton}>
                        <img src={searchIcon} alt=""/>
                    </button>
                    <button className={style.eventListControlsButton}>
                        <img src={settingsGray} alt=""/>
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center h-screen" style={{marginBottom: "100px"}}>
                {events.map((item: any, index: number) => (
                    <CardEvent style={{marginBottom: "40px"}} key={`${item}-${index}`} data={item} />
                ))}
            </div>
            {/*<BottomNavbar />*/}

        </div>
    );
};

export default EventListPage;