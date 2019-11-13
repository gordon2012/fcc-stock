import React from 'react';
import styled from 'styled-components';

const StyledCode = styled.code`
    font-family: 'Ubuntu Mono', monospace;
    color: #70ca40;
    white-space: pre-wrap;

    ${props => (props.inline ? 'display: inline-block;' : 'display: block;')}

    ${props =>
        props.box
            ? `
    border: 1px solid #70ca40;
    padding: 0.5rem;
    &:not(:last-child) {
        margin-bottom: 1rem;
    }
    `
            : ''}
`;
const Code = ({ children, indent, ...props }) => {
    const value =
        typeof children === 'string'
            ? children
            : JSON.stringify(children, null, indent || 2);
    return <StyledCode {...props}>{value}</StyledCode>;
};

export default Code;
