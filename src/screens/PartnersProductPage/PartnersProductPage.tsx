import React, {useEffect} from 'react';
import "./PartnersProductPage.css";
import {Image} from "@nextui-org/react";
import {GET_PRODUCT_BY_ID} from "../../graphQL/Queries";
import {useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";

interface ProductProps {
    productId: string;
    name: string;
    description: string;
    price: number;
    shopId: string;
    createdAt: Date;
    updatedAt: Date;
}

const PartnersProductPage = () => {

    const [product, setProduct] = React.useState<ProductProps>()
    const {productId} = useParams();
    const {data} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {productId: productId}
    });

    console.log(productId)

    useEffect(() => {
        if (data) {
            setProduct(data.getProductById)
        }
    }, [data]);


    return (
      <>
          {product && (
              <div className="main partners-product">
                  <Image className="partners-product__image"
                         src="https://i.pinimg.com/originals/87/21/a7/8721a75d7368ed776d04be33adad9a58.jpg"/>
                  <h1 className="partners-product__title">{product.name}</h1>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
              </div>
          )}
      </>
    );
};

export default PartnersProductPage;