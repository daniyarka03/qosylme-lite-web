import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_USER, GET_USER_INFO, REFRESH_TOKEN, UPDATE_USER} from "../../graphQL/Mutations";
import {useInfoProfile} from "../../hooks/useInfoProfile";
import {Button, Input} from "@nextui-org/react";
import ModalLoading from "../../components/ModalLoading/ModalLoading";
import {useModalLoadingStore} from "../../store/store";
import "./EditProfilePage.css";


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

    const [email, setEmail] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');


    useEffect(() => {
        if (profileData) {
            setUserInfo(profileData);
            setUserId(profileData.userId);
            setEmail(profileData.email);
            setFirstname(profileData.firstname);
            setLastname(profileData.lastname);
        }
    }, [profileData]);



    const [updateUser] = useMutation(UPDATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);
    const [refreshToken, { data }] = useMutation(REFRESH_TOKEN);
    const {toggleModal} = useModalLoadingStore();



    const handleUpdate = async () => {
        toggleModal();
        formData.email = email;
        formData.firstname = firstname;
        formData.lastname = lastname;
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
        <div className="edit-profile-page">
            <h2 className="edit-profile-page__title">Update User</h2>
            <form>
                <Input type="email"  classNames={{
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
                       color="default"
                       label="Email"
                       className="field__email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)} />



                <Input type="text"  classNames={{
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
                       color="default"
                       label="Firstname"
                       className="field__email"
                       value={firstname}
                       onChange={(e) => setFirstname(e.target.value)} />

                <Input type="text"  classNames={{
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
                       color="default"
                       label="Lastname"
                       className="field__email"
                       value={lastname}
                       onChange={(e) => setLastname(e.target.value)} />

                {/*<input*/}
                {/*    type="password"*/}
                {/*    name="password"*/}
                {/*    value={formData.password}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}

                <Button color="primary" onClick={handleUpdate}  style={{  width: "100%",
                    height: "70px",
                    fontWeight: "700",
                    fontSize: "20px",
                    borderRadius: "20px",
                    border: "2px solid #fff"
                }}>
                    Update User
                </Button>

                {/*<Button color="danger" onClick={handleDelete}  style={{  width: "100%",*/}
                {/*    height: "70px",*/}
                {/*    fontWeight: "700",*/}
                {/*    fontSize: "20px",*/}
                {/*    borderRadius: "20px",*/}
                {/*    border: "2px solid #fff"*/}
                {/*}}>*/}
                {/*    Delete User*/}
                {/*</Button>*/}
            </form>
            <ModalLoading />
        </div>
    );
};

export default EditProfilePage;