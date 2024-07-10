import React from 'react';
import {Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs} from "@nextui-org/react";
import "./ChangeLocationEventModal.css";
import {useModalChangeEventPropertiesStore} from "../../store/store";
import style from "../../screens/CreateEventPage/CreateEventPage.module.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
const ChangeLocationEventModal = () => {

    const {isOpenLocationModal, toggleLocationModal, toggleLocation} = useModalChangeEventPropertiesStore();
    const [location, setLocation] = React.useState<any>("")
    const changeLocationEventHandler = () => {
        toggleLocationModal();
        toggleLocation(location.label);
    }

    return (
        <div>
            <Modal
                isOpen={isOpenLocationModal}
                placement="center"
                onClose={toggleLocationModal}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1"
                                     style={{
                                         fontSize: "30px",
                                         fontWeight: "700",
                                         color: "#2A65FF",
                                         margin: "30px 0 20px 0"

                                     }}>Change Location</ModalHeader>
                        <ModalBody>
                            <GooglePlacesAutocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}
                                autocompletionRequest={{
                                    componentRestrictions: {
                                        country: ["cz", "kz"]
                                    },
                                    types: ['geocode', 'establishment'], // Здесь указываются типы мест
                                }}
                                selectProps={{
                                    value: location,
                                    onChange: setLocation,
                                    styles: {
                                        input: (provided) => ({
                                            ...provided,
                                        }),

                                    },
                                    placeholder: 'Write address or name location',
                                }}
                                apiOptions={{ language: 'cz', region: 'cz' }}
                                debounce={300}

                            />

                            <Button
                                color="primary"
                                style={{  width: "100%",
                                    height: "70px",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    borderRadius: "20px",
                                    marginTop: "100px",
                                    border: "2px solid #fff"}}
                                onClick={() => changeLocationEventHandler()}
                            >Done</Button>
                        </ModalBody>

                    </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ChangeLocationEventModal;