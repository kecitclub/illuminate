import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AuthContext } from './handles/AuthProvider';
import UserHomePage from './UserPageComponents/UserHomePage';
import LandingPage from './LandingComponents/LandingPage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const InitialRoute = () => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useLayoutEffect(() => {
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

        const access = localStorage.getItem('accessToken');
        const refresh = localStorage.getItem('refreshToken');
        if(access && refresh){
            if(isTokenExpired(access)){
                const refreshToken = async () => {
                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                            refresh: refreshToken
                        });
                        const newAccessToken = response.data.access;
                        localStorage.removeItem('accessToken');
                        localStorage.setItem('accessToken', newAccessToken);
                        return;
                    } catch (error) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        navigate('/');
                        return;
                    }
                };
                refreshToken();
            }
            setIsAuthenticated(true);
        }

        
    }, []);

  return (
    <>
        {isAuthenticated ? (
            <UserHomePage />
        ): (
            <LandingPage />
        )}
    </>
  )
}

export default InitialRoute;
