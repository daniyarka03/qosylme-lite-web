import React from 'react';
import {useModalLoadingStore, useModalSuccessJoinEventStore} from "../../store/store";
import {
    Button,
    Card, CardHeader,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Image, CardBody
} from "@nextui-org/react";
import './ModalSuccessJoinedEvent.css';

interface ModalSuccessJoinedEventProps {
    event: any;
}
const ModalSuccessJoinedEvent = ({event}: ModalSuccessJoinedEventProps) => {
    const {isOpen, toggleModal} = useModalSuccessJoinEventStore();
    return (
        <div className="modal-success-joined-event">
            <Modal
                isOpen={isOpen}
                placement="auto"
                onClose={toggleModal}
                style={{margin: "18px"}}
                backdrop={"blur"}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 style={{fontSize: "24px", textAlign: "center"}}>You have successfully registered for the event</h2>
                        </ModalHeader>

                        <ModalBody>
                            <Card className="col-span-12 sm:col-span-4 h-[200px]">
                                <CardHeader className="absolute z-10 t-1 backdrop-blur-sm flex-col !items-start bg-black/40 bottom-0  border-t-1 border-default-600 dark:border-default-100">
                                    <p className="text-tiny text-white/60 uppercase font-bold">{event.name}</p>
                                    <h4 className="text-white font-medium text-large">{event.date + " " + event.time}</h4>
                                </CardHeader>
                                    <Image
                                        removeWrapper
                                        alt="Card background"
                                        className="z-0 w-full h-full object-cover blur-darken-image"
                                        src={event.imageCover}
                                    />
                            </Card>
                        </ModalBody>
                        <ModalFooter className="flex-column">
                            <div className="modal-buttons-container">
                                <Button
                                    className="modal-footer__button"
                                    color="primary"
                                    fullWidth={true}
                                    size="lg"
                                    style={{ height: '4rem', fontWeight: 700, fontSize: '1.1rem', marginBottom: "20px" }}
                                >
                                    Check ticket
                                </Button>
                                <Button
                                    className="modal-footer__button"
                                    color="default"
                                    variant="light"
                                    onClick={toggleModal}
                                    size="lg"
                                    style={{ height: '4rem', fontWeight: 700, fontSize: '1.1rem' }}
                                >
                                    Close
                                </Button>
                            </div>
                        </ModalFooter>


                    </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ModalSuccessJoinedEvent;