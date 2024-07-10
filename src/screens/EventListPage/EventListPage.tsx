import React, {useEffect} from 'react';
import CardEvent from "../../components/CardEvent/CardEvent";
import style from './EventListPage.module.css';
import {useQuery} from "@apollo/client";
import {SHOW_ALL_EVENTS} from "../../graphQL/Queries";
import {Input, Skeleton} from "@nextui-org/react";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import searchIcon from "../../assets/Search.svg";
import settingsGray from "../../assets/SettingGray.svg";
import { motion } from "framer-motion";

const EventListPage = () => {

    const {error, loading, data} = useQuery(SHOW_ALL_EVENTS);
    const [events, setEvents] = React.useState<any>([]);
    const [isLoaded, setIsLoaded] = React.useState(false);



    useEffect(() => {
        if (data) {
            const sortedEvents = data.getEvents.slice().sort((a: any, b: any) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });

            // Фильтруем события, оставляя только те, у которых isPrivate === false
            const publicEvents = sortedEvents.filter((event: any) => !event.isPrivate);

            setEvents(publicEvents);
            setIsLoaded(true);
        }
    }, [data]);

    return (

        <motion.div
            className={style.main}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
        }}>
            <div className={style.eventListHeader}>
                <h1 className={style.eventListTitle}>
                    Events
                </h1>

                {/*<div className={style.eventListControls}>*/}
                {/*    <button className={style.eventListControlsButton}>*/}
                {/*        <img src={searchIcon} alt=""/>*/}
                {/*    </button>*/}
                {/*    <button className={style.eventListControlsButton}>*/}
                {/*        <img src={settingsGray} alt=""/>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>

            <motion.div  initial={{ opacity: 0, scale: 0.5 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{
                             duration: 0.8,
                             delay: 0.7,
                             ease: [0, 0.71, 0.2, 1.01]
                         }}  className="flex flex-col items-center h-screen" style={{marginBottom: "400px"}}>
                {events.map((item: any, index: number) => (
                  <>
                      <CardEvent style={{marginBottom: "40px"}} key={`${item}-${index}`} data={item} />
                  </>
                ))}
            </motion.div>
            {/*<BottomNavbar />*/}

        </motion.div>
    );
};

export default EventListPage;
