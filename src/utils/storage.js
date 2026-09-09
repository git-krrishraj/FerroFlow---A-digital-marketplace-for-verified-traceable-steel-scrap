import { DEFAULT_LISTINGS } from '../data/defaultListings';

const STORAGE_KEY = 'ferroflow_listings';

/**
 * Retrieves listings from localStorage.
 * If empty or non-existent, populates localStorage with DEFAULT_LISTINGS and returns them.
 */
export function getStoredListings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LISTINGS));
      return DEFAULT_LISTINGS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LISTINGS));
      return DEFAULT_LISTINGS;
    }
    return parsed;
  } catch (error) {
    console.error('Failed to read from localStorage, using default listings:', error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LISTINGS));
    return DEFAULT_LISTINGS;
  }
}

/**
 * Saves listings to localStorage.
 */
export function saveStoredListings(listings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * Clears localStorage and restores initial state with default listings.
 */
export function resetStoredListings() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LISTINGS));
    return DEFAULT_LISTINGS;
  } catch (error) {
    console.error('Failed to reset localStorage:', error);
    return DEFAULT_LISTINGS;
  }
}
