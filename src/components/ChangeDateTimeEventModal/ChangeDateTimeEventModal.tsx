import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import "./ChangeDateTimeEventModal.css";
import {useModalChangeEventPropertiesStore} from "../../store/store";
import dayjs from "dayjs";
const ChangeDateTimeEventModal = () => {

    const {isOpenDateModal, toggleDateModal, date, time, toggleDate, toggleTime} = useModalChangeEventPropertiesStore();
    const today = new Date();


    const todayValue = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
    };

    const minimumDate = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
    };

    const [selectedDay, setSelectedDay] = useState(todayValue);

    useEffect(() => {
        toggleDate(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`);
    }, [selectedDay]);


    const changeDateValueHandler = () => {
        toggleDateModal();
    }

    return (
        <div>
            <Modal
                isOpen={isOpenDateModal}
                placement="center"
                onClose={toggleDateModal}
                isDismissable={false}
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