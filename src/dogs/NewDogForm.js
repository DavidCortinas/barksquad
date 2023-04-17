import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import './NewDogForm.css';
import { createDog, sortDogs } from "./actions";
import ReactModal from "react-modal";

const NewDogForm = ({ onCreatePressed, showModal, setShowModal, onResetSort }) => {
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
    const { sortOrder } = useSelector(
        (state) => state.data
    );

    const dog = {name, breed, owner, size, description}

    const handleCreateDog = () => {
        onCreatePressed(dog);
        onResetSort(sortOrder);
    }

    ReactModal.setAppElement('#root')

    return (
        <div className="new-dog-form">
            <ReactModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={modalStyle}
            >
                <div className="modal-header">
                    <h3 className="modal-title">Add Dog</h3>
                    <button className="modal-close-button" type='button' onClick={() => setShowModal(false)}>
                        <h3 className="modal-title">X</h3>
                    </button>
                </div>
                <form onSubmit={handleCreateDog}>
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
                        placeholder="People often describe me as..."
                        onChange={e => setDescription(e.target.value)}
                        className="new-input"
                    />
                    <br />
                    <button type="submit">Add</button>
                    <button type='button' className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
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
    onCreatePressed: dog => dispatch(createDog(dog)),
    onResetSort: sortOrder => dispatch(sortDogs(sortOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDogForm);