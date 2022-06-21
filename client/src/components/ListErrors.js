import React from 'react';

const ListErrors = ({ errors }) => {
    if (!errors || Object.keys(errors).length === 0) {
        return null;
    }

    const errorMessages = Object.entries(errors).flatMap(
        ([property, messages]) =>
            messages.map((message) => `${property} ${message}`)
    );

    return (
        <div className="text-center text-danger position-relative">
            {errorMessages.map((message) => (
                <div key={message}>{message}</div>
            ))}
        </div>
    );
};

export default ListErrors;
