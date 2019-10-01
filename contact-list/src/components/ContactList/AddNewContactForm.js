import React from 'react';

export const AddNewContactForm = ({addNew}) => {
    const sendData = (event) => {
        event.preventDefault();
        const form = document.querySelector('#new_contact');
        const values = Object.values(form).reduce((obj,field) => { obj[field.name] = field.value; return obj }, {});
        console.log(values);
        addNew(values);
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

    return (
            <form id="new_contact" className="contact-form">
                <div className="form-group">
                    <label className="form-group__label" htmlFor="name">Name</label>
                    <input className="form-group__input" name="name" type="text" onFocus={inputFocusBlur} onBlur={inputFocusBlur}/>
                </div>
                <div className="form-group">
                    <label className="form-group__label" htmlFor="phone">Phone</label>
                    <input className="form-group__input" name="phone" type="text" onFocus={inputFocusBlur} onBlur={inputFocusBlur}/>
                </div>
                <div className="form-group">
                    <label className="form-group__label" htmlFor="details">Details</label>
                    <input className="form-group__input" name="details" type="text" onFocus={inputFocusBlur} onBlur={inputFocusBlur}/>
                </div>
                <button onClick={sendData} className="add-new-contact">Add new contact</button>
                <button onClick={() => console.log('test')} className="close-modal-button">X</button>
            </form>
    )
};