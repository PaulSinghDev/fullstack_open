import React from 'react';

const Notification = ({message}) => {
    if(message === null) return null;
    const notificationStyle = {
        padding: '2rem',
        border: `2px solid ${message.fail === true ? 'red' : 'green'}`,
        fontSize: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        boxShadow: '0.2rem 0.2rem 0.6rem rgba(0,0,0,0.3)',
        zIndex: "2",
        maxWidth: 300
    };
    return (
        <div className="notification">
            <p style={notificationStyle}>
            {message.content}
            </p>
        </div>
    );
};

export default Notification;