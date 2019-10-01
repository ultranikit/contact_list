import React from 'react';
import './style.scss'

export const ContactItem = (props) => {
    const { contact, delete: deleteContact } = props;
    console.log(props);

    console.log(contact);
    return (
        <div className="contact-container">
            <div className="contact-details">
                <div className="contact-details__image-wrap">
                    <img src="" alt=""/>
                </div>
                <div className="contact-details__contact-info">
                    <p className="contact-details__contact-info__name">
                        {contact.name}
                    </p>
                    <p className="contact-details__contact-info__number">
                        {contact.phone}
                    </p>
                </div>

                <div className="contact-details__buttons-wrap">
                    <button className="contact-details__buttons-wrap__buttons contact-details__buttons-wrap__edit-contact">Edit</button>
                    <button onClick={() => {
                        console.log(contact._id)
                        deleteContact(contact)
                    }} className="contact-details__buttons-wrap__buttons contact-details__buttons-wrap__remove-contact">Delete</button>
                </div>
            </div>

            <div className="contact-additional-info">
                {contact.details}
            </div>
        </div>
    )
}