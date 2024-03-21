import React from 'react';
import {
    Button,
    CircularProgress,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {useModalLoadingStore} from "../../store/store";

const ModalLoading = () => {

    const {isOpen, toggleModal} = useModalLoadingStore();


    return (
        <div>
            <Modal
                isOpen={isOpen}
                placement="center"
                onClose={toggleModal}
                isDismissable={false}
                hideCloseButton={true}
            >
                <ModalContent>
                        <>
                            <ModalHeader className="flex flex-col gap-1">Uploading data</ModalHeader>
                            <ModalBody >
                                <CircularProgress style={{margin: "0 auto", padding: "40px"}} label="Loading..." />
                            </ModalBody>

                        </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ModalLoading;