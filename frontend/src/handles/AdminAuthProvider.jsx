import React, { createContext, useState } from 'react';

export const AdminAuthContext = createContext({
    isAdminLoggedIn: false,
    setIsAdminLoggedIn: () => {}
});

const AdminAuthProvider = ({children}) => {

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    return (
        <AdminAuthContext.Provider value={{isAdminLoggedIn, setIsAdminLoggedIn}}>
            {children}
        </AdminAuthContext.Provider>
  )
}

export default AdminAuthProvider;
