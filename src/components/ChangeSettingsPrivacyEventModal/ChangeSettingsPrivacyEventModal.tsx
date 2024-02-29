import React, {useEffect, useState} from 'react';
import {useModalEventSettingsStore} from "../../store/store";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, cn} from "@nextui-org/react";
import {Link} from "react-router-dom";
import EditIcon from "../../assets/EditIcon.svg";
import PrivacyIcon from "../../assets/SecurityIcon.svg";
import GuestsIcon from "../../assets/UsersWhiteIcon.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg";

const ChangeSettingsPrivacyEventModal = () => {
    const {isOpenPrivacyOption, togglePrivacyOption} = useModalEventSettingsStore();

    const onOpenChange = () => {
        togglePrivacyOption();
    }

    const [isMobile, setIsMobile] = useState(false);
    const [isPublic, setIsPublic] = React.useState(true);
    const [isGeolocation, setIsGeolocation] = React.useState(true);
    const [isSelected, setIsSelected] = React.useState(true);

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
        togglePrivacyOption();
    }


    return (
        <div>
            <Modal
                isOpen={isOpenPrivacyOption}
                size={isMobile ? "full" : "lg"}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Privacy settings</ModalHeader>
                        <ModalBody style={{gap: "20px"}}>
                            <Switch isSelected={isPublic} onValueChange={setIsPublic}>
                                <div className="flex flex-col gap-1">
                                    <p className="text-medium">Public event</p>
                                    <p className="text-tiny text-default-400">
                                       Your event will be visible to everyone
                                    </p>
                                </div>
                            </Switch>
                            <Switch isSelected={isGeolocation} onValueChange={setIsGeolocation}>
                                <div className="flex flex-col gap-1">
                                    <p className="text-medium">Visibility exact geolocation of the place</p>
                                    <p className="text-tiny text-default-400">
                                        Your event geolocation will be exact visible to everyone
                                    </p>
                                </div>
                            </Switch>
                            <Switch isSelected={isSelected} onValueChange={setIsSelected}>
                                <div className="flex flex-col gap-1">
                                    <p className="text-medium">Public event</p>
                                    <p className="text-tiny text-default-400">
                                        Your event will be visible to everyone
                                    </p>
                                </div>
                            </Switch>
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

export default ChangeSettingsPrivacyEventModal;