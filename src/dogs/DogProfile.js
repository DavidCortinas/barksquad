import React from "react";
import'./DogProfile.css';
import pawbadge from '../assets/pawbadge.png';
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const DogProfile = (data) => {

    const { dogName } = useParams()
    const dog = data.dogs.find(dog => dog.name === dogName)
    const dogSize = dog.size === "XS" ? "extra-small" 
        : dog.size === "SM" ? "small"
        : dog.size === "MD" ? "medium"
        : dog.size === "LG" ? "large"
        : "extra-large"

    return (
        <div className='dog-profile'>
            <img src={pawbadge} className="badge" alt="logo" />
            <h3>Hello, my name is {dog.name}!</h3>
            <p>I am a {dogSize} {dog.breed.toLowerCase()} who love's spending time with my owner {dog.owner}.</p>
            <p>People often describe me as {dog.description.toLowerCase()}.</p>

        </div>
    )
};

const mapStateToProps = state => ({
    dogs: state.data.dogs,
});

export default connect(mapStateToProps)(DogProfile);