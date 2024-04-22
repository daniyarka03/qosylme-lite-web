import React, {useRef} from 'react';
import {
    useImageModalStore,
    useModalUploadingResultChallengeStore
} from "../../store/store";
import Compressor from "compressorjs";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import {useMutation} from "@apollo/client";
import {UPDATE_PARTICIPATION_CHALLENGE, UPLOAD_FILE} from "../../graphQL/Mutations";
import {useInfoProfile} from "../../hooks/useInfoProfile";
const ChallengeUploadingResultModal = () => {

    const {isOpen, toggleModal, image, toggleImage, participantsId} = useModalUploadingResultChallengeStore();
    const {imagePreview, setImagePreview, setImageEvent, imageEvent} = useImageModalStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadFile] = useMutation(UPLOAD_FILE);
    const [updateParticipantChallenge, { loading: updateParticipantLoading, error: updateParticipantError }] = useMutation(UPDATE_PARTICIPATION_CHALLENGE);
    const infoProfile = useInfoProfile();
    const handleUpload = async () => {
        try {
            if (imagePreview) {
                const base64Image = imagePreview.split(',')[1];
                try {
                    const uploadedImage = await uploadFile({ variables: { file: base64Image } });
                    console.log('Image uploaded successfully: ');
                    return uploadedImage.data.singleUploadFile; // Вернуть имя загруженного файла
                } catch (error) {
                    console.error('Error uploading image', error);
                    // Обработка ошибки при загрузке изображения
                    throw error; // Передать ошибку дальше
                }
            } else {
                console.error('No image selected');
                // Обработка случая, когда изображение не выбрано
                return null; // Если изображение не выбрано, вернуть null
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error; // Передать ошибку дальше
        }
    };
    const changeImageValueHandler = async () => {
        const uploadedImageName = await handleUpload();
        if (participantsId) {
            const currentUserParticipiantId = participantsId.filter((item: any) => {
                if (item.user.user_id === infoProfile.user_id) {
                    return item.participated_id;
                }
            });
            if (uploadedImageName) {
                const participatedIdValue = currentUserParticipiantId[0].participated_id
                updateParticipantChallenge({
                    variables: {
                        participatedId: participatedIdValue,
                        result: uploadedImageName,
                        result_state: "In review"
                    }
                }).then(() => {
                    console.log('Image updated successfully');
                    toggleModal();
                    window.location.reload();
                }).catch((error) => {
                    console.error('Error updating image', error);
                });
            }
        }
        // Доработать обработку с правильными полями


    }
    const compressImage = (file: any) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.9, // Качество сжатия (от 0 до 1)
                maxWidth: 1024, // Максимальная ширина изображения
                maxHeight: 1024, // Максимальная высота изображения
                mimeType: 'image/jpeg', // Тип MIME для сжатого изображения
                success: (compressedFile) => {
                    resolve(compressedFile);
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    };
    const handleFileChange = async (event: any) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            const compressedFile: any = await compressImage(selectedImage);
            setImageEvent(compressedFile);
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(compressedFile);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                placement="center"
                onClose={toggleModal}
                scrollBehavior={"inside"}
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
                            <img style={{
                                width: "100%",
                                height: "100%"
                            }} src={imagePreview} alt="preview" />
                            <input style={{display: "none"}} type="file" id="selectedFile" onChange={handleFileChange} ref={fileInputRef} />

                        </ModalBody>
                        <ModalFooter style={{flexDirection: "column"}}>
                            <Button color="default" onClick={handleButtonClick}>Select image</Button>

                            <Button
                                color="primary"
                                style={{  width: "100%",
                                    height: "70px",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    borderRadius: "20px",
                                    border: "2px solid #fff"}}
                                onClick={() => changeImageValueHandler()}
                            >Upload result</Button>
                        </ModalFooter>

                    </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ChallengeUploadingResultModal;