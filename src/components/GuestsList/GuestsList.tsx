import React, {useEffect} from 'react';
import {Chip} from "@nextui-org/react";
import {useStoreGuests} from "../../store/store";

interface GuestsListProps {
        guests: number[]
}
const GuestsList = ({guests}: GuestsListProps) => {

    if (typeof guests === 'string') {
        guests = JSON.parse(guests);
    }

    return (
        <div>
            {guests.map((guest: number) => (
                <Chip color="primary" size="sm" style={{ margin: "5px" }}>
                    {guest}
                </Chip>
            ))}
        </div>
    );
};

export default GuestsList;