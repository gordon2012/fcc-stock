const express = require('express');
const cors = require('cors');

const app = express();
const origin = 'http://localhost:3000'; // todo: live
app.use(cors({ origin }));

app.get('/api/convert', (req, res) => {
    res.json({ msg: 'hello' });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
