import React from 'react';
import {Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs} from "@nextui-org/react";
import "./ChangeLocationEventModal.css";
import {useModalChangeEventPropertiesStore} from "../../store/store";
import style from "../../screens/CreateEventPage/CreateEventPage.module.css";
const ChangeLocationEventModal = () => {

    const {isOpenLocationModal, toggleLocationModal, toggleLocation} = useModalChangeEventPropertiesStore();
    const [location, setLocation] = React.useState("")
    const changeLocationEventHandler = () => {
        toggleLocationModal();
        toggleLocation(location);
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
                        <ModalBody >
                            <Input
                                className={style.sectionInput}
                                classNames={{
                                    input: [
                                        "bg-transparent",
                                        "text-black/90 dark:text-white/90",
                                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                    innerWrapper: "bg-transparent",
                                    inputWrapper: [
                                        "bg-default-200/50",
                                        "dark:bg-default/60",
                                        "backdrop-blur-xl",
                                        "backdrop-saturate-200",
                                        "hover:bg-default-200/70",
                                        "focus-within:!bg-default-200/50",
                                        "dark:hover:bg-default/70",
                                        "group-data-[focused=true]:bg-default-200/50",
                                        "dark:group-data-[focused=true]:bg-default/60",
                                        "!cursor-text",
                                    ],
                                }}
                                label="Location"
                                type="text"
                                name="location"
                                value={location} onChange={(e) => setLocation(e.target.value)} required />

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