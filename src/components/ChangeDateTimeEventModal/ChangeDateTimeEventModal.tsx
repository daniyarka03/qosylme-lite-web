import React, {useEffect} from 'react';
import {Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs} from "@nextui-org/react";
import "./ChangeDateTimeEventModal.css";
import {useModalChangeEventPropertiesStore} from "../../store/store";

const ChangeDateTimeEventModal = () => {

    const {isOpenDateModal, toggleDateModal} = useModalChangeEventPropertiesStore();

    useEffect(() => {
        console.log("isOpenDateModal", isOpenDateModal)
    }, []);
    const changeDateValueHandler = () => {
        toggleDateModal();
    }

    return (
        <div>
            <Modal
                isOpen={isOpenDateModal}
                placement="center"
                onClose={toggleDateModal}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1"
                                     style={{
                                         fontSize: "30px",
                                         fontWeight: "700",
                                         color: "#2A65FF",
                                         margin: "30px 0 20px 0"

                                     }}>Change Date and Time event</ModalHeader>
                        <ModalBody >
                            <Tabs color={"primary"}  style={{width: "100%"}} aria-label="Tabs colors" radius="full">
                                <Tab title="Date" style={{width: "100%", height: "50px", fontSize: "18px", fontWeight: "700"}}>
                                    <Input
                                        type="date"
                                        style={{width: "100%", height: "50px", fontSize: "18px", fontWeight: "700"}}
                                    />
                                </Tab>
                                <Tab  title="Time" style={{width: "100%", height: "50px", fontSize: "18px", fontWeight: "700"}}>
                                        <Input
                                        type="time"
                                        style={{width: "100%", height: "50px", fontSize: "18px", fontWeight: "700"}}
                                    />
                                </Tab>
                            </Tabs>

                            <Button
                                color="primary"
                                style={{  width: "100%",
                                    height: "70px",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    borderRadius: "20px",
                                    marginTop: "100px",
                                    border: "2px solid #fff"}}
                                onClick={() => changeDateValueHandler()}
                            >Done</Button>
                        </ModalBody>

                    </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ChangeDateTimeEventModal;