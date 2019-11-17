const express = require('express');
const cors = require('cors');

const app = express();
const origin =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000'
        : 'https://boilerplate-infosec.gordondoskas.com';
app.use(cors({ origin }));

app.get('/api/test', (req, res) => {
    res.json({ hello: 'world' });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
