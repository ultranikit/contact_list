import React from 'react';

export const Button = (props) => {
    const {className, buttonName, onClick} = props.buttonOptions;
    return (
        <button className={className} onClick={onClick}>
         {buttonName}
        </button>
    )
};