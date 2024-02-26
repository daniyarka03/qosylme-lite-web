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
import {MobileDatePicker, MobileDateTimePicker, MobileTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent";
import CardEventPropertyInlineBlock from "../../components/CardEventPropertyInlineBlock/CardEventPropertyInlineBlock";

const CreateEventPage = () => {
    const profileData = useInfoProfile();
    //const staticImage = "https://images.unsplash.com/photo-1683009427513-28e163402d16";
    const staticImage = imageCover;
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '2023-05-20',
        time: '',
        location: '',
        image_cover: staticImage,
        userId: 0,
        guestIds: [],
    });
    const defaultValue = {
        year: 2019,
        month: 10,
        day: 5,
    };
    const defaultValueTime = {
        hours: 12,
        minutes: 0,
    };
    const [selectedDay, setSelectedDay] = useState<any>(defaultValue);
    const [selectedDayTime, setSelectedDayTime] = useState<any>(defaultValueTime);
    const [titleValueState, setTitleValueState] = useState("Choose name event");

    const {toggleModal: toggleModalTitleEvent, titleValue} = useModalChangeTitleEventStore();
    const {toggleImageModal, image, toggleDateModal, toggleLocationModal, location: locationValue, date: dateValue} = useModalChangeEventPropertiesStore();


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

    const today = new Date();
    const todayDate = dayjs();

    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const [openModalDate, setOpenModalDate] = useState(false)
    const [openModalTime, setOpenModalTime] = useState(false)
    const [dateValueState, setDateValueState] = useState<any>("");
    const [timeValueState, setTimeValueState] = useState<String>("Time");
    const todayValue = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
    };




    const handleSubmit = async (e: any) => {
        toggleModal();
        e.preventDefault();

        formData.name = titleValueState;
        formData.location = locationValue;
        formData.time = timeValueState.toString();

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

    useEffect(() => {
        const dateObj = new Date(selectedDay["$d"]);
        const date = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
        const time = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
        setDateValueState(date);
        setTimeValueState(time);
    }, [selectedDay]);

    const checkFunc = () => {
        console.log("checkFunc")
    }

    useEffect(() => {
        if (selectedDayTime) {
            setTimeValueState(selectedDayTime["$H"] + ":" + selectedDayTime["$m"])
        }
    }, [selectedDayTime]);

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



                {/*    <MobileDatePicker*/}
                {/*    label={'Date'}*/}
                {/*    minDate={todayDate}*/}
                {/*    className="change-date-time-modal__date-picker"*/}
                {/*    defaultValue={dayjs(`${todayValue.year}-${todayValue.month}-${todayValue.day}`)}*/}
                {/*/>*/}



                {/*<MobileTimePicker onOpen={() => checkFunc()} label={'Hours'} openTo="hours" defaultValue={dayjs(`2022-04-17T${hours}:${minutes}`)} />*/}

                <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <CardEventPropertyInlineBlock value={dateValueState ? dateValueState : "Date"} toggleModal={() => setOpenModalDate(!openModalDate)} label={"Date"} icon={TimeCircleBlue} />
                        <CardEventPropertyInlineBlock value={timeValueState ? timeValueState : "Time"} toggleModal={() => setOpenModalTime(!openModalDate)} label={"Time"} icon={TimeCircleBlue} />
                    </div>
                        <div>
                        <CardEventPropertyInlineBlock value={locationValue} toggleModal={toggleLocationModal} label={"Location"} icon={LocationRedColor} />
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
                        }}>
                        Create Event
                    </Button>

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
                <MobileDatePicker className={style.MobileTimeDatePicker} defaultValue={dayjs(`${todayValue.year}-${todayValue.month}-${todayValue.day}T${hours}:${minutes}`)} onChange={(date: any) => setSelectedDay(date)} open={openModalDate} onClose={() => setOpenModalDate(!openModalDate)} />
                <MobileTimePicker className={style.MobileTimeDatePicker}  defaultValue={dayjs(`${todayValue.year}-${todayValue.month}-${todayValue.day}T${hours}:${minutes}`)} onChange={(date: any) => setSelectedDayTime(date)} open={openModalTime} onClose={() => setOpenModalTime(!openModalTime)} />

            </div></div>
    );
};

export default CreateEventPage;