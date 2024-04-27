import React, {useEffect} from 'react';
import "./ChallengeCard.css";
import {useChangeFormatDate} from "../../hooks/useChangeFormatDate";
import Logo from "../../assets/Logo.png";
import {Link} from "react-router-dom";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {Chip} from "@nextui-org/react";

interface ChallengeCardProps {
    challenge_id: number;
    title: string;
    description: string;
    deadline: string;
    xp: number;
    coins: number;
    image_cover: string;
    participants?: any;
    result_state?: string;
}
const ChallengeCard = ({title, description, deadline, xp, coins, image_cover, challenge_id, participants, result_state}: ChallengeCardProps) => {
    const dateEvent = new Date(deadline);
    const profileData = useInfoProfile();
    const goodFormatDate = useChangeFormatDate({ date: dateEvent, language: 'en-US' });
    const splittedDate = goodFormatDate.split(' ');
    const participantsChallenge = participants;
    const [resultState, setResultState] = React.useState<any>(null);
    const [result, setResult] = React.useState<any>(null);
    useEffect(() => {
        if (participantsChallenge && profileData) {
            const currentUserParticipiantId = participantsChallenge.filter((item: any) => {
                if (item.user.user_id === profileData.user_id) {
                    return item.participated_id;
                }
            });

                if (currentUserParticipiantId.length == 0) {
                    setResult("Not started");
                } else {
                    setResult(currentUserParticipiantId[0].result_state);
                }
        }

        if (result_state) {
            console.log(result_state)
            setResult(result_state);
        }
    }, []);

    return (
        <Link to={`/challenge/${challenge_id}`}>
            <div className="challenge-card" style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.40) 40%, rgba(0, 0, 0, 0.62) 100%), url(${image_cover}) lightgray 50% / cover no-repeat`
            }}>
                <div className="challenge-card__header">
                    <div className="challenge-card__status">
                        {result && (
                            <Chip
                                className="challenge-card__status-value"
                                color={result === "In review" ? "primary" : (result === "Completed" ? "success" : "warning")}
                            >
                                {result}
                            </Chip>
                        )}
                    </div>
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