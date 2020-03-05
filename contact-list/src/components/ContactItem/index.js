import React from 'react';

import {IoIosStar} from 'react-icons/io';
import {Button} from '../'
import './style.scss'

export const ContactItem = (props) => {
    const {contact, deleteContact, handleEditContact, handleFavorite} = props;

    const deleteButtonOptions = {
        onClick: () => deleteContact(contact),
        className: 'contact-details__buttons-wrap__buttons contact-details__buttons-wrap__remove-contact',
        buttonName: 'Delete'
    };

    const editButtonOptions = {
        onClick: (event) => handleEditContact(event, contact),
        className: 'contact-details__buttons-wrap__buttons contact-details__buttons-wrap__edit-contact',
        buttonName: 'Edit'
    };

    const favoriteIcon = (updateContact, contact) => {
        return (
            <div className="favorite" onClick={(e) => {
                e.preventDefault();
                contact.favorite = !contact.favorite;
                updateContact(contact);
            }}>
            <IoIosStar className={`favorite-icon ${contact.favorite ? 'favorite-active' : ''}`} />
            </div>
        )
    };

    return (
        <div className={`contact-container ${contact.favorite ? 'favorite-container' : ''}`}>
            <div className="contact-details">
                <div className="contact-details__image-wrap">
                    {contact.src ? <img src="" alt=""/> : <span className="contact-name-letter">{contact.name[0].toUpperCase()}</span>}
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
                    <Button buttonOptions={editButtonOptions}/>
                    <Button buttonOptions={deleteButtonOptions}/>
                    {favoriteIcon(handleFavorite, contact)}

                </div>
            </div>

            <div className="contact-additional-info">
                {contact.details}
            </div>
        </div>
    )
};