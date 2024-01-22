import React from 'react';
import {Button, Input} from "@nextui-org/react";
import './LoginPage.css';
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {LOGIN_MUTATION} from "../../graphQL/Mutations";
const LoginPage = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

    const loginHandler = async () => {
        try {
            // Выполняем мутацию для входа
            const result = await login({ variables: { email, password } });

            // Получаем токен из результата мутации
            const token = result.data.tokenAuthWithUser.token;
            //
            // // Устанавливаем токен в localStorage
            localStorage.setItem('token', `${token}`);
            window.location.href = '/';

            // Дополнительные действия при успешном входе
            // Например, перенаправление пользователя на другую страницу
        } catch (error) {
            // Обработка ошибок при входе
            console.log(error);
        }
    };

    return (
        <>
            <div className="login-page main">
                <div className="auth-block">
                    <h2 className="title">Login</h2>

                    <Input type="email" color="primary" label="Email" className="field__email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" label="Password" className="field__password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button color="primary" className="btn__login" onClick={loginHandler} >Login</Button>
                    <span className="subspan__signup">If you don't have account? <Link to="/register" className="subspan__signup-link">Create account</Link></span>
                </div>
            </div>
        </>
    );
};

export default LoginPage;