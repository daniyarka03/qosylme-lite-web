import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_USER, GET_USER_INFO, REFRESH_TOKEN, UPDATE_USER} from "../../graphQL/Mutations";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {Button} from "@nextui-org/react";
import ModalLoading from "../../components/ModalLoading/ModalLoading";
import {useModalLoadingStore} from "../../store/store";

interface IFormData {
    email: string;
    firstname: string;
    lastname: string;
    password: string;

}
const EditProfilePage = () => {

    const profileData = useInfoProfile();
    const [userInfo, setUserInfo] = useState();
    const [userId, setUserId] = useState();
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
    });

    useEffect(() => {
        if (profileData) {
            setUserInfo(profileData);
            setUserId(profileData.userId);
            setFormData({
                email: profileData.email,
                firstname: profileData.firstname,
                lastname: profileData.lastname,
                password: profileData.password,
            });
        }
    }, [profileData]);



    const [updateUser] = useMutation(UPDATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);
    const [refreshToken, { data }] = useMutation(REFRESH_TOKEN);
    const {toggleModal} = useModalLoadingStore();



    const handleUpdate = async () => {
        toggleModal();
        try {
            const { data: updateUserData } = await updateUser({
                variables: {
                    userId: userId,
                    ...formData,
                },
            });

            try {
                // Выполняем мутацию для входа
                const result = await refreshToken({ variables: { refreshToken: localStorage.getItem('refreshToken') } });

                // Получаем токен из результата мутации
                const token = result.data.refreshToken.token;
                const refreshTokenData = result.data.refreshToken.refreshToken;
                //
                // // Устанавливаем токен в localStorage
                localStorage.setItem('token', `${token}`);
                localStorage.setItem('refreshToken', `${refreshTokenData}`);
                window.location.href = '/';

                // Дополнительные действия при успешном входе
                // Например, перенаправление пользователя на другую страницу
            } catch (error) {
                // Обработка ошибок при входе
                console.log(error);
            }

            console.log('Updated User:', updateUserData.updateUser.user);
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
        <div>
            <h2>Update User</h2>
            <form>
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Firstname:</label>
                <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                />

                <label>Lastname:</label>
                <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Button color="primary" onClick={handleUpdate}>
                    Update User
                </Button>

                <Button color="danger" onClick={handleDelete}>
                    Delete User
                </Button>
            </form>
            <Button onClick={() => toggleModal()}>Open Modal</Button>
            <ModalLoading />
        </div>
    );
};

export default EditProfilePage;