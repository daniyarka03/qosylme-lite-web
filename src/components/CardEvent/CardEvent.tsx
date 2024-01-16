import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from "@nextui-org/react";
import photo from '../../assets/image.jpg';
import style from './CardEvent.module.css';
import { Link } from 'react-router-dom';
import LocationIcon from '../../assets/Location.svg';
import ArrowIcon from '../../assets/arrow.svg';
interface CardEventProps {
    style?: React.CSSProperties,
    data: {
        eventId: number,
        name: string,
        author: string,
        imageCover: string,
        location: string
    }
}
const CardEvent = ({data}: CardEventProps) => {

    const colors = [
        "#FF5593",
        "#FFE455",
        "#558FFF",
    ];

    // Calculate a random index
    const randomIndex = Math.floor(Math.random() * colors.length);
    // Pick a random color
    const randomColor = colors[randomIndex];

    const [isFollowed, setIsFollowed] = React.useState(false);
    return (
        <div className={style.cardBlock} style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.62) 100%), url(${data.imageCover}) lightgray 50% / cover no-repeat`
        }}>
            <div className={style.cardEventHeader}>
                <div className={style.cardEventLocation} style={{background: randomColor}}>
                    <div className={style.cardEventLocationIcon}>
                        <img src={LocationIcon}/>
                    </div>
                    <p className={style.cardEventLocationText} style={{color: 'rgba(0, 0, 0, .7)'}}>{data.location}</p>
                </div>
            </div>
            <div className={style.cardEventBody}>
                <div className={style.cardEventContent}>
                    <h1 className={style.cardEventTitle}>{data.name}</h1>
                    <p className={style.cardEventDate}>24 December</p>
                </div>
                <div className={style.cardEventActions}>
                    <Link to={"/event/" + data.eventId} replace><button className={style.cardEventActionButton}><img src={ArrowIcon} alt=""/></button></Link>
                </div>

            </div>
        </div>
    );
};

export default CardEvent;