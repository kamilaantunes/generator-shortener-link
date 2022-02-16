import axios from 'axios';

export const key = "6c4841e052ac25dbc857f521e155bad5d0a371cb"

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers: {
        'Authorization': `Bearer ${key}`
    }
})

export default api;