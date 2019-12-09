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
        const { stock, like, stock2, like2 } = req.query;

        if (!stock) {
            return res.status(200).json('missing stock');
        }

        const ip =
            (req.headers['x-forwarded-for'] || '').split(',').pop() ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        // get stock data from external api
        const rawStockData = [];
        rawStockData.push({
            stock,
            data: await axios.get(
                `https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`
            ),
        });
        if (stock2) {
            rawStockData.push({
                stock: stock2,
                data: await axios.get(
                    `https://repeated-alpaca.glitch.me/v1/stock/${stock2}/quote`
                ),
            });
        }

        // check db for record, create if not exists
        const Stock = await connect('stock', stockSchema);

        const savedStock = [];
        savedStock.push(
            await Stock.findOneAndUpdate(
                { stock },
                {},
                { upsert: true, new: true }
            )
        );
        if (stock2) {
            savedStock.push(
                await Stock.findOneAndUpdate(
                    { stock: stock2 },
                    {},
                    { upsert: true, new: true }
                )
            );
        }

        // check for likes
        if (
            like &&
            savedStock[0].likes.filter(like => like === ip).length === 0
        ) {
            savedStock[0] = await Stock.findOneAndUpdate(
                { stock },
                {
                    $push: { likes: ip },
                },
                { new: true }
            );
        }

        if (
            stock2 &&
            like2 &&
            savedStock[1].likes.filter(like => like === ip).length === 0
        ) {
            savedStock[1] = await Stock.findOneAndUpdate(
                { stock: stock2 },
                {
                    $push: { likes: ip },
                },
                { new: true }
            );
        }

        return res.status(200).json(
            savedStock.length > 1
                ? {
                      stockData: [
                          {
                              stock,
                              price: rawStockData[0].data.data.latestPrice,
                              rel_likes:
                                  savedStock[0].likes.length -
                                  savedStock[1].likes.length,
                          },

                          {
                              stock: stock2,
                              price: rawStockData[1].data.data.latestPrice,
                              rel_likes:
                                  savedStock[1].likes.length -
                                  savedStock[0].likes.length,
                          },
                      ],
                  }
                : {
                      stockData: {
                          stock,
                          price: rawStockData[0].data.data.latestPrice,
                          likes: savedStock[0].likes.length,
                      },
                  }
        );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
