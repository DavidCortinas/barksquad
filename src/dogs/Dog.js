import React from "react";
import './Dog.css'
import { connect } from "react-redux";

const Dog = ({ dog }) => (
        <div className="dog-container">
            <h3>{dog.name}</h3>
            <h5>Breed: {dog.breed} | Owner: {dog.owner} | Size: {dog.size}</h5>
            <p>{dog.description}</p>
        </div>
);

const mapStateToProps = state => ({
    dogs: state.data.dogs,
});

export default connect(mapStateToProps)(Dog);