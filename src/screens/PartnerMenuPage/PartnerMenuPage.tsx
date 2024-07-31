import React, {useEffect} from 'react';
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import "./PartnerMenuPage.css";
import {Link, useParams} from "react-router-dom";
import CoffeePhoto from "../../assets/cafe_photo.jpg";
import {GET_SHOP_BY_ID} from "../../graphQL/Queries";
import {useQuery} from "@apollo/client";

interface ShopProps {
    shopId: string;
    name: string;
    description: string;
    address: string;
    image: string;
    type: string;
    menu: {
        menuId: number;
        shopId: string;
        products: [
            {
                productId: string;
                name: string;
                description: string;
                price: number;
            }
        ];
        createdAt: Date;
        updatedAt: Date;
        shop: ShopProps;
    };
}

const PartnerMenuPage = () => {
    const [shop, setShop] = React.useState<ShopProps>()
    const {id} = useParams();
    const {data} = useQuery(GET_SHOP_BY_ID, {
        variables: {shopId: id}
    });
    useEffect(() => {
        if (data) {
            setShop(data.getShopById);
            console.log(data.getShopById)
        }

    }, [data]);

    return (
       <>
           {shop && (
               <div className="main partner-page">
                   <div className="partner-page__type">
                       <span>Кофейня</span>
                   </div>
                   <h1 className="partner-page__title">{shop.name}</h1>
                   <div className="partner-page__description">
                       <h2>Описание</h2>
                       <p>
                           {shop.description}
                       </p>
                   </div>
                   <div className="partner-page__menu">
                       <h3 className="partner-page__subtitle">Закуски</h3>
                       <div className="partner-menu__partners">
                           {shop.menu.products.map((product: any) => (
                               <div className="partner-menu__partner">
                                   <Link to={`./product/${product.product_id}`}>
                                       <img src={CoffeePhoto} alt="partner" className="partner-menu__partner-image"/>
                                        <h2 className="partner-menu__partner-title">{product.name}</h2>
                                        <div className="flex justify-between">
                                             <p className="partner-menu__partner-description">{product.description}</p>
                                             <span className="partner-menu__partner-price">{product.price}</span>
                                        </div>
                                   </Link>
                               </div>
                           ))}
                       </div>
                       <h3 className="partner-page__subtitle">Основные блюда</h3>
                       <div className="partner-menu__partners">
                           {shop.menu.products.map((product: any) => (
                               <div className="partner-menu__partner">
                                   <Link to={`./product/${product.product_id}`}>
                                       <img src={CoffeePhoto} alt="partner" className="partner-menu__partner-image"/>
                                       <h2 className="partner-menu__partner-title">{product.name}</h2>
                                       <div className="flex justify-between">
                                           <p className="partner-menu__partner-description">{product.description}</p>
                                           <span className="partner-menu__partner-price">{product.price}</span>
                                       </div>
                                   </Link>
                               </div>
                           ))}
                       </div>
                       <h3 className="partner-page__subtitle">Напитки</h3>
                       <div className="partner-menu__partners">
                           {shop.menu.products.map((product: any) => (
                               <div className="partner-menu__partner">
                                   <Link to={`./product/${product.product_id}`}>
                                       <img src={CoffeePhoto} alt="partner" className="partner-menu__partner-image"/>
                                       <h2 className="partner-menu__partner-title">{product.name}</h2>
                                       <div className="flex justify-between">
                                           <p className="partner-menu__partner-description">{product.description}</p>
                                           <span className="partner-menu__partner-price">{product.price}</span>
                                       </div>
                                   </Link>
                               </div>
                           ))}
                       </div>
                   </div>
               </div>)}
       </>
    );
};

export default PartnerMenuPage;