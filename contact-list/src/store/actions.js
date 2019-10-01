import * as action_type from './constants.js';
import { take, put, all } from 'redux-saga/effects';

import axios from 'axios';

// actions

// contacts
export const getContacts = () => ({
    type: action_type.GET_CONTACTS,
});
export const addNewContact = (payload) => ({
    type: action_type.ADD_NEW_CONTACT,
    payload
});

export const deleteContact = (payload) => ({
    type: action_type.DELETE_CONTACT,
    payload
});


// Sagas
function* getContactsSaga() {
    while (true) {
        yield take( action_type.GET_CONTACTS );
        const response = yield axios.get( '/contacts');

        yield put({
            type: action_type.SET_CONTACTS,
            payload: response.data
        })
    }
}

function* addNewContactSaga() {
    while (true) {
        const {payload: new_contact} = yield take( action_type.ADD_NEW_CONTACT );
        const response = yield axios.post( '/add-contact', {new_contact});
        console.log(response);

        if (response.data.created) {
            yield put({
                type: action_type.SET_NEW_CONTACT,
                payload: response.data.new_contact
            })
        }
        else {
            console.log('ERROR WHEN ADD NEW CONTACT')
        }
    }
}

function* deleteContactSaga() {
    while (true) {
        const {payload: contact} = yield take( action_type.DELETE_CONTACT );
        const response = yield axios.delete( '/delete-contact', {data: { contact } });
        console.log(response);

        if (response.data.deleted) {
            yield put({
                type: action_type.SET_DELETE_CONTACT,
                payload: contact
            })
        }
        else {
            console.log('ERROR WHEN DELETE CONTACT')
        }
    }
}

export function* rootSaga() {
    console.log('saga');
    yield all([getContactsSaga(), addNewContactSaga(), deleteContactSaga()]);
}