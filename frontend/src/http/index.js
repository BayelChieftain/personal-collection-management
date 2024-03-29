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

$api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;


        if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
                const accessToken = response.data.accessToken;

                const rootObject = JSON.parse(localStorage.getItem('persist:root'));
                const userObject = JSON.parse(rootObject?.user || null);
                userObject.accessToken = accessToken;
                localStorage.setItem('persist:root', JSON.stringify({ ...rootObject, user: JSON.stringify(userObject) }));

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.log('Failed to refresh token:', refreshError);
                throw refreshError;
            }
        }

        throw error;
    }
);


export default $api;