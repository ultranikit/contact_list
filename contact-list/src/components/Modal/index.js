import React, {Fragment, useState} from 'react';

import {Button} from "../";
import {MdClose} from 'react-icons/md';
import './style.scss'

export const Modal = (props) => {
    const {handleSubmit, closeModal, isNewContact, editingContact} = props;

    const [contact, setContact] = useState(editingContact);
    const {name, phone, details} = contact;

    const sendData = (event) => {
        event.preventDefault();
        const isValid = validate(contact);
        if (isValid.error) return alert(isValid.message);
        handleSubmit(contact);
        closeModal(event);
    };


    const validate = (contact) => {
        const phoneNumber = /^[0-9\s]*$/;
        const nameRegex = /^[A-Za-z]+$/;

        const obj = {error: true, message: ''};
        for (let key in contact) {
            const value = contact[key];

            switch (key) {
                case 'phone':
                    if (!phoneNumber.test(value)) {
                        obj.message = 'phone is not correct';
                        return obj;
                    }
                    break;

                case 'name':
                    if (!value.match(nameRegex)) {
                        obj.message = 'name is not correct';
                        return obj;
                    }
                    break;

                default: {

                }
            }
        }
        obj.error = false;
        return obj;
    };

    const handleInputChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setContact({
            ...contact,
            [key]: value
        })
    };

    const inputFocusBlur = (event) => {
        const inputElement = event.target;
        const targetContainer = event.target.parentNode;

        const targetLabel = targetContainer.querySelector('.form-group__label');
        if (targetLabel.classList.contains('form-group__label-active')) {
            if (inputElement.value === '') {
                return targetLabel.classList.remove('form-group__label-active')
            } else return true
        }
        return targetLabel.classList.add('form-group__label-active');
    };

    const addButtonOptions = {
        onClick: sendData,
        className: 'add-new-contact',
        buttonName: 'Add contact'
    };

    const editButtonOptions = {
        onClick: sendData,
        className: 'add-new-contact',
        buttonName: 'Update contact'
    };

    const closeButtonOptions = {
        onClick: closeModal,
        className: 'close-modal-button',
        buttonName: <MdClose />
    };


    return (
        <Fragment>

            <div className="form-overlay" onClick={closeModal}/>

            <form id="new_contact" className="contact-form">
                <div className="form-group">
                    <label className={name ? "form-group__label form-group__label-active" : "form-group__label"}
                           htmlFor="name">Name</label>
                    <input className="form-group__input"
                           name="name"
                           type="text"
                           value={name}
                           onFocus={inputFocusBlur}
                           onBlur={inputFocusBlur}
                           onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label className={phone ? "form-group__label form-group__label-active" : "form-group__label"}
                           htmlFor="phone">Phone</label>
                    <input className="form-group__input"
                           name="phone"
                           type="text"
                           value={phone}
                           onFocus={inputFocusBlur}
                           onBlur={inputFocusBlur}
                           onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label className={details ? "form-group__label form-group__label-active" : "form-group__label"}
                           htmlFor="details">Details</label>
                    <input className="form-group__input"
                           name="details"
                           type="text"
                           value={details}
                           onFocus={inputFocusBlur}
                           onBlur={inputFocusBlur}
                           onChange={handleInputChange}
                    />
                </div>
                <Button buttonOptions={isNewContact ? addButtonOptions : editButtonOptions}/>
                <Button buttonOptions={closeButtonOptions}/>
            </form>

        </Fragment>
    )
};