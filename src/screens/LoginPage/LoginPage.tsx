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
            const token = result.data.login.token;
            const refreshToken = result.data.login.refreshToken;
            //
            // // Устанавливаем токен в localStorage
            localStorage.setItem('token', `${token}`);
            localStorage.setItem('refreshToken', `${refreshToken}`);
            window.location.href = '/';

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="login-page">
                <div className="auth-block">
                    <h2 className="login-page-title">Login</h2>

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
                    }} color="default" label="Email" className="field__email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password"  classNames={{
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
                    }} label="Password" className="field__password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button color="primary" className="btn__login" onClick={loginHandler} >Login</Button>
                    <span className="subspan__signup">If you don't have account? <Link to="/register" className="subspan__signup-link">Create account</Link></span>
                </div>
            </div>
        </>
    );
};

export default LoginPage;