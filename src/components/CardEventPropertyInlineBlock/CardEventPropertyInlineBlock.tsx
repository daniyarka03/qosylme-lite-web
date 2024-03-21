import React from 'react';
import {Button} from "@nextui-org/react";
import "./CardEventPropertyInlineBlock.css";
interface CardEventPropertyBlockProps {
    label: string;
    icon: string;
    toggleModal: () => void;
    value?: any;
    value2?: string;
    withButton?: boolean;
    valueButton?: string;
    onClickButton?: () => void;
}
const CardEventPropertyInlineBlock  = ({valueButton = "Choose", label, icon, toggleModal, value, value2 = "", withButton = true}: CardEventPropertyBlockProps) => {

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
                {withButton && <Button onClick={() => toggleModalHandler()} color="primary" style={{borderRadius: "100px", width: "75%", height: "50px", fontWeight: "700", fontSize: "16px"}}>
                    {valueButton}
                </Button>}
            </div>
        </div>
    );
};

export default CardEventPropertyInlineBlock;