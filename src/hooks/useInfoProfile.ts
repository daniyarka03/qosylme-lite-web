import {useQuery} from "@apollo/client";
import {GET_CURRENT_USER} from "../graphQL/Queries";

export const useInfoProfile = () => {

    const token = localStorage.getItem('token');



    const { data, loading, error } = useQuery(GET_CURRENT_USER, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`, // Замените yourAuthToken на ваш токен
            },
        },
    });

    console.log(error);

    if (data) {
        console.log(data);
        return data.loggedIn;
    }
};
