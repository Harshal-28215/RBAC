"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the type for your context value
type UserContextValue = {
    user: {email:string, role:string, id:string} | null;
    setUser: React.Dispatch<React.SetStateAction<{ email: string; role: string; id: string; } | null>>;
    isloading: boolean;
};

// Create the initial context value
const initialContextValue: UserContextValue = {
    user: null,
    setUser: () => {},
    isloading: true
};

// Create the context
export const UserContext = createContext<UserContextValue>(initialContextValue);

// Create the context provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(initialContextValue.user);
    const [isloading, setIsLoading] = useState(initialContextValue.isloading);

    useEffect(() => {
      async function getUser () {
        const response = await fetch('http://localhost:5000/api/user/user', {
          method: 'GET',
          credentials: 'include',
        });
        
        const user = await response.json();
        
        if (user.email) {
          setUser(user);
        }
        setIsLoading(false);
      }

      getUser();
    }, [])
    
    
    
    // Create the context value object
    const contextValue: UserContextValue = {
        user,
        setUser,
        isloading
    };
    
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export function useUser() {
  return useContext(UserContext);
}