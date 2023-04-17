import React, { useState } from "react";
import ReactModal from 'react-modal';
import { connect } from "react-redux";
import { removeDog } from "./actions";
import './RemoveDogModal.css'

const RemoveDogModal = ({ onRemovePressed, dog }) => {
    const modalStyle = {
        content: {
            width: '30%',
            height: '10%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    const [showModal, setShowModal] = useState(false);

    ReactModal.setAppElement('#root')

    return ( 
        <div>
            <button 
                className="send-home-button" 
                onClick={() => setShowModal(true)}
            >
                Send {dog.name} Home For The Day
            </button>
            <ReactModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={modalStyle}
            >
                <div className="modal-header">
                    <h3 className="modal-title">Are you sure you want to send {dog.name} home?</h3>
                    <button className="modal-close-button" type='button' onClick={() => setShowModal(false)}>
                        <h3 className="modal-title">X</h3>
                    </button>
                </div>
                {/* <h5>Are you sure you want to send {dog.name} home?</h5> */}
                <div className="button-container">
                    <button
                        onClick={() => onRemovePressed(dog)}
                        className="confirm-delete-button"    
                    >
                        Send home
                    </button>
                    <button type='button' className="cancel-delete-button" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </ReactModal>
        </div>
    );
};

const mapStateToProps = state => ({
    ...state,
    dogs: state.data.dogs,
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: (index, dog) => dispatch(removeDog(index, dog))
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveDogModal);