import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";

import {ContactItem, Modal} from '../';
import {getContacts, addNewContact, deleteContact, editContact, setModal} from '../../store';

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
};

export const ContactList = connect(mapStateToProps, actionCreators)(props => {
    const {contacts, getContacts, addNewContact, deleteContact, editContact, modalStatus, setModal} = props;

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

    useEffect(() => {
        getContacts();
    }, [getContacts]);

    return (
        <Fragment>
            <div className="contacts">
                <button onClick={() => setModal(!modalStatus)}>Add new contact</button>

                {
                    contacts.contact_list.map(item => <ContactItem contact={item} key={item._id}
                                                                   deleteContact={deleteContact} handleEditContact={handleEditContact} />)
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