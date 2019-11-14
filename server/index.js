const express = require('express');
const cors = require('cors');

const app = express();
const origin = 'http://localhost:3000'; // todo: live
app.use(cors({ origin }));

const conversion = {
    gal: {
        full: 'gallons',
        unit: 'L',
        num: 3.78541,
    },
    L: {
        full: 'liters',
        unit: 'gal',
        num: 1 / 3.78541,
    },
    lbs: {
        full: 'pounds',
        unit: 'kg',
        num: 0.453592,
    },
    kg: {
        full: 'kilograms',
        unit: 'lbs',
        num: 1 / 0.453592,
    },
    mi: {
        full: 'miles',
        unit: 'km',
        num: 1.60934,
    },
    km: {
        full: 'kilometers',
        unit: 'mi',
        num: 1 / 1.60934,
    },
};

app.get('/api/convert', (req, res) => {
    const { input } = req.query;
    const i = input.search(/[a-z]/g);

    const unit = input.slice(i);
    const validUnit = Object.keys(conversion).includes(unit);

    const rawNum = input.slice(0, i);
    const rns = rawNum.split('/');
    const num =
        rawNum === '' && validUnit
            ? 1
            : rns.length > 1
            ? Number(rns.reduce((a, c) => a / c))
            : Number(rawNum);
    const validNum = !(num === 0 || num === Infinity || isNaN(num));

    if (!validNum && !validUnit) {
        return res.json('invalid number and unit');
    } else if (!validNum) {
        return res.json('invalid number');
    } else if (!validUnit) {
        return res.json('invalid unit');
    }

    const returnNum = +(num * conversion[unit].num).toFixed(5);
    const returnUnit = conversion[unit].unit;
    res.json({
        initNum: num,
        initUnit: unit,
        returnNum,
        returnUnit,
        string: `${num} ${
            num === 1
                ? conversion[unit].full.slice(0, -1)
                : conversion[unit].full
        } converts to ${returnNum} ${
            returnNum === 1
                ? conversion[returnUnit].full.slice(0, -1)
                : conversion[returnUnit].full
        }`,
    });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
