const express = require('express');
const cors = require('cors');
const axios = require('axios');

const connect = require('./connect');
const stockSchema = require('./models/stock');

const app = express();
const origin =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000'
        : 'https://stock.gordondoskas.com';
app.use(cors({ origin }));
app.use(express.json());

app.get('/api/stock-prices', async (req, res) => {
    try {
        const { stock } = req.query;

        if (!stock) {
            return res.status(200).json('missing stock');
        }

        // get stock from api
        const rawStockData = await axios.get(
            `https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`
        );

        // check db for record, create if not exists
        const Stock = await connect('stock', stockSchema);
        const savedStock = await Stock.findOneAndUpdate(
            { stock },
            {},
            { upsert: true, new: true }
        );

        return res.status(200).json({
            stockData: {
                stock,
                price: rawStockData.data.latestPrice,
                likes: savedStock.likes.length,
            },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
