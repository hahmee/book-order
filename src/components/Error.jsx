import React from 'react';

const Error = ({message, title}) => {
    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}

export default Error;