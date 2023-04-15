import React, { useState } from "react";
import { connect } from "react-redux";
import './NewDogForm.css';
import { createDog } from "./actions";
import ReactModal from "react-modal";

const NewDogForm = ({ onCreatePressed, showModal, setShowModal }) => {
    const modalStyle = {
        content: {
            width: '25%',
            height: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [owner, setOwner] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');

    const dog = {name, breed, owner, size, description}

    ReactModal.setAppElement('#root')

    return (
        <div className="new-dog-form">
            <ReactModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={modalStyle}
            >
                <form onSubmit={() => {onCreatePressed(dog)}}>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={name}
                        placeholder="Add dog's name"
                        onChange={e => setName(e.target.value)}
                        className="new-input"
                    />
                    <br />
                    <label>Breed:</label>
                    <input 
                        type="text" 
                        id="breed" 
                        name="breed"
                        value={breed}
                        placeholder="Add dog's breed"
                        onChange={e => setBreed(e.target.value)}
                        className="new-input"
                    />
                    <br />
                    <label>Owner:</label>
                    <input 
                        type="text" 
                        id="owner" 
                        name="owner"
                        value={owner}
                        placeholder="Add dog's owner"
                        onChange={e => setOwner(e.target.value)}
                        className="new-input"
                    />
                    <br />
                    <label>Size:</label>
                    <select className="new-input" onChange={e => setSize(e.target.value)}>
                        <option value="XS">XS</option>
                        <option value="SM">SM</option>
                        <option value="MD">MD</option>
                        <option value="LG">LG</option>
                        <option value="XL">XL</option>
                    </select>
                    <br />
                    <label>Description:</label>
                    <textarea
                        cols={40}
                        rows={4}
                        type="text" 
                        id="description" 
                        name="description"
                        value={description}
                        placeholder="Update dog's description"
                        onChange={e => setDescription(e.target.value)}
                        className="new-input"
                    />
                    <br />
                    <button type="submit">Add</button>
                </form>
            </ReactModal>
        </div>
    );
};

const mapStateToProps = state => ({
    ...state,
    dogs: state.data.dogs,
});

const mapDispatchToProps = dispatch => ({
    onCreatePressed: dog => dispatch(createDog(dog))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDogForm);