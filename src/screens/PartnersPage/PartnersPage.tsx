import React, {useEffect} from 'react';
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import "./PartnersPage.css";
import CoffeePhoto from "../../assets/cafe_photo.jpg";
import {Link} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ALL_SHOPS} from "../../graphQL/Queries";

const PartnersPage = () => {

    const [shops, setShops] = React.useState([])
    const {data} = useQuery(GET_ALL_SHOPS);
    useEffect(() => {
        if (data) {
            setShops(data.getShops)
        }
    }, [data]);

    return (
        <>
            <div className="main partners-page">
                <h1 className="partners-page__title">Наши партнерские заведения</h1>
                <div className="partners-page__partners">
                    {shops.map((shop: any) => (

                            <div className="partners-page__partner">
                                <Link to={`/partners/${shop.shop_id}`}>
                                <img className="partners-page__partner-image" src={CoffeePhoto} alt="coffee"/>
                                <div className="partners-page__partner-info">
                                    <h2 className="partners-page__partner-title">{shop.name}</h2>
                                    <p className="partners-page__partner-description">{shop.description}</p>
                                    <p className="partners-page__partner-address">{shop.address}</p>
                                </div>
                                </Link>
                            </div>

                    ))}
                </div>
            </div>
        </>
    );
};

export default PartnersPage;