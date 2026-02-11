'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  isVip: boolean;
  toggleVip: () => void;
  upgradeToVip: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isVip, setIsVip] = useState(false);

  const toggleVip = () => setIsVip(prev => !prev);
  const upgradeToVip = () => setIsVip(true);

  return (
    <UserContext.Provider value={{ isVip, toggleVip, upgradeToVip }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
