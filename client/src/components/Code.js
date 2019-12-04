import React from 'react';

const Code = ({ children, indent, inline, box, ...props }) => {
    let style = {
        fontFamily: `'Ubuntu Mono', monospace`,
        color: '#70ca40',
        whiteSpace: 'pre-wrap',

        display: inline ? 'inline-block' : 'block',
    };
    if (box) {
        style.border = '1px solid #70ca40';
        style.padding = '0.5rem';
        style.marginBottom = '1rem';
    }

    const value =
        typeof children === 'string'
            ? children
            : JSON.stringify(children, null, indent || 2);
    return (
        <code {...props} style={style}>
            {value}
        </code>
    );
};

export default Code;
