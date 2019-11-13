import styled from 'styled-components';

const Button = styled.a`
    display: inline-block;
    border-radius: 3px;
    padding: 0.5rem 0;
    width: 11rem;
    background: transparent;
    color: white;
    border: 2px solid #e65100;
    text-align: center;
    background: #e65100;
    &:hover {
        cursor: pointer;
    }
`;

export default Button;
