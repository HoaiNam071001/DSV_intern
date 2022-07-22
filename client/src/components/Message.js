import React from 'react';
import Alert from '@mui/material/Alert';

const ListErrors = ({ messagess, state = 'error' }) => {
    if (!messagess || Object.keys(messagess).length === 0) {
        return null;
    }
    const errorMessages = Object.entries(messagess).flatMap(([property, messages]) =>
        typeof messages === 'object' ? messages.map((message) => `${property} ${message}`) : null
    );

    return (
        <div className="error-list">
            <Alert severity={state}>
                {errorMessages &&
                    errorMessages.map((message) => <div key={message}>{message}</div>)}
            </Alert>
        </div>
    );
};

export default ListErrors;
