import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use( (config) => {
    const rootObject = JSON.parse(localStorage.getItem('persist:root'));
    
    const userObject = JSON.parse(rootObject?.user || null);
    
    if (!userObject || !userObject.accessToken) {
        console.error('User object or accessToken not found in localStorage');
        return config;
    }
    
    const accessToken = userObject.accessToken;
    
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});


export default $api;