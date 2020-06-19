import React from 'react';

const Notification = ({message}) => {
    if(message === null) return null;
    const notificationStyle = {
        padding: '1rem',
        border: `2px solid ${message.fail === true ? 'red' : 'green'}`,
        fontSize: 16,
        borderRadius: 10
    };
    return (
        <div style={notificationStyle}>
            {message.content}
        </div>
    );
};

export default Notification;