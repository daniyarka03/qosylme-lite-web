import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {VERIFY_TOKEN} from "../graphQL/Queries";

const CheckingValideToken = () => {
    const token = localStorage.getItem('token');
    const {refetch: verifyToken} = useQuery(VERIFY_TOKEN, {
        skip: true
    });

    useEffect(() => {
        const fetchVerifyToken = async () => {
            if (token) {
                try {
                    const {data} = await verifyToken({
                        token: token.toString()
                    });
                } catch (error: any) {
                    if (error.message.includes('Invalid token')) {
                        // Обработка ошибки, связанной с недействительным токеном
                        console.error("Invalid token error:", error);
                        localStorage.removeItem('token');
                        localStorage.removeItem('refreshToken');
                        window.location.href = '/login';
                    } else {
                        // Обработка других ошибок
                        console.error("Error verifying token:", error);
                    }
                }
            }
        };

        fetchVerifyToken();
    }, [token, verifyToken]);



    return (
        <div>
            
        </div>
    );
};

export default CheckingValideToken;