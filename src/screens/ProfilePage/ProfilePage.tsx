import React, {useEffect} from 'react';
import "./ProfilePage.css";
import {Button, Image} from "@nextui-org/react";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {useQuery} from "@apollo/client";
import {GET_CURRENT_USER} from "../../graphQL/Queries";
import {Link} from "react-router-dom";

const ProfilePage = () => {

    const infoProfile = useInfoProfile();
9
    const logoutHandler = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <div className="main">
            {infoProfile && (
                <>
                <h2>Profile</h2>
                <section className="section-profile">
                    <div className="container">
                        <div className="profile">
                            <div className="profile__image">
                                <Image
                                    width={300}
                                    height={200}
                                    alt="NextUI hero Image with delay"
                                    src="https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                                />
                            </div>
                            <div className="profile__info">
                                <div className="profile__info-item">
                                    <span className="profile__info-item-title">Name: </span>
                                    <span className="profile__info-item-value">{infoProfile.firstname + " " + infoProfile.lastname}</span>
                                </div>
                                <div className="profile__info-item">
                                    <span className="profile__info-item-title">Email:</span>
                                    <span className="profile__info-item-value">{infoProfile.email}</span>
                                </div>
                            </div>
                            <div className="profile__settings">
                               <Link to={"/settings"}><Button color="primary" className="btn__settings">Settings</Button></Link>
                            </div>
                            <div className="profile__logout">
                                <Button color="danger" className="btn__logout" onClick={logoutHandler}>Logout</Button>
                            </div>
                        </div>
                    </div>
                </section>
                </>
            )}
        </div>
    );
};

export default ProfilePage;