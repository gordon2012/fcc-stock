import React from 'react';

const Card = ({ variant, ...props }) => {
    const style = {
        padding: '1rem',
        marginBottom: '1rem',
        background: `${variant === 'light' ? 'white' : '#300a24'}`,
        color: `${variant === 'light' ? '#300a24' : 'white'}`,
    };

    return <div {...props} style={style} />;
};

export default Card;
