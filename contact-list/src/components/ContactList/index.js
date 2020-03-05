import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";

import {ContactItem, Modal, ContactSelect} from '../';
import {
    getContacts,
    addNewContact,
    deleteContact,
    editContact,
    setModal,
    sortContactByName,
    sortContactByFavorite,
    sortContactByEndName
} from '../../store';

import './style.scss'

const mapStateToProps = state => ({
    modalStatus: state.modal.modalStatus,
    contacts: state.contacts
});

const actionCreators = {
    getContacts,
    addNewContact,
    deleteContact,
    editContact,
    setModal,
    sortContactByName,
    sortContactByFavorite,
    sortContactByEndName
};

export const ContactList = connect(mapStateToProps, actionCreators)(props => {
    const {
        contacts, getContacts, addNewContact, deleteContact, editContact,
        modalStatus, setModal, sortContactByName, sortContactByFavorite, sortContactByEndName
    } = props;

    const [isNewContact, setIsNewContact] = useState(true);
    const [editingContact, setEditingContact] = useState({})
    const handleCloseModal = (event) => {
        event.preventDefault();
        setIsNewContact(true);
        setModal(!modalStatus);
    };
    const defaultModal = {
        name: '',
        phone: '',
        details: ''
    };

    const handleEditContact = (event, contact) => {
        setEditingContact(contact)
        event.preventDefault();
        setIsNewContact(false);
        setModal(!modalStatus);
    };


    const handleOnChangeSelect = (event, options, handleOnChange) => {
        event === options[0] && handleOnChange.sortContactByName();
        event === options[1] && handleOnChange.sortContactByFavorite();
        event === options[2] && handleOnChange.sortContactByEndName();
    };

    const selectOptions = [
        {value: 'Sort by A-Z', label: 'Sort by A-Z'},
        {value: 'Sort by favorites', label: 'Sort by favorites'},
        {value: 'Sort by Z-A', label: 'Sort by Z-A'},
    ];

    useEffect(() => {
        getContacts();
    }, [getContacts]);

    return (
        <Fragment>
            <div className="contacts">
                <button className={'global-btn'} onClick={() => setModal(!modalStatus)}>Add new contact</button>
                <ContactSelect handleOnChange={handleOnChangeSelect}
                               options={selectOptions}
                               sortContacts={{sortContactByName, sortContactByFavorite, sortContactByEndName}}
                />

                {
                    contacts.contact_list.map(item =>
                        <ContactItem
                            contact={item}
                            key={item._id}
                            deleteContact={deleteContact}
                            handleEditContact={handleEditContact}
                            handleFavorite={editContact}
                        />)
                }
            </div>
            {
                modalStatus ?
                    <Modal handleSubmit={isNewContact ? addNewContact : editContact}
                           closeModal={handleCloseModal}
                           isNewContact={isNewContact}
                           editingContact={isNewContact ? defaultModal : editingContact}
                    />
                    : null
            }
        </Fragment>
    )
});