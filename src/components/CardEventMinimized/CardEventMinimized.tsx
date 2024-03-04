import React from 'react';
import style from "./CardEventMinimized.module.css";
import {Link} from "react-router-dom";
import {useChangeFormatDate} from "../../hooks/useChangeFormatDate";

interface CardEventMinimizedProps {
    data: any;
}
const CardEventMinimized = ({data}: any) => {

    const dateEvent = new Date(data.date);
    const goodFormatDate = useChangeFormatDate({ date: dateEvent, language: 'en-UK' });
    const goodFormatDateSplit = goodFormatDate.split(" ");

    return (
        <div style={{margin: "0 auto"}}>
            <Link to={"/event/" + data.eventId} style={{width: "100%"}}>
                <div className={style.cardBlock} style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.62) 100%), url(${data.imageCover}) lightgray 50% / cover no-repeat`
                }}>
                    <div className={style.cardEventHeader}>
                        <div className={style.cardEventLocation}>
                            <div className={style.cardEventLocationIcon}>
                                <span className={style.cardEventLocationIconNumber}>{goodFormatDateSplit[0]}</span>
                                <span className={style.cardEventLocationIconMonth}>{goodFormatDateSplit[1]}</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.cardEventBody}>
                        <div className={style.cardEventContent}>
                            <h1 className={style.cardEventTitle}>{data.name}</h1>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardEventMinimized;