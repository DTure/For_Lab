const express = require('express');
const service = require('./service');

function setupRoutes(app) {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const data = await service.getData();
            res.send(data);
        } catch (error) {
            console.error('Error proxying request:', error);
            res.status(500).send('Error proxying request');
        }
    });

    app.use('/', router);
}

module.exports = setupRoutes;
