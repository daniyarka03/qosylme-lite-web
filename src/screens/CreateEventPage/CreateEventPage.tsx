import React, {useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../graphQL/Mutations';
import ModalLoading from "../../components/ModalLoading/ModalLoading";
import {useModalLoadingStore} from "../../store/store";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {Button, Input} from "@nextui-org/react";
import "./CreateEventPage.css";

const CreateEventPage = () => {
    const profileData = useInfoProfile();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image_cover: '',
        userId: 0,
        guestIds: [],

    });

    const {toggleModal} = useModalLoadingStore();

    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

    useEffect(() => {
          if (profileData) {
            setFormData({
                ...formData,
                    userId: parseInt(profileData.userId),
            })
        }
    }, [profileData]);

    const handleSubmit = async (e: any) => {
        toggleModal();
        e.preventDefault();


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
        <div className="main">
            <div className="section-create-event">
                <h2>Create Event</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        variant="flat"
                        className="section__input"
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
                                "dark:hover:bg-default/70",
                                "group-data-[focused=true]:bg-default-200/50",
                                "dark:group-data-[focused=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }}
                        label="Name"
                        color="default"
                        type="text"
                        name="name"
                        value={formData.name} onChange={handleChange} required />

                    <Input
                        className="section__input"
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
                                "dark:hover:bg-default/70",
                                "group-data-[focused=true]:bg-default-200/50",
                                "dark:group-data-[focused=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }}
                        label="Description"
                        type="text"
                        name="description"
                        value={formData.description} onChange={handleChange} required />

                    <Input
                        className="section__input"
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
                                "dark:hover:bg-default/70",
                                "group-data-[focused=true]:bg-default-200/50",
                                "dark:group-data-[focused=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }}
                        label="Date"
                        type="date"
                        name="date"
                        value={formData.date} onChange={handleChange} required />

                    <Input
                        className="section__input"
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
                        className="section__input"
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

                    <Input
                        className="section__input"
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
                                "dark:hover:bg-default/70",
                                "group-data-[focused=true]:bg-default-200/50",
                                "dark:group-data-[focused=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }}
                        label="Image Cover"
                        type="text"
                        name="image_cover" value={formData.image_cover} onChange={handleChange} required />

                    <Button color="primary" type="submit" disabled={loading}>Create Event</Button>
                </form>

                {error && <p>Error: {error.message}</p>}
                <ModalLoading />
            </div></div>
    );
};

export default CreateEventPage;