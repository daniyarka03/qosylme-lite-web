import React from 'react';
import {useStore} from "../../store/store";

const HomePage = () => {

    const bears = useStore((state) => state.bears)
    const increasePopulation = useStore((state) => state.increasePopulation)

    return (
        <div>
            <h2>Home Page</h2>
            <h1>{bears} around here...</h1>
            return <button onClick={increasePopulation}>one up</button>
        </div>
    );
};

export default HomePage;