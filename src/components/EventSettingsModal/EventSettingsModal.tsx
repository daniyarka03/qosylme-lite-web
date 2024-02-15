import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useModalEventSettingsStore} from "../../store/store";
import "./EventSettingsModal.css";
import EditIcon from "../../assets/EditIcon.svg";
import PrivacyIcon from "../../assets/SecurityIcon.svg";
import GuestsIcon from "../../assets/UsersWhiteIcon.svg";
import DeleteIcon from "../../assets/Deleteicon.svg";
import {Link} from "react-router-dom";
const EventSettingsModal = () => {

    const {isOpen, toggleModal} = useModalEventSettingsStore();

    const onOpenChange = () => {
        toggleModal();
    }

    const [isMobile, setIsMobile] = useState(false);
    const detectDeviceType = () => {
        setIsMobile(window.innerWidth <= 768); // Примерный порог для мобильных устройств
    };
    useEffect(() => {
        detectDeviceType();
        // Добавляем прослушиватель изменения размера окна для реакции на изменение типа устройства
        window.addEventListener('resize', detectDeviceType);
        console.log("IsMobile", isMobile)
        // Убираем прослушиватель при размонтировании компонента
        return () => window.removeEventListener('resize', detectDeviceType);
    }, []);

    const onClose = () => {
        toggleModal();
    }


    return (
        <div>
            <Modal
                isOpen={isOpen}
                size={isMobile ? "full" : "lg"}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                        <>
                            <ModalHeader className="flex flex-col gap-1">Event settings</ModalHeader>
                            <ModalBody style={{gap: 0}}>
                                <Link to={"./edit"} onClick={onClose}>
                                    <div className="event-settings-modal__item">
                                        <div className="event-settings-modal__img">
                                            <img src={EditIcon} alt=""/>
                                        </div>
                                        <p>Edit event information</p>
                                    </div>
                                </Link>
                                <div className="event-settings-modal__item">
                                    <div className="event-settings-modal__img">
                                        <img src={PrivacyIcon} alt=""/>
                                    </div>
                                    <p>Privacy</p>
                                </div>
                                <div className="event-settings-modal__item">
                                    <div className="event-settings-modal__img">
                                        <img src={GuestsIcon} alt=""/>
                                    </div>
                                    <p>Guests</p>
                                </div>
                                <div className="event-settings-modal__item">
                                    <div className="event-settings-modal__img event-settings-modal__img-delete">
                                        <img src={DeleteIcon} alt=""/>
                                    </div>
                                    <p>Delete this event</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onClick={onClose}
                                    color="danger"
                                    style={{  width: "100%",
                                        height: "70px",
                                        fontWeight: "700",
                                        fontSize: "20px",
                                        borderRadius: "20px",
                                        border: "2px solid #fff",
                                        marginTop: "40px"
                                    }}
                                >Close</Button>
                            </ModalFooter>
                        </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EventSettingsModal;