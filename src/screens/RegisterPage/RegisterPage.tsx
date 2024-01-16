import React from 'react';
import {Button, Input} from "@nextui-org/react";
import {Link} from "react-router-dom";
import './RegisterPage.css';

const RegisterPage = () => {


    const createAccountHandler = () => {
        console.log('create account');
    }
    return (
        <>
            <div className="login-page main">
                <div className="auth-block">
                    <h2 className="title">New account</h2>
                    <Input type="email" label="Email" className="field__email" />
                    <Input type="password" label="Password" className="field__password" />
                    <Button color="primary" className="btn__login" onClick={() => createAccountHandler}>Create</Button>
                    <span className="subspan__signup">Do you have already account? <Link to="/login" className="subspan__signup-link">Login Account</Link></span>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;