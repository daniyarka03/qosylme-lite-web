import React from 'react';
import "./CardEventPropertyBlock.css";
import {Button} from "@nextui-org/react";
interface CardEventPropertyBlockProps {
    label: string;
    icon: string;
    toggleModal: () => void;
    value?: string;
}
const CardEventPropertyBlock = ({label, icon, toggleModal, value}: CardEventPropertyBlockProps) => {

    const toggleModalHandler = () => {
        toggleModal();
    }

    return (
        <div className="card-event-property-block">
            <div className="block">
                <div className="icon">
                    <img src={icon} alt=""/>
                </div>
                <div className="value">{value ? value : label}</div>
                <Button onClick={() => toggleModalHandler()} color="primary" style={{borderRadius: "100px", width: "75%", height: "50px", fontWeight: "700", fontSize: "16px"}}>Choose</Button>
            </div>
        </div>
    );
};

export default CardEventPropertyBlock;