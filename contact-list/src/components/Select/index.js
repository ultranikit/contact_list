import React from 'react';

import Select from 'react-select';



export const ContactSelect = ({options, handleOnChange, sortContacts}) => (
    <Select
        onChange={(event) => handleOnChange(event, options, sortContacts)}
        styles={{
            container: (provided) => ({
                ...provided,
                width: 300,
                margin: '20px 0',
            }),
            placeholder: base => ({
                ...base,
                fontSize: '1em',
                color: options[0].color,
                fontWeight: 400,
            }),
        }}
        placeholder={'Sort contact list'}
        // defaultValue={options[0]}
        options={options}
    />
);