import React from 'react';
import "./ChallengeCard.css";
import {useChangeFormatDate} from "../../hooks/useChangeFormatDate";
import Logo from "../../assets/Logo.png";
import {Link} from "react-router-dom";

interface ChallengeCardProps {
    challenge_id: number;
    title: string;
    description: string;
    deadline: string;
    xp: number;
    coins: number;
    image_cover: string;
}
const ChallengeCard = ({title, description, deadline, xp, coins, image_cover, challenge_id}: ChallengeCardProps) => {
    console.log(title)
    const dateEvent = new Date(deadline);
    const goodFormatDate = useChangeFormatDate({ date: dateEvent, language: 'en-US' });
    const splittedDate = goodFormatDate.split(' ');
    return (
        <Link to={`/challenge/${challenge_id}`}>
            <div className="challenge-card" style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.40) 40%, rgba(0, 0, 0, 0.62) 100%), url(${image_cover}) lightgray 50% / cover no-repeat`
            }}>
                <div className="challenge-card__header">
                    <div className="challenge-card__date">
                        <p className="challenge-card__date-number">{splittedDate[1]}</p>
                        <p className="challenge-card__date-month">{splittedDate[0]}</p>
                    </div>
                </div>
                <div className="challenge-card__content">
                    <p className="challenge-card__coins"><img src={Logo} />{coins} qcoins</p>
                    <h2 className="challenge-card__title">{title}</h2>
                </div>
            </div>
        </Link>
    );
};

export default ChallengeCard;