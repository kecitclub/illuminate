import axios from "axios";
import { jwtDecode } from 'jwt-decode';


export const backend_api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});


const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decoded.exp < currentTime;
    } catch (error) {
        return true; 
    }
};

const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken
        });
        const newAccessToken = response.data.access;
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
    } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw error; 
    }
};

backend_api.interceptors.request.use(
    async config => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && isTokenExpired(accessToken)) {
            try {
                const newAccessToken = await refreshToken();
                config.headers.Authorization = `Bearer ${newAccessToken}`;
            } catch (error) {
                console.error('Failed to refresh token:', error);
                return Promise.reject(error);
            }
        } else if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);