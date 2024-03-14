const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

// Проксируем запросы к '/' к приложению "api"
app.get('/', async (req, res) => {
    try {
        // Отправляем GET-запрос к "api" и сохраняем ответ
        const response = await axios.get('http://localhost:3000/');
        // Отправляем обратно полученный результат
        res.send(response.data);
    } catch (error) {
        console.error('Error while proxying request:', error);
        res.status(500).send('Error while proxying request');
    }
});

// Слушаем порт 3001
app.listen(port, () => {
    console.log(`Proxy server is running at http://localhost:${port}`);
});
