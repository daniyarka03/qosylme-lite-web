import React from 'react';
import {useStore} from "../../store/store";
import {Button} from "@nextui-org/react";
import {Link} from "react-router-dom";


const HomePage = () => {

    return (
        <div>
            <h2>Home Page</h2>
           <Link to="/event/create"><Button color="primary">Create new event</Button></Link>
        </div>
    );
};

export default HomePage;