import React, {useEffect} from 'react';
import "./ChangeImageCoverEventModal.css";
import {useModalChangeEventPropertiesStore} from "../../store/store";
import {Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs} from "@nextui-org/react";
import style from "../../screens/CreateEventPage/CreateEventPage.module.css";
const ChangeImageCoverEventModal = () => {


    const {isOpenImageModal, toggleImageModal, image, toggleImage} = useModalChangeEventPropertiesStore();
    const [imageValue, setImageValue] = React.useState("")

    useEffect(() => {
        console.log(isOpenImageModal)
    }, [isOpenImageModal]);
    const changeImageValueHandler = () => {
        toggleImage(imageValue);
        toggleImageModal();
    }

    return (
        <div>
            <Modal
                isOpen={isOpenImageModal}
                placement="center"
                onClose={toggleImageModal}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1"
                                     style={{
                                         fontSize: "30px",
                                         fontWeight: "700",
                                         color: "#2A65FF",
                                         margin: "30px 0 20px 0"

                                     }}>Change Image cover</ModalHeader>
                        <ModalBody >
                            <Tabs color={"primary"} aria-label="Tabs colors" radius="full">
                                <Tab key="photos" title="Upload">

                                </Tab>
                                <Tab key="music" title="URL image">
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
                                        label="Image Cover"
                                        type="text"
                                        name="image_cover" value={imageValue} onChange={(e) => setImageValue(e.target.value)} required />
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
                                onClick={() => changeImageValueHandler()}
                            >Done</Button>
                        </ModalBody>

                    </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ChangeImageCoverEventModal;