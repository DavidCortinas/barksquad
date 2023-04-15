import React from "react";
import'./DogProfile.css';
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const DogProfile = (data) => {

    const { dogName } = useParams()
    const dog = data.dogs.find(dog => dog.name === dogName)

    return (
        <div className='dog-profile'>
            <h3>Hello, my name is {dog.name}!</h3>
            <p>I am a {dog.size} {dog.breed} who love's spending time with my owner {dog.owner}.</p>
            <p>People often describe me as {dog.description.toLowerCase()}.</p>
        </div>
    )
};

const mapStateToProps = state => ({
    dogs: state.data.dogs,
});

export default connect(mapStateToProps)(DogProfile);