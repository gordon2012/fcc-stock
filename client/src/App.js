import React from 'react';
import { BASE_URL } from './index';

function App() {
    const [responses, setResponses] = React.useState([]);

    async function getConversion() {
        const response = await fetch(`${BASE_URL}/api/convert`);
        const data = await response.json();
        console.log(data);
        setResponses(prevState => [data, ...prevState]);
    }

    return (
        <div>
            <button onClick={getConversion}>Get</button>
            <button onClick={() => console.log(responses)}>Check</button>

            <br />
            <br />

            <input />
            <button>Convert</button>

            {responses.map((e, i) => (
                <pre
                    key={i}
                    style={{
                        border: '1px solid black',
                        padding: '1rem',
                        margin: '1rem',
                    }}
                >
                    {JSON.stringify(e, null, 2)}
                </pre>
            ))}
        </div>
    );
}

export default App;
