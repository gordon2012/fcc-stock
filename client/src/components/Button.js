import React from 'react';

const Button = props => (
    <button
        {...props}
        style={{
            width: '100%',
            borderRadius: '3px',
            padding: '0.5rem 0',
            marginBottom: '0.5rem',
            color: 'white',
            border: '2px solid #e65100',
            textAlign: 'center',
            background: '#e65100',
        }}
    />
);

export default Button;
