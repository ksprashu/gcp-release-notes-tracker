import React, { createContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { UserSettings } from '../types';
import * as userSettingsService from '../services/userSettingsService';

interface UserSettingsContextType {
  settings: UserSettings;
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  updateSettings: (settings: UserSettings) => void;
}

export const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export const UserSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(userSettingsService.getSettings());

  const addFavorite = useCallback((productId: string) => {
    setSettings(prevSettings => {
      const newSettings = {
        ...prevSettings,
        favorites: [...prevSettings.favorites, productId],
      };
      userSettingsService.saveSettings(newSettings);
      return newSettings;
    });
  }, []);

  const removeFavorite = useCallback((productId: string) => {
    setSettings(prevSettings => {
      const newSettings = {
        ...prevSettings,
        favorites: prevSettings.favorites.filter(id => id !== productId),
      };
      userSettingsService.saveSettings(newSettings);
      return newSettings;
    });
  }, []);

  const updateSettings = useCallback((newSettings: UserSettings) => {
    userSettingsService.saveSettings(newSettings);
    setSettings(newSettings);
  }, []);

  const contextValue = useMemo(() => ({
    settings,
    addFavorite,
    removeFavorite,
    updateSettings,
  }), [settings, addFavorite, removeFavorite, updateSettings]);

  return (
    <UserSettingsContext.Provider value={contextValue}>
      {children}
    </UserSettingsContext.Provider>
  );
};
