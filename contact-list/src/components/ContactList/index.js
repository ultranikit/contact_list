import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";

import { AddNewContactForm } from './AddNewContactForm';
import { ContactItem } from '../';
import { getContacts, addNewContact, deleteContact } from '../../store';

import './style.scss'

const mapStateToProps = state => ({
    contacts: state.contacts
});

export const ContactList = connect(mapStateToProps, {getContacts, addNewContact, deleteContact})(props => {
    const { contacts ,getContacts, addNewContact, deleteContact } = props;

    const [addContactForm, statusForm] = useState(false);

    useEffect(() => {
        getContacts();
    }, [getContacts]);

console.log(props);
console.log(contacts);
    return (
        <div className="contacts">
            <button onClick={() => statusForm(true)}>add test</button>
            {
                addContactForm ? <AddNewContactForm addNew={addNewContact}/> : null
            }
            {
                contacts.contact_list.map(item => <ContactItem contact={item} key={item._id} delete={deleteContact}/>)
            }
        </div>

    )
});