"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext<{ user: any; setUser: React.Dispatch<React.SetStateAction<any>>; loading: boolean }>({
  user: null,
  setUser: () => {},
  loading: true, // Initially, the loading state will be true
});

import { ReactNode } from 'react';

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchUserDetails() {
      const response = await fetch('http://localhost:5000/api/user/user', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache',
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false); // Once the fetch is complete, set loading to false
    }

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
