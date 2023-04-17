import React from "react";
import { Link } from 'react-router-dom';
import pawprint from './assets/pawprint.png';
import dogbannerimage from './assets/dogbannerimage.png';
import './Header.css';
import { connect } from "react-redux";
import { filterDogs } from "./dogs/actions";

const Header = ({ onSearchPressed }) => {
    const handleHomeClick = () => {
        onSearchPressed("", "");
    }
    return (
        <div className="header">
            <Link to="/" onClick={handleHomeClick}>
                <div className="logo-title">
                    <img src={pawprint} className="App-logo" alt="logo" />
                    <h2 className="title">
                        BarkSquad
                    </h2>
                    <span className="subheader">Meet Our Team of Pooches</span>
                </div>
                <img className="dog-img" src={dogbannerimage} alt="dog-header" />
            </Link>
        </div>
);}

const mapStateToProps = (state) => {
    return {
        dogs: state.data.dogs,
    }
};

const mapDispatchToProps = dispatch => ({
    onSearchPressed: (query, sizeFilter) => dispatch(filterDogs(query, sizeFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)