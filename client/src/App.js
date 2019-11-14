import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BASE_URL } from './index';

import Layout from './components/Layout';
import Code from './components/Code';
import Input from './components/Input';

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

const Title = styled.h1`
    text-align: center;
`;

const Card = styled.section`
    background: #300a24;
    color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    h3 {
        margin-top: 0;
    }
`;

const List = styled.ul``;

const App = () => {
    const [input, setInput] = React.useState('');
    const [responses, setResponses] = React.useState([]);
    const [result, setResult] = React.useState(null);

    async function getConversion() {
        const response = await fetch(`${BASE_URL}/api/convert?input=${input}`);
        const data = await response.json();
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
                    <List as="ol">
                        <li>
                            I will help prevent the client from trying to
                            guess(sniff) the MIME type.
                        </li>
                        <li>
                            I will prevent cross-site scripting (XSS) attacks.
                        </li>
                        <li>
                            I can <strong>GET</strong>{' '}
                            <Code inline>/api/convert</Code> with a single
                            parameter containing an accepted number and unit and
                            have it converted.
                        </li>
                        <li>
                            Hint: Split the input by looking for the index of
                            the first character.
                        </li>
                        <li>
                            I can convert 'gal' to 'L' and vice versa.{' '}
                            <strong>(1 gal to 3.78541 L)</strong>
                        </li>
                        <li>
                            I can convert 'lbs' to 'kg' and vice versa.{' '}
                            <strong>(1 lbs to 0.453592 kg)</strong>
                        </li>
                        <li>
                            I can convert 'mi' to 'km' and vice versa.{' '}
                            <strong>(1 mi to 1.60934 km)</strong>
                        </li>
                        <li>
                            If my unit of measurement is invalid, returned will
                            be 'invalid unit'.
                        </li>
                        <li>
                            If my number is invalid, returned with will 'invalid
                            number'.
                        </li>
                        <li>
                            If both are invalid, return will be 'invalid number
                            and unit'.
                        </li>
                        <li>
                            I can use fractions, decimals or both in my
                            parameter(ie. 5, 1/2, 2.5/6), but if nothing is
                            provided it will default to 1.
                        </li>
                        <li>
                            My return will consist of the initNum, initUnit,
                            returnNum, returnUnit, and string spelling out units
                            in format{' '}
                            <Code
                                inline
                            >{`{initNum} {initial_Units} converts to {returnNum} {return_Units}`}</Code>{' '}
                            with the result rounded to 5 decimals.
                        </li>
                        <li>All 16 unit tests are complete and passing.</li>
                        <li>
                            All 5 functional tests are complete and passing.
                        </li>
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
                    <Input
                        value={input}
                        onClick={getConversion}
                        onChange={e => setInput(e.target.value)}
                    >
                        Convert
                    </Input>

                    {result && (
                        <>
                            <h3>Result</h3>
                            <Code box>
                                {result.string ? result.string : result}
                            </Code>
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
};

export default App;
