require('dotenv').config();
const express = require('express');
const routing = require('./routing');

const app = express();
const port = process.env.PROXY_PORT;

routing(app);

app.listen(port, () => {
    console.log(`Proxy server is running at http://localhost:${port}`);
});

