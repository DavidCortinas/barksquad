import React, { useState } from "react";
import ReactModal from 'react-modal';
import { connect } from "react-redux";
import { updateDog } from "./actions";
import './UpdateDogForm.css'

const UpdateDogForm = ({ onUpdatePressed, index, dog }) => {
    const modalStyle = {
        content: {
            width: '25%',
            height: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState(dog.name);
    const [breed, setBreed] = useState(dog.breed);
    const [owner, setOwner] = useState(dog.owner);
    const [size, setSize] = useState(dog.size);
    const [description, setDescription] = useState(dog.description);

    const updatedDog = {name, breed, owner, size, description}

    ReactModal.setAppElement('#root')

    return ( 
        <div>
            <button 
                className="open-edit" 
                onClick={() => setShowModal(true)}
            >
                Update Dog Properties
            </button>
            <ReactModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={modalStyle}
            >
                <form onSubmit={() => {onUpdatePressed(index, updatedDog)}}>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={name}
                        placeholder="Update dog's name"
                        onChange={e => setName(e.target.value)}
                        className="update-input"/>
                    <br />
                    <label>Breed:</label>
                    <input 
                        type="text" 
                        id="breed" 
                        name="breed"
                        value={breed}
                        placeholder="Update dog's breed"
                        onChange={e => setBreed(e.target.value)}
                        className="update-input"/>
                    <br />
                    <label>Owner:</label>
                    <input 
                        type="text" 
                        id="owner" 
                        name="owner"
                        value={owner}
                        placeholder="Update dog's owner"
                        onChange={e => setOwner(e.target.value)}
                        className="update-input"/>
                    <br />
                    <label>Size:</label>
                    <select className="update-input" onChange={e => setSize(e.target.value)}>
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
                        className="update-input"></textarea>
                    <br />
                    <button type="submit">Update</button>
                    <button type='button' onClick={() => setShowModal(false)}>Cancel</button>
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
    onUpdatePressed: (index, dog) => dispatch(updateDog(index, dog))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDogForm);