import React from "react";
import { Route, Routes } from 'react-router-dom';
import DogList from './dogs/DogList';
import DogProfile from './dogs/DogProfile';

const Container = () => {
    
    return (
        <Routes>
            <Route exact path="/:dogName" element={<DogProfile />}/>
            <Route exact path="/" element={<DogList />}/>
        </Routes>
    )
}

export default Container