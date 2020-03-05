import {combineReducers} from 'redux';
import * as action_type from './constants.js';
// state for start
const initialState = {
    modalStatus: false,
    contacts: {
        contact_list: [],
    }
};

function contactsReducer(state = initialState.contacts, action) {
    const {type, payload} = action;
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

        case action_type.UPDATE_CONTACT:
            const contactList = state.contact_list.slice();
            const findUpdateItemIndex = contactList.findIndex(item => item._id === payload._id);
            return {
                ...state,
                contact_list:
                    [
                        ...contactList.slice(0, findUpdateItemIndex)
                            .concat(contactList[findUpdateItemIndex] = payload)
                            .concat(contactList.slice(findUpdateItemIndex + 1))
                    ]
            };

        case action_type.SET_DELETE_CONTACT:
            return {
                ...state,
                contact_list: state.contact_list.filter(contact => contact._id !== payload._id)
            };

        case action_type.SORT_CONTACT_BY_NAME:
            return {
                ...state,
                contact_list: state.contact_list.sort((a,b) => a.name.localeCompare(b.name))
            };

        case action_type.SORT_CONTACT_BY_FAVORITE:
            return {
                ...state,
                contact_list: state.contact_list.sort((a, b) =>  (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
            };

        case action_type.SORT_CONTACT_BY_END_NAME:
            return {
                ...state,
                contact_list: state.contact_list.sort((a, b) => b.name.localeCompare(a.name))
            };

        default:
            return state;
    }
}

function modalReducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case action_type.SET_MODAL:
            return {
                ...state,
                modalStatus: payload
            };

        default:
            return {modalStatus: state.modalStatus};
    }
}

export const reducer = combineReducers({
    contacts: contactsReducer,
    modal: modalReducer,
});