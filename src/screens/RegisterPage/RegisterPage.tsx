import React, {useState} from 'react';
import {Button, Input} from "@nextui-org/react";
import {Link} from "react-router-dom";
import './RegisterPage.css';
import {useMutation} from "@apollo/client";
import {CREATE_USER, LOGIN_MUTATION} from "../../graphQL/Mutations";
import {useModalLoadingStore} from "../../store/store";
import ModalLoading from "../../components/ModalLoading/ModalLoading";

const RegisterPage = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail]  = useState('');
    const [password, setPassword] = useState('');
    const [createUser, { loading, error }] = useMutation(CREATE_USER);

    const [login, { data }] = useMutation(LOGIN_MUTATION);

    const {toggleModal} = useModalLoadingStore();



    const createAccountHandler  = async () => {
        toggleModal();
        try {
            const { data } = await createUser({
                variables: {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password,
                },
            });

            try {
                // Выполняем мутацию для входа
                const result = await login({ variables: { email, password } });

                // Получаем токен из результата мутации
                const token = result.data.tokenAuthWithUser.token;
                const refreshToken = result.data.tokenAuthWithUser.refreshToken;
                //
                // // Устанавливаем токен в localStorage
                localStorage.setItem('token', `${token}`);
                localStorage.setItem('refreshToken', `${refreshToken}`);
                window.location.href = '/';

                // Дополнительные действия при успешном входе
                // Например, перенаправление пользователя на другую страницу
            } catch (error) {
                // Обработка ошибок при входе
                console.log(error);
            }


            // Добавь обработку успешного создания мероприятия
        } catch (error: any) {
            console.error('Error creating user:', error.message);
            // Добавь обработку ошибок
        }
    }
    return (
        <>
            <div className="register-page main">
                <div className="auth-block">
                    <h2 className="title">New account</h2>
                    <Input type="text" label="First name" className="field__email" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <Input type="text" label="Last name" className="field__email" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <Input type="email" label="Email" className="field__email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" label="Password" className="field__password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button color="primary" className="btn__login" onClick={() => createAccountHandler()}>Create</Button>
                    <span className="subspan__signup">Do you have already account? <Link to="/login" className="subspan__signup-link">Login Account</Link></span>
                </div>
            </div>
            <ModalLoading />
        </>
    );
};

export default RegisterPage;