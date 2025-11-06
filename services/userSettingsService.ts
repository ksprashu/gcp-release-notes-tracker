import { UserSettings } from '../types';

const SETTINGS_KEY = 'gcpReleaseNotesTrackerSettings';

const defaultSettings: UserSettings = {
  favorites: [],
  sortBy: 'name',
  filter: {
    category: null,
  },
};

export const getSettings = (): UserSettings => {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : defaultSettings;
  } catch (error) {
    console.error('Error reading settings from localStorage', error);
    return defaultSettings;
  }
};

export const saveSettings = (settings: UserSettings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to localStorage', error);
  }
};

export const addFavorite = (productId: string) => {
  const settings = getSettings();
  if (!settings.favorites.includes(productId)) {
    settings.favorites.push(productId);
    saveSettings(settings);
  }
};

export const removeFavorite = (productId: string) => {
  const settings = getSettings();
  settings.favorites = settings.favorites.filter((id) => id !== productId);
  saveSettings(settings);
};
