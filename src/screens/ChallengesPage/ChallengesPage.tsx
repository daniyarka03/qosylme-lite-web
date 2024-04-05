import React from 'react';
import "./ChallengesPage.css";
import {Button} from "@nextui-org/react";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import CloudImage from "../../assets/cloud.png";
import ScientistImage from "../../assets/scientist.png";
import {useQuery} from "@apollo/client";
import {GET_CHALLENGES} from "../../graphQL/Queries";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
const ChallengesPage = () => {
    const {data} = useQuery(GET_CHALLENGES);
    return (
        <>
            <div className={"challenges-page"}>
                <h2 className="challenges-page__title">Challenges</h2>
                <div className="challenges-page__content">
                    {!data && (
                    <div className="challenges-page__without">
                                <img className="challenges-page__cloud-image" src={ScientistImage} />
                                <h2>Challenges in development</h2>
                                <p>
                                    Our scientists are carefully creating you exciting Challenges, wait and soon you will be able to immerse yourself in a world of activity</p>
                    </div>
                    )}
                </div>
                <div className="challenges-page__with-content">
                    {data && data.getChallenges.map((challenge: any) => (
                            <ChallengeCard
                                challenge_id={challenge.challenge_id}
                                title={challenge.name}
                                description={challenge.description}
                                deadline={challenge.deadline}
                                xp={challenge.xp_award}
                                coins={challenge.coins_award}
                                image_cover={challenge.image_cover}
                            />
                    ))}
                </div>
            </div>
            <BottomNavbar />
        </>
    );
};

export default ChallengesPage;