import React, {useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../graphQL/Mutations';
import ModalLoading from "../../components/ModalLoading/ModalLoading";
import imageCover from "../../assets/image2.jpg";
import {
    useModalChangeEventPropertiesStore,
    useModalChangeTitleEventStore,
    useModalLoadingStore
} from "../../store/store";
import LocationRedColor from "../../assets/LocationRedColor.svg";
import TimeCircleBlue from "../../assets/TimeCircleBlueColor.svg";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {Button, Input, Textarea} from "@nextui-org/react";
import style from "./CreateEventPage.module.css";
import ChangeTitleEventModal from "../../components/ChangeTitleEventModal/ChangeTitleEventModal";
import ChangeImageCoverEventModal from "../../components/ChangeImageCoverEventModal/ChangeImageCoverEventModal";
import CardEventPropertyBlock from "../../components/CardEventPropertyBlock/CardEventPropertyBlock";
import ChangeDateTimeEventModal from "../../components/ChangeDateTimeEventModal/ChangeDateTimeEventModal";
import ChangeLocationEventModal from "../../components/ChangeLocationEventModal/ChangeLocationEventModal";
import {Link} from "react-router-dom";

const CreateEventPage = () => {
    const profileData = useInfoProfile();
    //const staticImage = "https://images.unsplash.com/photo-1683009427513-28e163402d16";
    const staticImage = imageCover;
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image_cover: staticImage,
        userId: 0,
        guestIds: [],
    });

    const [titleValueState, setTitleValueState] = useState("Choose name event");

    const {toggleModal: toggleModalTitleEvent, titleValue} = useModalChangeTitleEventStore();
    const {toggleImageModal, image, toggleDateModal, toggleLocationModal, location: locationValue} = useModalChangeEventPropertiesStore();


    const {toggleModal} = useModalLoadingStore();
    const [fontSizeTitle, setFontSizeTitle] = useState('40px');

    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

    useEffect(() => {
        // Функция для определения размера шрифта
        const calculateFontSize = () => {
            if (titleValueState.length <= 20) {
                return '40px';
            } else if (titleValueState.length > 20) {
                return '30px';
            }
            return '40px';
        };

        // Установка размера шрифта
        setFontSizeTitle(calculateFontSize());
    }, [titleValueState]);

    useEffect(() => {
        console.log("titleValue", titleValue)
        if (titleValue) {
           setTitleValueState(titleValue);
            console.log("formData", formData)
        }
        if (image) {
            console.log("image", image)
            setFormData({
                ...formData,
                image_cover: image,
            });
        }
    }, [titleValue, image]);

    useEffect(() => {
          if (profileData) {
            setFormData({
                ...formData,
                    userId: parseInt(profileData.userId),
            })
        }
    }, [profileData]);

    const editTitleHandler = () => {
       toggleModalTitleEvent();
    };

    const editImageCoverHandler = () => {
        toggleImageModal();
    };

    const handleSubmit = async (e: any) => {
        toggleModal();
        e.preventDefault();

        formData.name = titleValueState;

        try {
            const { data, errors } = await createEvent({
                variables: {
                    ...formData,
                },
            });


            window.location.href = `/event/${data.createEvent.event.eventId}`;
        } catch (error: any) {
            console.error('Error creating event:', error.message);
            // Добавь обработку ошибок
        }
    };

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={style.main}>
            <div className={style.sectionCreateEvent}>
                <h2>Create Event</h2>

                <form onSubmit={handleSubmit}>
                    <div className={style.cardBlock} style={{
                        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.92) 100%), url(${formData.image_cover}) lightgray 50% / cover no-repeat`
                    }}>
                        <div className={style.cardEventBody}>
                            <div className={style.cardEventContent}>
                                <Button color={"primary"} style={{
                                    fontWeight: "700",
                                    fontSize: "16px",
                                    borderRadius: "40px",
                                    margin: "20px 20px"
                                }}
                                        onClick={() => editImageCoverHandler()}
                                >Choose image cover</Button>
                                <h1 style={{fontSize: fontSizeTitle}} className={style.cardEventTitle} onClick={() => editTitleHandler()}>{titleValueState}</h1>
                            </div>
                        </div>
                    </div>
                </form>

                <form onSubmit={handleSubmit}>

                    <div style={{display: "flex"}}>
                        <CardEventPropertyBlock value={locationValue} toggleModal={toggleLocationModal} label={"location"} icon={LocationRedColor} />
                        <CardEventPropertyBlock toggleModal={toggleDateModal} label={"date"} icon={TimeCircleBlue} />
                    </div>

                    <Textarea
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
                        label="About event"
                        type="text"
                        name="description"
                        value={formData.description} onChange={handleChange} required />

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
                        label="Date"
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={formData.date} onChange={handleChange} required />

                    <Input
                        className={style.sectionInput}
                        placeholder="Time"
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
                        label="Time"
                        type="time"
                        name="time"
                        value={formData.time} onChange={handleChange} required />

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
                        value={formData.location} onChange={handleChange} required />



                    <Button
                        color="primary"
                        type="submit"
                        disabled={loading}
                        style={{  width: "100%",
                                height: "70px",
                                fontWeight: "700",
                                fontSize: "20px",
                                borderRadius: "20px",
                                border: "2px solid #fff"
                        }}
                    >
                        Create Event</Button>

                </form>
                <Link to={"/profile"}>
                    <Button
                        color="danger"
                        disabled={loading}
                        style={{  width: "100%",
                            height: "70px",
                            fontWeight: "700",
                            fontSize: "20px",
                            borderRadius: "20px",
                            border: "2px solid #fff"
                        }}
                    >Cancel</Button>
                </Link>
                {error && <p>Error: {error.message}</p>}
                <ModalLoading />
                <ChangeTitleEventModal />
                <ChangeImageCoverEventModal />
                <ChangeDateTimeEventModal />
                <ChangeLocationEventModal />
            </div></div>
    );
};

export default CreateEventPage;