// proxy/proxy.js

const express = require('express');
const axios = require('axios');
const convict = require('convict');
const dotenv = require('dotenv');

// Загрузка конфигурации из файла .env
dotenv.config();

// Определение схемы конфигурации с помощью convict
const config = convict({
    apiUrl: {
        doc: 'The URL of the API application',
        format: String,
        default: 'http://localhost:3000',
        env: 'API_URL'
    },
    proxyPort: {
        doc: 'The port used by the proxy application',
        format: 'port',
        default: 3001,
        env: 'PROXY_PORT'
    }
});

// Валидация и загрузка конфигурации
config.validate({ allowed: 'strict' });

const app = express();

// Проксируем запросы к '/' к приложению "api"
app.get('/', async (req, res) => {
    try {
        // Отправляем GET-запрос к "api" и сохраняем ответ
        const response = await axios.get(config.get('apiUrl') + '/');
        // Отправляем обратно полученный результат
        res.send(response.data);
    } catch (error) {
        console.error('Error proxying request:', error);
        res.status(500).send('Error proxying request');
    }
});

// Слушаем порт, указанный в конфигурации
const port = config.get('proxyPort');
app.listen(port, () => {
    console.log(`Proxy server is running at http://localhost:${port}`);
});
