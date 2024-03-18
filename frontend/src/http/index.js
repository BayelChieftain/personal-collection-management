import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use( (config) => {
    const rootObject = JSON.parse(localStorage.getItem('persist:root'));
    
    // Extract the user object from the root object
    const userObject = JSON.parse(rootObject?.user || null);
    
    if (!userObject || !userObject.accessToken) {
        // Handle the scenario where userObject or accessToken is not found
        console.error('User object or accessToken not found in localStorage');
        return config;
    }
    
    // Extract the access token from the user object
    const accessToken = userObject.accessToken;
    
    // Set the Authorization header with the access token
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});


export default $api;