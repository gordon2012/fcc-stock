import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const InputWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;
const InputInner = styled.div`
    flex: 1;
    display: flex;
`;
const StyledInput = styled.input`
    flex: 1;
    padding: 0.5rem;
    margin-right: 1rem;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 1em;
`;
const Input = ({ children, onClick }) => (
    <InputWrap>
        <InputInner>
            <StyledInput />
        </InputInner>
        <div>
            <Button onClick={onClick}>{children}</Button>
        </div>
    </InputWrap>
);

export default Input;
