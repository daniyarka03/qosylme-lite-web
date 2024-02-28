import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@nextui-org/react";
import {Link} from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const HomePage = () => {
    const [place, setPlace] = useState<any>("");
    console.log(place)
    return (
        <div>
            <h2>Home Page</h2>
            <Link to="/event/create"><Button color="primary">Create new event</Button></Link>



            <BottomNavbar />
        </div>
    );
};

export default HomePage;