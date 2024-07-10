import React from 'react';
import "./PartnersProductPage.css";
import {Image} from "@nextui-org/react";

const PartnersProductPage = () => {
    return (
      <>
        <div className="main partners-product">
            <Image className="partners-product__image" src="https://i.pinimg.com/originals/87/21/a7/8721a75d7368ed776d04be33adad9a58.jpg"  />
            <h1 className="partners-product__title">Фрапучино</h1>
            <p>Описание продукта</p>
            <p>Цена: 150 рублей</p>
        </div>
      </>
    );
};

export default PartnersProductPage;