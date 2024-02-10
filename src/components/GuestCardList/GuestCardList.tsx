import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_USER_BY_ID, GET_USERS} from "../../graphQL/Queries";
import "./GuestCardList.css";

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
                   <div className="guest-card-list">
                       <div className="guest-card" key={guest.id}>
                           <img src={"https://i.pinimg.com/236x/4d/99/b9/4d99b9e808b5ef5bd317b389c4c75120.jpg"} alt="avatar" />
                           <p>{guest.firstname + " " + guest.lastname}</p>
                       </div>
                   </div>
                )
            })}
        </div>
    );
};

export default GuestCardList;