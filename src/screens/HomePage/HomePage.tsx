import React from 'react';
import {Button} from "@nextui-org/react";
import {Link} from "react-router-dom";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";


const HomePage = () => {

    return (
        <div>
            <h2>Home Page</h2>
           <Link to="/event/create"><Button color="primary">Create new event</Button></Link>
            <BottomNavbar />
        </div>
    );
};

export default HomePage;