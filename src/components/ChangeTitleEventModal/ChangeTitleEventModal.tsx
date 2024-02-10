import React from 'react';
import {Button, CircularProgress, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {useModalChangeTitleEventStore} from "../../store/store";
import "./ChangeTitleEventModal.css";

const ChangeTitleEventModal = () => {

    const {isOpen, toggleModal, titleValue, toggleTitleValue} = useModalChangeTitleEventStore();
    const [newTitleValue, setNewTitleValue] = React.useState("")

    const changeTitleValueHandler = () => {
        console.log(newTitleValue)
        toggleTitleValue(newTitleValue);
        toggleModal();
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                placement="center"
                onClose={toggleModal}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1"
                                     style={{
                                         fontSize: "30px",
                                         fontWeight: "700",
                                         color: "#2A65FF",

                        }}>Change Title</ModalHeader>
                        <ModalBody >
                            <input
                                type="text"
                                className="change-text-modal__input"
                                placeholder="Your title here..."
                                value={newTitleValue}
                                maxLength={50}
                                onChange={(e) => setNewTitleValue(e.target.value)}
                            />
                            <Button
                                color="primary"
                                style={{  width: "100%",
                                    height: "70px",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    borderRadius: "20px",
                                    border: "2px solid #fff"}}
                                onClick={() => changeTitleValueHandler()}
                            >Done</Button>
                        </ModalBody>

                    </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ChangeTitleEventModal;