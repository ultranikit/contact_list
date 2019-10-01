import { combineReducers } from 'redux';
import * as action_type from './constants.js';
// state for start
const initialState = {
    contacts: {
        contact_list: [],
    }
};

function contactsReducer(state = initialState.contacts, action) {
    const { type, payload } = action;
    switch (type) {
        case action_type.SET_CONTACTS:
            return {
                ...state,
                contact_list: payload
            };
        case action_type.SET_NEW_CONTACT:
            return {
                ...state,
                contact_list:
                    [
                        ...state.contact_list,
                        payload
                    ]
            };
        case action_type.SET_DELETE_CONTACT:
            return {
                ...state,
                contact_list: state.contact_list.filter(contact => contact._id !== payload._id)
            };

        default:
            return state;
    }
}

export const reducer = combineReducers({
    contacts: contactsReducer,
});