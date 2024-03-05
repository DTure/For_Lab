require('dotenv').config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send(process.env.HELLO);
});

app.listen(3000, () => {
    console.log('Server start at localhost:3000');
});