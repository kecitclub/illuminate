import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AuthContext } from './handles/AuthProvider';
import UserHomePage from './UserPageComponents/UserHomePage';
import LandingPage from './LandingComponents/LandingPage';

const InitialRoute = () => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    useLayoutEffect(() => {
        const access = localStorage.getItem('accessToken');
        const refresh = localStorage.getItem('refreshToken');
        if(access && refresh){
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
