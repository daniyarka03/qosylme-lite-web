import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../graphQL/Mutations';

const CreateEventPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image_cover: '',
    });

    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        console.log('Form Data:', formData);

        try {
            const { data } = await createEvent({
                variables: {
                    ...formData,
                },
            });

            console.log('Created Event:', data.createEvent.event);
            // Добавь обработку успешного создания мероприятия
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
        </div>
    );
};

export default CreateEventPage;