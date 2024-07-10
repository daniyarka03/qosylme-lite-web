import React, {useEffect, useRef, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_USER, GET_USER_INFO, REFRESH_TOKEN, UPDATE_USER, UPLOAD_FILE} from "../../graphQL/Mutations";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {Avatar, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import ModalLoading from "../../components/ModalLoading/ModalLoading";
import {useModalLoadingStore} from "../../store/store";
import "./EditProfilePage.css";
import Compressor from "compressorjs";
import SweetAlert2, { withSwal } from 'react-sweetalert2';

interface IFormData {
    avatar: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;

}
const EditProfilePage = () => {

    const profileData = useInfoProfile();
    const isMobile = window.innerWidth <= 768;
    const [userInfo, setUserInfo] = useState();
    const [userId, setUserId] = useState();
    const [formData, setFormData] = useState({
        avatar: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
    });

    const [swalProps, setSwalProps] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [errorModalValue, setErrorModalValue] = useState("");
    const onClose = () => {
        setIsOpen(false);
    }



    const compressImage = (file: any) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.9, // Качество сжатия (от 0 до 1)
                maxWidth: 512, // Максимальная ширина изображения
                maxHeight: 512, // Максимальная высота изображения
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

    const [email, setEmail] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');


    useEffect(() => {
        if (profileData) {
            setUserInfo(profileData);
            setUserId(profileData.user_id);
            setEmail(profileData.email);
            setFirstname(profileData.firstname);
            setLastname(profileData.lastname);
            setPreview(import.meta.env.VITE_SERVER_URL + profileData.avatar)
        }
    }, [profileData]);



    const [updateUser] = useMutation(UPDATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);
    const [refreshToken, { data }] = useMutation(REFRESH_TOKEN);
    const {toggleModal} = useModalLoadingStore();

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState<any>('');
    const [uploadFile] = useMutation(UPLOAD_FILE);

    const handleFileChange = async (event: any) => {
        const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/heic", "image/webp"];
        const maxSize = 15 * 1024 * 1024; // 10 MB
        const selectedImage = event.target.files[0];
        if (!allowedFormats.includes(selectedImage.type)) {
            console.log("Неподдерживаемый формат изображения.");
            setErrorModalValue("Неподдерживаемый формат изображения.");
            setIsOpen(true);
            return;
        }
        if (selectedImage.size > maxSize) {
            console.log("Изображение слишком большое (больше 10 MB).");
            setErrorModalValue("Изображение слишком большое (больше 10 MB).");
            setIsOpen(true);
            return;
        }
        if (selectedImage) {
            const compressedFile: any = await compressImage(selectedImage);
            setImage(compressedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(compressedFile);
        }
    };


    const handleUpload = async () => {
        try {
            if (image) {
                console.log(image);

                const base64Image = preview.split(',')[1];

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

    const handleUpdate = async () => {
        toggleModal();
        formData.email = email;
        formData.firstname = firstname;
        formData.lastname = lastname;
        try {
            const uploadedImageName = await handleUpload(); // Дождаться загрузки изображения и получить его имя
            console.log(uploadedImageName)

           if (uploadedImageName) {
               formData.avatar = uploadedImageName; // Установить имя загруженного изображения в formData
               console.log(formData)
               const { data: updateUserData } = await updateUser({
                   variables: {
                       userId: userId,
                       ...formData,
                   },
               });
           } else {
               formData.avatar = profileData.avatar;
               console.log(formData)
               const { data: updateUserData } = await updateUser({
                   variables: {
                       userId: userId,
                       ...formData,
                   },
               });
           }

            window.location.href = '/profile';
            // Handle success or update UI accordingly
        } catch (error: any) {
            console.error('Error updating user:', error.message);
            // Handle error or update UI accordingly
        }
    };
    const handleDelete = async () => {
        try {
            const { data: deleteUserData } = await deleteUser({
                variables: { userId: userId },
            });

            localStorage.removeItem('token');
            window.location.href = '/';

            console.log('Deleted User:', deleteUserData.deleteUser.success);
            // Handle success or update UI accordingly
        } catch (error: any) {
            console.error('Error deleting user:', error.message);
            // Handle error or update UI accordingly
        }
    };

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    //
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    const user = userInfo;
    return (
        <div className="edit-profile-page">
            <h2 className="edit-profile-page__title">Update User</h2>
            <form>
                <div className="edit-profile-page__avatar">
                    <Avatar style={{
                        width: "146px",
                        height: "146px"
                    }} src={preview} alt="preview" />
                    <input name="file" type="file" onChange={handleFileChange} />
                </div>
                <Input type="email"  classNames={{
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
                       color="default"
                       label="Email"
                       className="field__email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)} />



                <Input type="text"  classNames={{
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
                       color="default"
                       label="Firstname"
                       className="field__email"
                       value={firstname}
                       onChange={(e) => setFirstname(e.target.value)} />

                <Input type="text"  classNames={{
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
                       color="default"
                       label="Lastname"
                       className="field__email"
                       value={lastname}
                       onChange={(e) => setLastname(e.target.value)} />

                {/*<input*/}
                {/*    type="password"*/}
                {/*    name="password"*/}
                {/*    value={formData.password}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}



                <Button color="primary" onClick={handleUpdate}  style={{  width: "100%",
                    height: "70px",
                    fontWeight: "700",
                    fontSize: "20px",
                    borderRadius: "20px",
                    border: "2px solid #fff",
                    marginBottom: "100px"
                }}>
                    Update User
                </Button>

                {/*<Button color="danger" onClick={handleDelete}  style={{  width: "100%",*/}
                {/*    height: "70px",*/}
                {/*    fontWeight: "700",*/}
                {/*    fontSize: "20px",*/}
                {/*    borderRadius: "20px",*/}
                {/*    border: "2px solid #fff"*/}
                {/*}}>*/}
                {/*    Delete User*/}
                {/*</Button>*/}
            </form>
            <ModalLoading />
            <SweetAlert2 {...swalProps}>
                <h1>
                    Hello World!
                </h1>
            </SweetAlert2>
            <Modal
                isOpen={isOpen}
                placement={isMobile ? "bottom" : "center"}
                onClose={onClose}
            >
                <ModalContent>

                        <>
                            <ModalHeader className="flex flex-col gap-1">Error uploading</ModalHeader>
                            <ModalBody>
                                <p>
                                    {errorModalValue}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EditProfilePage;