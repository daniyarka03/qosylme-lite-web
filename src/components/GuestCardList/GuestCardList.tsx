import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_USER_BY_ID, GET_USERS} from "../../graphQL/Queries";

interface GuestCardListProps {
    guest: any;
}
const GuestCardList = ({guest}: GuestCardListProps) => {

    const {data} = useQuery(GET_USERS)
    const [guests, setGuests] = React.useState<any[]>([]);

    useEffect(() => {
        if (data) {
            const users = data.users.filter((user: any) => {
               return user.userId === guest.toString();
            });
            setGuests(users);
        }
    }, [data]);
    return (
        <div>
            {guests.map((guest: any) => {
                return (
                    <div key={guest.id}>
                        <div>{guest.firstname + " " + guest.lastname}</div>
                    </div>
                )
            })}
        </div>
    );
};

export default GuestCardList;