import {useQuery} from "@apollo/client";
import {GET_USER_BY_ID} from "../graphQL/Queries";
import { jwtDecode } from "jwt-decode";

interface User {
    user_id: string,
    email: string,
    firstname: string,
    lastname: string,
}
export const useInfoProfile = () => {

    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken: any = jwtDecode(token);
        const user_id = decodedToken.userId;

        const { data, loading, error } = useQuery(GET_USER_BY_ID, {
            variables: {
                userId: user_id
            }
        });


    if (data) {
        return data.getUserById;
    }
    }
    return null;
};
