import React, {useEffect, useState} from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button, Skeleton} from "@nextui-org/react";
import photo from '../../assets/image.jpg';
import style from './CardEvent.module.css';
import { Link } from 'react-router-dom';
import LocationIcon from '../../assets/Location.svg';
import ArrowIcon from '../../assets/arrow.svg';
import {useChangeFormatDate} from "../../hooks/useChangeFormatDate";
import {motion} from "framer-motion";
interface CardEventProps {
    style?: React.CSSProperties,
    data: {
        eventId: number,
        name: string,
        author: string,
        imageCover: string,
        location: string,
        date: string,
    }
}
const CardEvent = ({data}: CardEventProps) => {

    const colors = [
        "#FF5593",
        "#FFE455",
        "#558FFF",
    ];

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (data) {
            setIsLoaded(true);
        }
    }, [data]);

    const [isMobile, setIsMobile] = useState(false);
    const detectDeviceType = () => {
        setIsMobile(window.innerWidth <= 768); // Примерный порог для мобильных устройств
    };

    // Calculate a random index
    const randomIndex = Math.floor(Math.random() * colors.length);
    // Pick a random color
    const randomColor = colors[randomIndex];

    const dateEvent = new Date(data.date);
    const goodFormatDate = useChangeFormatDate({ date: dateEvent, language: 'en-US' });

    const [isFollowed, setIsFollowed] = React.useState(false);
    useEffect(() => {
        detectDeviceType();
        // Добавляем прослушиватель изменения размера окна для реакции на изменение типа устройства
        window.addEventListener('resize', detectDeviceType);
        // Убираем прослушиватель при размонтировании компонента
        return () => window.removeEventListener('resize', detectDeviceType);
    }, []);

    if (isMobile != null) {

        return isMobile ?
            mobileVersionView({isLoaded, data, randomColor, goodFormatDate, style, LocationIcon, ArrowIcon, Link})
            :
            desktopVersionView({isLoaded, data, randomColor, goodFormatDate, style, LocationIcon, ArrowIcon, Link});
    } else {
        return null;
    }
};

function mobileVersionView({isLoaded, data, randomColor, goodFormatDate, style, LocationIcon, ArrowIcon, Link}: any) {
    return (
        <Link to={"/event/" + data.event_id} style={{width: "100%"}}>
            <div
                className={style.cardBlock} style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.62) 100%), url(${data.image_cover}) lightgray 50% / cover no-repeat`
            }}>
                <div className={style.cardEventHeader}>
                    <div className={style.cardEventLocation} style={{background: randomColor}}>
                        <div className={style.cardEventLocationIcon}>
                            <img src={LocationIcon}/>
                        </div>
                        <p className={style.cardEventLocationText} style={{color: 'rgba(0, 0, 0, .7)'}}>{goodFormatDate}</p>
                    </div>
                </div>
                <div className={style.cardEventBody}>
                    <div className={style.cardEventContent}>
                        <h1 className={style.cardEventTitle}>{data.name}</h1>
                        <p className={style.cardEventDate}>{(data.location).split(",")[0]}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

function desktopVersionView({isLoaded, data, randomColor, goodFormatDate, style, LocationIcon, ArrowIcon, Link}: any) {
    return (
        <div className={style.cardBlock} style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.62) 100%), url(${data.image_cover}) lightgray 50% / cover no-repeat`
        }}>
            <div className={style.cardEventHeader}>
                <div className={style.cardEventLocation} style={{background: randomColor}}>
                    <div className={style.cardEventLocationIcon}>
                        <img src={LocationIcon}/>
                    </div>
                    <p className={style.cardEventLocationText} style={{color: 'rgba(0, 0, 0, .7)'}}>{goodFormatDate}</p>
                </div>
            </div>
            <div className={style.cardEventBody}>
                <div className={style.cardEventContent}>
                    <h1 className={style.cardEventTitle}>{data.name}</h1>
                    <p className={style.cardEventDate}>{(data.location).split(",")[0]}</p>
                </div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={style.cardEventActions}>
                    <Link to={"/event/" + data.event_id} replace><button className={style.cardEventActionButton}><img src={ArrowIcon} alt=""/></button></Link>
                </motion.div>
            </div>
        </div>
    )
}

export default CardEvent;