import React from 'react';
import "./ChallengesPage.css";
import {Button} from "@nextui-org/react";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import CloudImage from "../../assets/cloud.png";
import ScientistImage from "../../assets/scientist.png";
import {useQuery} from "@apollo/client";
import {GET_CHALLENGES} from "../../graphQL/Queries";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
import {motion} from "framer-motion";

const ChallengesPage = () => {
    const {data} = useQuery(GET_CHALLENGES);
    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]}}
                className={"challenges-page"}>
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
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.8,
                        ease: [0, 0.71, 0.2, 1.01]}}
                    className="challenges-page__with-content">
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
                </motion.div>
            </motion.div>
            <BottomNavbar />
        </>
    );
};

export default ChallengesPage;