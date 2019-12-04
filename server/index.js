const express = require('express');
const cors = require('cors');

const connect = require('./connect');
const exampleSchema = require('./models/example');

const app = express();
const origin =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000'
        : 'https://stock.gordondoskas.com';
app.use(cors({ origin }));
app.use(express.json());

app.get('/api/example', async (req, res) => {
    try {
        // const Example = await connect('example', exampleSchema);
        // const example = await Example.create({ name: 'Hello World' });
        // res.status(200).json(example.toJSON());
        res.status(200).json({ hello: 'world' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
