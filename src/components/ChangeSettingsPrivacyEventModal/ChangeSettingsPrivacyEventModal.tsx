import React, {useEffect, useState} from 'react';
import {useModalEventSettingsStore} from "../../store/store";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, cn, Radio, RadioGroup} from "@nextui-org/react";
import {Link} from "react-router-dom";
import EditIcon from "../../assets/EditIcon.svg";
import PrivacyIcon from "../../assets/SecurityIcon.svg";
import GuestsIcon from "../../assets/UsersWhiteIcon.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import {useMutation} from "@apollo/client";
import {DELETE_GUEST_FROM_EVENT, UPDATE_PRIVACY_EVENT} from "../../graphQL/Mutations";

const ChangeSettingsPrivacyEventModal = ({data}: any) => {
    const {isOpenPrivacyOption, togglePrivacyOption} = useModalEventSettingsStore();

    const onOpenChange = () => {
        togglePrivacyOption();
    }

    const [isMobile, setIsMobile] = useState(false);
    const [isPublic, setIsPublic] = React.useState<any>(true);
    const [isGeolocation, setIsGeolocation] = React.useState(true);
    const [isSelected, setIsSelected] = React.useState(true);
    const [updateEventPrivacy] = useMutation(UPDATE_PRIVACY_EVENT);

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

    useEffect(() => {
        console.log("IsPublic", isPublic);
        console.log("eventId", data.event_id);
        const booleanValue = isPublic === "true" ? true : false;
        updateEventPrivacy({
            variables: {
                eventId: data.event_id,
                isPrivate: booleanValue
            }
        })
    }, [isPublic]);

    useEffect(() => {
        setIsPublic(data.isPrivate)
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
                            <RadioGroup
                                label="Visibility"
                                color="primary"
                                onValueChange={setIsPublic}
                                defaultValue={isPublic ? "true" : "false"}
                                classNames={{
                                    label: "text-medium font-weight-700", // Assuming font-weight-700 is the class for font weight 700
                                }}
                            >
                                <Radio value="false" description="Eveyrone can see this event in list events"
                                       classNames={{
                                           base: cn(
                                               "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                                               "flex-row-reverse max-w-[1000px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                                               "data-[selected=true]:border-primary"
                                           ),
                                       }}
                                >
                                    Public
                                </Radio>
                                <Radio value="true" description="Only people with the link can view and join your event"
                                       classNames={{
                                           base: cn(
                                               "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                                               "flex-row-reverse max-w-[1000px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                                               "data-[selected=true]:border-primary"
                                           ),
                                       }}
                                >
                                    Private
                                </Radio>

                            </RadioGroup>
                            {/*<Switch isSelected={isGeolocation} onValueChange={setIsGeolocation}>*/}
                            {/*    <div className="flex flex-col gap-1">*/}
                            {/*        <p className="text-medium">Visibility exact geolocation of the place</p>*/}
                            {/*        <p className="text-tiny text-default-400">*/}
                            {/*            Your event geolocation will be exact visible to everyone*/}
                            {/*        </p>*/}
                            {/*    </div>*/}
                            {/*</Switch>*/}
                            {/*<Switch isSelected={isSelected} onValueChange={setIsSelected}>*/}
                            {/*    <div className="flex flex-col gap-1">*/}
                            {/*        <p className="text-medium">Public event</p>*/}
                            {/*        <p className="text-tiny text-default-400">*/}
                            {/*            Your event will be visible to everyone*/}
                            {/*        </p>*/}
                            {/*    </div>*/}
                            {/*</Switch>*/}
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