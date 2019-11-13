const express = require('express');
const cors = require('cors');

const app = express();
const origin = 'http://localhost:3000'; // todo: live
app.use(cors({ origin }));

const conversion = {
    gal: {
        unit: 'L',
        num: 3.78541,
    },
    L: {
        unit: 'gal',
        num: 1 / 3.78541,
    },
    lbs: {
        unit: 'kg',
        num: 0.453592,
    },
    kg: {
        unit: 'lbs',
        num: 1 / 0.453592,
    },
    mi: {
        unit: 'km',
        num: 1.60934,
    },
    km: {
        unit: 'mi',
        num: 1 / 1.60934,
    },
};

app.get('/api/convert', (req, res) => {
    const { input } = req.query;
    const unit = Object.keys(conversion).reduce(
        (a, c) => (input.split(c).length > 1 ? c : a),
        ''
    );

    if (!unit) {
        return res.status(400).json('invalid unit');
    }

    const rawNum = input.split(unit)[0];

    // let num;
    // if(rawNum === '') {
    //     num = 1;
    // } else if()

    // console.log(rawNum.split('/'));
    const rns = rawNum.split('/');
    //Number(rawNum)
    const num =
        rawNum === ''
            ? 1
            : rns.length > 1
            ? Number(rns.reduce((a, c) => a / c))
            : Number(rawNum);
    console.log(num);

    if (num === 0 || num === Infinity || isNaN(num)) {
        return res.status(400).json('invalid number');
    }

    // console.log(Number(num));

    res.json({ msg: req.query });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
