import React from 'react';
import { BASE_URL } from './index';

import Layout from './components/Layout';
import Card from './components/Card';
import Code from './components/Code';
import Form from './components/Form';
import Input from './components/Input';
import Button from './components/Button';

import './style.css';

const Title = ({ children, as, ...props }) => {
    const H = ({ children, ...props }) =>
        as === 'h2' ? (
            <h2 {...props}>{children}</h2>
        ) : (
            <h1 {...props}>{children}</h1>
        );

    return (
        <H {...props} style={{ textAlign: 'center' }}>
            {children}
        </H>
    );
};

const List = props => <ul {...props} />;

const App = () => {
    const [responses, setResponses] = React.useState([]);

    const [results, setResults] = React.useState({});
    const clearResult = name =>
        setResults(prevState => {
            const { [name]: __, ...newState } = prevState;
            return newState;
        });

    const getExample = async () => {
        const response = await fetch(`${BASE_URL}/api/example`);
        const data = await response.json();
        setResponses(prevState => [data, ...prevState]);
        setResults(prevState => ({ ...prevState, getExample: data }));
    };

    return (
        <Layout>
            <Title>Stock Checker</Title>

            <Card>
                <h3>User Stories</h3>
                <List>
                    <li>
                        Set the content security policies to only allow loading
                        of scripts and CSS from your server.
                    </li>
                    <li>
                        I can <Code inline>GET /api/stock-prices</Code> with
                        form data containing a Nasdaq stock ticker and receive
                        back an object stockData.
                    </li>
                    <li>
                        In stockData, I can see the stock (the ticker as a
                        string), price (decimal in string format), and likes
                        (int).
                    </li>
                    <li>
                        I can also pass along field like as true (boolean) to
                        have my like added to the stock(s). Only 1 like per IP
                        should be accepted.
                    </li>
                    <li>
                        If I pass along 2 stocks, the return object will be an
                        array with information about both stocks. Instead of
                        likes, it will display rel_likes (the difference between
                        the likes on both stocks) on both.
                    </li>
                    <li>
                        A good way to receive current prices is through our
                        stock price proxy (replacing 'GOOG' with your stock
                        symbol):
                        https://repeated-alpaca.glitch.me/v1/stock/GOOG/quote
                    </li>
                    <li>All 5 functional tests are complete and passing.</li>
                </List>
            </Card>

            <Card>
                <h3>Example Usage</h3>
                <Code>/api/stock-prices?stock=GOOG</Code>
                <Code>/api/stock-prices?stock=GOOG&like=true</Code>
                <Code>/api/stock-prices?stock=GOOG&stock=MSFT</Code>
                <Code>/api/stock-prices?stock=GOOG&stock=MSFT&like=true</Code>
            </Card>

            <Card>
                <h3>Example Return</h3>
                <Code box>
                    {{
                        stockData: { stock: 'GOOG', price: '786.90', likes: 1 },
                    }}
                </Code>
                <Code box>
                    {{
                        stockData: [
                            { stock: 'MSFT', price: '62.30', rel_likes: -1 },
                            { stock: 'GOOG', price: '786.90', rel_likes: 1 },
                        ],
                    }}
                </Code>
            </Card>

            <Title as="h2">Front-End</Title>

            <Card>
                <h3>Input</h3>

                <Form debug onSubmit={getExample}>
                    <Input required name="name" title="Name" />
                    <Button type="submit">Submit</Button>
                </Form>

                {results.getExample && (
                    <>
                        <h3>Result</h3>
                        <Code box>{results.getExample}</Code>
                        <Button onClick={() => clearResult('getExample')}>
                            Clear
                        </Button>
                    </>
                )}
            </Card>

            {responses.length > 0 && (
                <>
                    <Title as="h2">Responses</Title>
                    <Card>
                        {responses.map((e, i) => (
                            <Code box key={i}>
                                {e}
                            </Code>
                        ))}
                    </Card>
                </>
            )}
        </Layout>
    );
};

export default App;
