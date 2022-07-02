import React from 'react';

const ListErrors = ({ messagess, state = 'failure' }) => {
    if (!messagess || Object.keys(messagess).length === 0) {
        return null;
    }
    const errorMessages = Object.entries(messagess).flatMap(
        ([property, messages]) =>
            typeof messages === 'object'
                ? messages.map((message) => `${property} ${message}`)
                : null
    );

    return (
        <div className={`error-list ${state}-state`}>
            {errorMessages &&
                errorMessages.map((message) => (
                    <div key={message}>{message}</div>
                ))}
        </div>
    );
};

export default ListErrors;
