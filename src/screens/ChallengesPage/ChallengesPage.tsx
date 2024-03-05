import React from 'react';
import "./ChallengesPage.css";
import {Button} from "@nextui-org/react";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import CloudImage from "../../assets/cloud.png";
import ScientistImage from "../../assets/scientist.png";
const ChallengesPage = () => {
    return (
        <>
            <div className={"challenges-page"}>
                <h2 className="challenges-page__title">Challenges</h2>
                <div className="challenges-page__content">
                    <div className="challenges-page__without">
                        <img className="challenges-page__cloud-image" src={ScientistImage} />
                        <h2>Challenges in development</h2>
                        <p>
                            Our scientists are carefully creating you exciting Challenges, wait and soon you will be able to immerse yourself in a world of activity</p>
                    </div>
                </div>
            </div>
            <BottomNavbar />
        </>
    );
};

export default ChallengesPage;