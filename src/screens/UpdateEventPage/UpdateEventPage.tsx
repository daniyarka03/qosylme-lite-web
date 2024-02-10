import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_EVENT } from '../../graphQL/Mutations';
import {SHOW_EVENT_BY_ID} from "../../graphQL/Queries";
import ModalLoading from "../../components/ModalLoading/ModalLoading";
import {useModalLoadingStore} from "../../store/store";

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



    const { loading, error, data } = useQuery(SHOW_EVENT_BY_ID, {
        variables: { eventId: parseInt(id) },
    });

    const [updateEvent, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_EVENT);

    useEffect(() => {
        if (!loading && data && data.eventById) {
            const { name, description, date, time, location, imageCover } = data.eventById;
            setFormData({ name, description, date, time, location, image_cover: imageCover });
        }
    }, [loading, data]);

    const handleSubmit = async (e: any) => {
        toggleModal();
        e.preventDefault();
        console.log('Form Data:', formData);

        try {
            const { data: updateData } = await updateEvent({
                variables: {
                    eventId: typeof id === 'string' ? parseInt(id, 10) : 0,
                    ...formData,
                },
            });

            window.location.href = `/event/${id}`;
            // Добавь обработку успешного обновления мероприятия
        } catch (error: any) {
            console.error('Error updating event:', error.message);
            // Добавь обработку ошибок
        }
    };

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
        <div>
            <h2>Update Event</h2>
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

                <button type="submit" disabled={updateLoading}>Update Event</button>
            </form>

            {updateLoading && <p>Updating...</p>}
            {updateError && <p>Error: {updateError.message}</p>}
            <ModalLoading />
        </div>
    );
};

export default UpdateEventPage;
