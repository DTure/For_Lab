const axios = require('axios');

async function getData() {
    try {
        const response = await axios.get(process.env.API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = { getData };
