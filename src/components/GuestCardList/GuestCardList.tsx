import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_USER_BY_ID, GET_USERS} from "../../graphQL/Queries";
import "./GuestCardList.css";

interface GuestCardListProps {
    guest: any;
}
const GuestCardList = ({guest}: GuestCardListProps) => {
    // useEffect(() => {
    //     if (data) {
    //         const filteredGuests = guests.filter(guest => {
    //             return guest.user_id === guest.toString(); // Assuming guestId is defined elsewhere
    //         });
    //         setGuests(filteredGuests);
    //         console.log(filteredGuests)
    //     }
    // }, [data]);
    return (
        <div>
            <div className="guest-card-list">
                <div className="guest-card" key={guest.id}>
                    <img src={"https://i.pinimg.com/236x/4d/99/b9/4d99b9e808b5ef5bd317b389c4c75120.jpg"} alt="avatar" />
                    <p>{guest.firstname + " " + guest.lastname}</p>
                </div>
            </div>
        </div>
    );
};

export default GuestCardList;