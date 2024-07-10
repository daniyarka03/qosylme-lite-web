import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_USER_BY_ID, GET_USERS} from "../../graphQL/Queries";
import "./GuestCardList.css";
import {Avatar} from "@nextui-org/react";

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
    console.log(guest)
    return (
        <div>
            <div className="guest-card-list">
                <div className="guest-card" key={guest.id}>
                    <Avatar style={{   width: "50px",
                        height: "50px"}} src={import.meta.env.VITE_SERVER_URL + guest.avatar} alt="avatar" />
                    <p>{guest.firstname + " " + guest.lastname}</p>
                </div>
            </div>
        </div>
    );
};

export default GuestCardList;