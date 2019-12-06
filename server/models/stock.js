const stockSchema = {
    stock: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: String,
        },
    ],
};

module.exports = stockSchema;
