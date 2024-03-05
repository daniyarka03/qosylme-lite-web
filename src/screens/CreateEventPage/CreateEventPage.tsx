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
        date: '',
        time: '',
        location: '',
        image_cover: staticImage,
        userId: 0,
        guestIds: [],
    });
    const currentDate = new Date().toLocaleDateString('en-GB').split('/').join('.'); // Получаем текущую дату в формате "день.месяц.год"
    const currentTime = new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'}); // Получаем текущее время в формате HH:MM

    const [selectedDay, setSelectedDay] = useState<any>("");
    const [selectedDayTime, setSelectedDayTime] = useState<any>();
    const [titleValueState, setTitleValueState] = useState("Tap to change title");

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
        if (titleValue) {
           setTitleValueState(titleValue);
        }
        if (image) {
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
    const [dateValueState, setDateValueState] = useState<any>(currentDate);
    const [timeValueState, setTimeValueState] = useState<String>(currentTime);
    const todayValue = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
    };






    const handleSubmit = async (e: any) => {
        toggleModal();
        e.preventDefault();
        const parts = dateValueState.split('.'); // Разделяем строку на части с помощью '.' в качестве разделителя
        const day = parseInt(parts[0]); // Извлекаем часть с днем и преобразуем в целое число
        const month = parseInt(parts[1]); // Извлекаем часть с месяцем
        const year = parseInt(parts[2]); // Извлекаем часть с годом

        const dateObject = new Date(Date.UTC(year, month - 1, day)); // Создаем объект Date в формате UTC
        const formattedDate = dateObject.toISOString().split('T')[0];

        formData.name = titleValueState;
        formData.location = locationValue;
        formData.date = formattedDate;
        formData.time = timeValueState.toString();


        try {
            const { data, errors } = await createEvent({
                variables: {
                    ...formData,
                },
            });


            window.location.href = `/event/${data.createEvent.event.eventId}`;
        } catch (error: any) {
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
        if (selectedDayTime) {
            const hours = selectedDayTime["$H"];
            const minutes = selectedDayTime["$m"];

            const formattedMinutes = minutes.toString().padStart(2, '0'); // Добавляем ведущий ноль, если минуты меньше 10

            setTimeValueState(`${hours}:${formattedMinutes}`);
        }
    }, [selectedDayTime]);


    useEffect(() => {
        if (selectedDay) {
            const dateObj = new Date(selectedDay["$d"]);
            const date = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
            setDateValueState(date);
        }
    }, [selectedDay]);


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
                        minRows={10}
                        radius={"full"}
                        size={"lg"}
                        style={{ whiteSpace: 'pre-wrap' }}
                        classNames={{
                            input: [
                                "bg-transparent",
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-default-700/50 dark:placeholder:text-white/60"
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
                        value={formData.description} onChange={handleChange} />





                    <Button
                        color="primary"
                        type="submit"
                        disabled={loading}
                        style={{  width: "100%",
                                height: "70px",
                                fontWeight: "700",
                                fontSize: "20px",
                                borderRadius: "20px",
                                border: "2px solid #fff",
                                marginBottom: "10px"
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
                <MobileDatePicker className={style.MobileTimeDatePicker} minDate={dayjs(`${todayValue.year}-${todayValue.month}-${todayValue.day}T${hours}:${minutes}`)} defaultValue={dayjs(`${todayValue.year}-${todayValue.month}-${todayValue.day}T${hours}:${minutes}`)} onChange={(date: any) => setSelectedDay(date)} open={openModalDate} onClose={() => setOpenModalDate(!openModalDate)} />
                <MobileTimePicker className={style.MobileTimeDatePicker}  defaultValue={dayjs(`${todayValue.year}-${todayValue.month}-${todayValue.day}T${hours}:${minutes}`)} onChange={(date: any) => setSelectedDayTime(date)} open={openModalTime} onClose={() => setOpenModalTime(!openModalTime)} />

            </div></div>
    );
};

export default CreateEventPage;