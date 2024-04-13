import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {UPDATE_EVENT, UPLOAD_FILE} from '../../graphQL/Mutations';
import {SHOW_EVENT_BY_ID} from "../../graphQL/Queries";
import ModalLoading from "../../components/ModalLoading/ModalLoading";
import {
    useImageModalStore,
    useModalChangeEventPropertiesStore,
    useModalChangeTitleEventStore,
    useModalLoadingStore, useModalUpdateEventPropertiesStore
} from "../../store/store";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import CardEventPropertyInlineBlock from "../../components/CardEventPropertyInlineBlock/CardEventPropertyInlineBlock";
import TimeCircleBlue from "../../assets/TimeCircleBlueColor.svg";
import LocationRedColor from "../../assets/LocationRedColor.svg";
import {Button, Textarea} from "@nextui-org/react";
import style from "../CreateEventPage/CreateEventPage.module.css";
import dayjs from "dayjs";
import "./UpdateEventPage.css";
import ChangeTitleEventModal from "../../components/ChangeTitleEventModal/ChangeTitleEventModal";
import ChangeImageCoverEventModal from "../../components/ChangeImageCoverEventModal/ChangeImageCoverEventModal";
import ChangeDateTimeEventModal from "../../components/ChangeDateTimeEventModal/ChangeDateTimeEventModal";
import ChangeLocationEventModal from "../../components/ChangeLocationEventModal/ChangeLocationEventModal";
import {MobileDatePicker, MobileTimePicker} from "@mui/x-date-pickers";

const UpdateEventPage = () => {
    const { id= "1"} = useParams();
    const {toggleModal} = useModalLoadingStore();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image_cover: '',
    });


    const [uploadFile] = useMutation(UPLOAD_FILE);

    const {imagePreview, setImagePreview, setImageEvent, imageEvent} = useImageModalStore();

    const [fontSizeTitle, setFontSizeTitle] = useState('40px');
    const {toggleModal: toggleModalTitleEvent, titleValue, toggleTitleValue} = useModalChangeTitleEventStore();
    const today = new Date();
    const [hours, setHours] = useState(today.getHours());
    const [minutes, setMinutes] = useState(today.getMinutes());
    const currentDate = new Date().toLocaleDateString('en-GB').split('/').join('.'); // Получаем текущую дату в формате "день.месяц.год"
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Получаем текущее время в формате HH:MM
    const {isOpenImageModal, toggleImageModal, image, toggleDateModal, toggleLocationModal, location: locationValue, date: dateValue} = useModalChangeEventPropertiesStore();
    const [titleValueState, setTitleValueState] = useState("Choose name event");
    const [dateValueState, setDateValueState] = useState<any>(currentDate);
    const [timeValueState, setTimeValueState] = useState<String>("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [imageCover, setImageCover] = useState("");
    const todayValue = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
    };
    useEffect(() => {
        // Функция для определения размера шрифта
        const calculateFontSize = () => {
            if (titleValueState && titleValueState.length <= 20) {
                return '40px';
            } else if (titleValueState && titleValueState.length > 20) {
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
    }, [titleValue]);

    const [openModalDate, setOpenModalDate] = useState(false)
    const [openModalTime, setOpenModalTime] = useState(false)


    const [selectedDay, setSelectedDay] = useState<any>("");
    const [selectedDayTime, setSelectedDayTime] = useState<any>();


    const { loading, error, data } = useQuery(SHOW_EVENT_BY_ID, {
        variables: { eventId: id },
    });

    const [updateEvent, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_EVENT);

    useEffect(() => {
        if (!loading && data && data.getEventById.event_id) {
            const { name, description, date, time, location, image_cover } = data.getEventById;
            setFormData({ name, description, date, time, location, image_cover: image_cover });
            setTitleValueState(name);
            setDateValueState(date.split("-").reverse().join("."));
            setTimeValueState(time.split(":").slice(0, 2).join(":"));
            setDescription(description);
            setLocation(location);
            setImageCover(image_cover);
            setHours(time.split(":").slice(0, 1).join(":"))
            setMinutes(time.split(":").slice(1, 2).join(":"))
            if (!/^https?:\/\//i.test(image_cover)) {
                console.log(import.meta.env.VITE_SERVER_URL + image_cover)
                setImageCover(import.meta.env.VITE_SERVER_URL + image_cover)
            } else {
                setImageCover(data.image_cover);
            }
            console.log(hours)
        }
    }, [loading, data]);

    useEffect(() => {
        if (imagePreview) {
            setImageCover(imagePreview);
        }
    }, [imagePreview]);

    useEffect(() => {
        if (locationValue) {
            setLocation(locationValue);
        }
    }, [locationValue]);

    const editTitleHandler = () => {
        toggleTitleValue(titleValueState);
        toggleModalTitleEvent();
    };



    const handleUpload = async () => {
        try {
            if (imageEvent) {
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
    const handleSubmit = async (e: any) => {
        toggleModal();
        e.preventDefault();
        const uploadedImageName = await handleUpload();
        const parts = dateValueState.split('.'); // Разделяем строку на части с помощью '.' в качестве разделителя
        const day = parseInt(parts[0]); // Извлекаем часть с днем и преобразуем в целое число
        const month = parseInt(parts[1]); // Извлекаем часть с месяцем
        const year = parseInt(parts[2]); // Извлекаем часть с годом

        const dateObject = new Date(Date.UTC(year, month - 1, day)); // Создаем объект Date в формате UTC
        const formattedDate = dateObject.toISOString().split('T')[0];

        formData.name = titleValueState;
        formData.date = formattedDate;
        formData.time = timeValueState.toString();
        formData.location = location;
        formData.description = description;
        //formData.image_cover = uploadedImageName;

        console.log('Form Data:', formData);
        console.log(id)

        try {
            const { data: updateData, errors } = await updateEvent({
                variables: {
                    eventId: id,
                    name: titleValueState,
                    description: description,
                    date: formattedDate,
                    time: timeValueState.toString(),
                    location: location,
                    image_cover: uploadedImageName,
                },
            });


            window.location.href = `/event/${id}`;
            // Добавь обработку успешного обновления мероприятия
        } catch (error: any) {
            console.error('Error updating event:', error);
            // Добавь обработку ошибок
        }
    };

    const editImageCoverHandler = () => {
        console.log('Editing image cover: ', isOpenImageModal);
        toggleImageModal();
        console.log('After: ', isOpenImageModal);

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

    const handleChange = (e: any) => {
        console.log('Changing', e.target.name, 'to', e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const event = data.eventById; // Предполагается, что у тебя есть соответствующий запрос для получения деталей мероприятия
    return (
        <div className="update-event-page">
            <h2 style={{fontSize: "30px", fontWeight: 700, margin: "40px 0 40px 0"}}>Update Event</h2>
            <form onSubmit={handleSubmit}>
                <div className={style.cardBlock} style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.92) 100%), url(${imageCover}) lightgray 50% / cover no-repeat`
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
                <div className="flex">
                    <CardEventPropertyInlineBlock value={dateValueState ? dateValueState : "Date"} toggleModal={() => setOpenModalDate(!openModalDate)} label={"Date"} icon={TimeCircleBlue} />
                    <CardEventPropertyInlineBlock value={timeValueState ? timeValueState : "Time"} toggleModal={() => setOpenModalTime(!openModalDate)} label={"Time"} icon={TimeCircleBlue} />
                </div>
                <div>
                    <CardEventPropertyInlineBlock value={location} toggleModal={() => toggleLocationModal()} label={"Location"} icon={LocationRedColor} />
                </div>

                <Textarea
                    className={style.sectionInput}
                    minRows={10}
                    radius={"full"}
                    size={"lg"}
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
                    value={description} onChange={(e) => setDescription(e.target.value)} required />

                <Button
                    color="primary"
                    type="submit"
                    disabled={loading}
                    onClick={handleChange}
                    style={{  width: "100%",
                        height: "70px",
                        fontWeight: "700",
                        fontSize: "20px",
                        borderRadius: "20px",
                        border: "2px solid #fff",
                        marginBottom: "10px"
                    }}>
                    Update Event
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

            {updateLoading && <p>Updating...</p>}
            {updateError && <p>Error: {updateError.message}</p>}
            <ModalLoading />
            <ChangeTitleEventModal />
            <ChangeImageCoverEventModal />
            <ChangeLocationEventModal />
            <MobileDatePicker className={style.MobileTimeDatePicker} minDate={dayjs(`${todayValue.year}-${todayValue.month}-${todayValue.day}T${hours}:${minutes}`)} defaultValue={dayjs(`${todayValue.year}-${todayValue.month}-${todayValue.day}T${hours}:${minutes}`)} onChange={(date: any) => setSelectedDay(date)} open={openModalDate} onClose={() => setOpenModalDate(!openModalDate)} />
            <MobileTimePicker className={style.MobileTimeDatePicker}  defaultValue={dayjs(`${todayValue.year}-${todayValue.month}-${todayValue.day}T${timeValueState.split(":")[0]}:${minutes}`)} onChange={(date: any) => setSelectedDayTime(date)} open={openModalTime} onClose={() => setOpenModalTime(!openModalTime)} />
            {/*<BottomNavbar />*/}
        </div>
    );
};

export default UpdateEventPage;
