import React, {useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../graphQL/Mutations';
import ModalLoading from "../../components/ModalLoading/ModalLoading";
import {useModalLoadingStore} from "../../store/store";
import {useInfoProfile} from "../../hooks/useInfoProfile";

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
        email: '',
        firstname: '',
        lastname: ''
    });

    const {toggleModal} = useModalLoadingStore();

    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

    useEffect(() => {
          if (profileData) {
            setFormData({
                ...formData,
                    userId: parseInt(profileData.userId),
                    email: profileData.email,
                    firstname: profileData.firstname,
                    lastname: profileData.lastname
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
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />

                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />

                <label>Time:</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />

                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />

                <label>Image Cover:</label>
                <input type="text" name="image_cover" value={formData.image_cover} onChange={handleChange} required />

                <button type="submit" disabled={loading}>Create Event</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <ModalLoading />
        </div>
    );
};

export default CreateEventPage;