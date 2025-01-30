'use client';

import { useContext, useState, createContext } from 'react';

export const globalSettingsContext = createContext();

export function GlobalSettings({ children }) {
  const [shimmerEnabled, setShimmerEnabled] = useState(false);

  const value = { shimmerEnabled, setShimmerEnabled };

  return (
    <globalSettingsContext.Provider value={value}>
      {children}
    </globalSettingsContext.Provider>
  );
}
