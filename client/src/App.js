import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BASE_URL } from './index';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono|Ubuntu:400,700&display=swap');

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        background: #fae8f5;
        font-family: "Ubuntu", "Helvetica", sans-serif;
    }
`;

// Components
const Title = styled.h1`
    text-align: center;
`;

const Card = styled('section')`
    background: #300a24;
    color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    h3 {
        margin-top: 0;
    }
`;

const Flex = styled.div`
    display: flex;
    ${props => (props.column ? 'flex-direction: column' : '')}
    ${props => (props.full ? 'min-height: 100vh;' : '')}
`;

const Box = styled.div`
    ${props => (props.flex ? `flex: ${props.flex};` : '')}
`;

const Container = styled.div`
    ${props =>
        props.width
            ? `
        max-width: ${props.width};
        margin: 0 auto;
    `
            : ''}
`;

const List = styled.ol`
    /* border: 3px solid blue; */
    li {
        /* border: 1px solid lime; */
    }
`;

const StyledCode = styled.code`
    font-family: 'Ubuntu Mono', monospace;
    color: #70ca40;
    display: block;
    white-space: pre-wrap;

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
const Code = ({ children, ...props }) => (
    <StyledCode {...props}>{JSON.stringify(children, null, 2)}</StyledCode>
);

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

// Input
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

// Layout
const StyledFooter = styled.footer`
    padding: 1rem;
    text-align: center;
`;
const Footer = () => (
    <StyledFooter>
        A{' '}
        <a
            href="https://freecodecamp.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            freeCodeCamp
        </a>{' '}
        Information Security and Quality Assurance Project
    </StyledFooter>
);

const Layout = ({ children }) => {
    return (
        <Flex full column>
            <Box flex={1}>
                <Container width="1000px">{children}</Container>
            </Box>
            <Box>
                <Footer />
            </Box>
        </Flex>
    );
};

function App() {
    const [responses, setResponses] = React.useState([]);
    const [result, setResult] = React.useState(null);

    async function getConversion() {
        const response = await fetch(`${BASE_URL}/api/convert`);
        const data = await response.json();
        console.log(data);
        setResponses(prevState => [data, ...prevState]);
        setResult(data);
    }

    return (
        <>
            <GlobalStyle />
            <Layout>
                <Title>Metric-Imperial Converter</Title>

                <Card>
                    <h3>User Stories</h3>
                    <List>
                        {[
                            `I will help prevent the client from trying to guess(sniff) the MIME type.`,
                            `I will prevent cross-site scripting (XSS) attacks.`,
                            `I can GET /api/convert with a single parameter containing an accepted number and unit and have it converted.`,
                            `Hint: Split the input by looking for the index of the first character.`,
                            `I can convert 'gal' to 'L' and vice versa. (1 gal to 3.78541 L)`,
                            `I can convert 'lbs' to 'kg' and vice versa. (1 lbs to 0.453592 kg)`,
                            `I can convert 'mi' to 'km' and vice versa. (1 mi to 1.60934 km)`,
                            `If my unit of measurement is invalid, returned will be 'invalid unit'.`,
                            `If my number is invalid, returned with will 'invalid number'.`,
                            `If both are invalid, return will be 'invalid number and unit'.`,
                            `I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.`,
                            `My return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in format {initNum} {initial_Units} converts to {returnNum} {return_Units} with the result rounded to 5 decimals.`,
                            `All 16 unit tests are complete and passing.`,
                            `All 5 functional tests are complete and passing.`,
                        ].map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </List>
                </Card>

                <Card>
                    <h3>Example Usage</h3>
                    <Code>/api/convert?input=4gal</Code>
                    <Code>/api/convert?input=1/2km</Code>
                    <Code>/api/convert?input=5.4/3lbs</Code>
                    <Code>/api/convert?input=kg</Code>
                </Card>

                <Card>
                    <h3>Example Return</h3>
                    <Code box>
                        {{
                            initNum: 3.1,
                            initUnit: 'mi',
                            returnNum: 4.98895,
                            returnUnit: 'km',
                            string: '3.1 miles converts to 4.98895 kilometers',
                        }}
                    </Code>
                </Card>

                <Title as="h2">Front-End</Title>

                <Card>
                    <h3>Input</h3>
                    <Input onClick={getConversion}>Convert</Input>

                    {result && (
                        <>
                            <h3>Result</h3>
                            <Code box>{result}</Code>
                        </>
                    )}

                    {responses.length > 0 && (
                        <>
                            <h3>Responses</h3>

                            {responses.map((e, i) => (
                                <Code box key={i}>
                                    {e}
                                </Code>
                            ))}
                        </>
                    )}
                </Card>
            </Layout>
        </>
    );
}

export default App;
