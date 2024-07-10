import React from 'react';
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import "./PartnerMenuPage.css";
import {Link} from "react-router-dom";
import CoffeePhoto from "../../assets/cafe_photo.jpg";

const PartnerMenuPage = () => {
    return (
       <>
           <div className="main partner-page">
               <div className="partner-page__type">
                   <span>Кофейня</span>
               </div>
               <h1 className="partner-page__title">Sholdeme</h1>
               <div className="partner-page__description">
                   <h2>Описание</h2>
                   <p>
                       Это изысканная кофейня с уютной атмосферой и великолепным видом на город. Здесь вы можете
                       насладиться вкусным кофе и приятной атмосферой.
                   </p>
               </div>
               <div className="partner-page__menu">
                   <h3 className="partner-page__subtitle">Закуски</h3>
                   <div className="partner-menu__partners">
                       <div className="partner-menu__partner">
                           <Link to="./product/1">
                               <img src={CoffeePhoto} alt="partner" className="partner-menu__partner-image"/>
                               <h2 className="partner-menu__partner-title">Сендвичь с индейкой</h2>
                               <div className="flex justify-between">
                                   <p className="partner-menu__partner-description">Фаст-фуд</p>
                                   <span className="partner-menu__partner-price">2490</span>
                               </div>
                           </Link>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                   </div>
                   <h3 className="partner-page__subtitle">Основные блюда</h3>
                   <div className="partner-menu__partners">
                       <div className="partner-menu__partner">
                           <Link to="./sholdeme">
                               <img src={CoffeePhoto} alt="partner" className="partner-menu__partner-image"/>
                               <h2 className="partner-menu__partner-title">Сендвичь с индейкой</h2>
                               <div className="flex justify-between">
                                   <p className="partner-menu__partner-description">Фаст-фуд</p>
                                   <span className="partner-menu__partner-price">2490</span>
                               </div>
                           </Link>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                   </div>
                   <h3 className="partner-page__subtitle">Напитки</h3>
                   <div className="partner-menu__partners">
                       <div className="partner-menu__partner">
                           <Link to="./sholdeme">
                               <img src="https://i.pinimg.com/originals/87/21/a7/8721a75d7368ed776d04be33adad9a58.jpg" alt="partner" className="partner-menu__partner-image"/>
                               <h2 className="partner-menu__partner-title">Фрапучино</h2>
                               <div className="flex justify-between">
                                   <p className="partner-menu__partner-description">Холодный кофе</p>
                                   <span className="partner-menu__partner-price">2490</span>
                               </div>
                           </Link>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                       <div className="partner-menu__partner">
                           <img src="https://via.placeholder.com/150" alt="partner"
                                className="partner-menu__partner-image"/>
                           <h2 className="partner-menu__partner-title">Название партнера</h2>
                           <p className="partner-menu__partner-description">Описание партнера</p>
                       </div>
                   </div>
               </div>
           </div>
       </>
    );
};

export default PartnerMenuPage;