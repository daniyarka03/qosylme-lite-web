import React from 'react';
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import "./PartnersPage.css";
import CoffeePhoto from "../../assets/cafe_photo.jpg";
import {Link} from "react-router-dom";

const PartnersPage = () => {
    return (
        <>
            <div className="main partners-page">
                <h1 className="partners-page__title">Наши партнерские заведения</h1>
                <div className="partners-page__partners">
                    <div className="partners-page__partner">
                        <Link to="./sholdeme">
                            <img src={CoffeePhoto} alt="partner" className="partners-page__partner-image"/>
                            <h2 className="partners-page__partner-title">Sholdeme</h2>
                            <p className="partners-page__partner-description">Кофейня</p>
                        </Link>
                    </div>
                    <div className="partners-page__partner">
                        <img src="https://via.placeholder.com/150" alt="partner"
                             className="partners-page__partner-image"/>
                        <h2 className="partners-page__partner-title">Название партнера</h2>
                        <p className="partners-page__partner-description">Описание партнера</p>
                    </div>
                    <div className="partners-page__partner">
                        <img src="https://via.placeholder.com/150" alt="partner" className="partners-page__partner-image"/>
                        <h2 className="partners-page__partner-title">Название партнера</h2>
                        <p className="partners-page__partner-description">Описание партнера</p>
                    </div>
                    <div className="partners-page__partner">
                        <img src="https://via.placeholder.com/150" alt="partner" className="partners-page__partner-image"/>
                        <h2 className="partners-page__partner-title">Название партнера</h2>
                        <p className="partners-page__partner-description">Описание партнера</p>
                    </div>
            </div>
            </div>
        </>
    );
};

export default PartnersPage;