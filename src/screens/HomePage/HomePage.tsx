import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import "./HomePage.css";
import {useChangeFormatDate} from "../../hooks/useChangeFormatDate";
import DiscoveryIcon from "../../assets/Discovery.svg";
import TicketIcon from "../../assets/Ticket.svg";
import ReportIcon from "../../assets/Danger.svg";
import StarIcon from "../../assets/Game.svg";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {motion} from "framer-motion";
import style from "../EventListPage/EventListPage.module.css";
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import Compressor from 'compressorjs';
const UPLOAD_FILE = gql`
  mutation singleUploadFile($file: String!) {
    singleUploadFile(file: $file) 
  }
`;
const HomePage = () => {
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
    const formData = new FormData();
    const dateEvent = new Date();
    const goodFormatDate = useChangeFormatDate({ date: dateEvent, language: 'en-US' });
    const infoProfile = useInfoProfile();
    const [firstname, setFirstname] = useState<string>("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    useEffect(() => {
        if (infoProfile) {
            setFirstname(infoProfile.firstname)
        }
    }, [infoProfile]);
    const [file, setFile] = useState<any>(null);
    const [uploadFile] = useMutation(UPLOAD_FILE);

    const handleFileChange = async (event: any) => {
        const selectedImage = event.target.files[0];
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
                const base64Image = preview.split(',')[1];
                console.log(base64Image)
                try {
                    await uploadFile({ variables: { file: base64Image } });
                    console.log('Image uploaded successfully');
                    // Дополнительные действия после успешной загрузки изображения
                } catch (error) {
                    console.error('Error uploading image', error);
                    // Обработка ошибки при загрузке изображения
                }
            } else {
                console.error('No image selected');
                // Обработка случая, когда изображение не выбрано
            }

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]}}
                className="home-page" >
                <div className="home-page__date">
                    <div className="row">
                        <span className="row__date">{goodFormatDate}</span>

                    </div>
                    <div

                        className="row">
                        <span className="row__name">Hello {firstname}</span>
                    </div>
                </div>

                <div className="home-page__navigation">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.7,
                            ease: [0, 0.71, 0.2, 1.01]}}
                        className="navigation__item">
                        <Link to="/events">
                            <motion.div whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                <img src={DiscoveryIcon} alt="Discovery" />
                            </motion.div>
                            <span>Moments</span>
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.9,
                            ease: [0, 0.71, 0.2, 1.01]}}
                        className="navigation__item">
                        <Link to="/events">
                            <motion.div  whileHover={{ scale: 1.1 }}
                                         whileTap={{ scale: 0.9 }}
                                         transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                <img src={TicketIcon} alt="Ticket" />
                            </motion.div>
                            <span>Ticket</span>
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.1,
                            ease: [0, 0.71, 0.2, 1.01]}}
                        className="navigation__item">
                        <Link to="/challenges" className="">
                            <motion.div whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                <img src={StarIcon} alt="Work" />
                            </motion.div>
                            <span>Challenges</span>
                        </Link>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.3,
                            ease: [0, 0.71, 0.2, 1.01]}}
                        className="navigation__item">
                        <Link to="/event/report">
                            <motion.div whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        whileTap={{ scale: 0.9 }}
                            >
                                <img src={ReportIcon} alt="Report" />
                            </motion.div>
                            <span>Report</span>
                        </Link>
                    </motion.div>
                </div>

                <img src={preview} alt="preview" />
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload File</button>
            </motion.div>
            <BottomNavbar />
        </>

    );
};

export default HomePage;