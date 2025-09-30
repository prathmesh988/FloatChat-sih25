// User preference management for personalized feed customization

export interface UserPreferences {
  interests: string[];
  domains: string[];
  regions: string[];
  parameters: string[];
  discoveryLevels: string[];
  lastUpdated: string;
}

export const defaultPreferences: UserPreferences = {
  interests: [],
  domains: [],
  regions: [],
  parameters: [],
  discoveryLevels: [],
  lastUpdated: new Date().toISOString()
};

// Local storage key
const PREFERENCES_KEY = 'floatchat_user_preferences';

export const getUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      return { ...defaultPreferences, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn('Failed to load user preferences:', error);
  }
  return defaultPreferences;
};

export const saveUserPreferences = (preferences: UserPreferences): void => {
  try {
    const updated = {
      ...preferences,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to save user preferences:', error);
  }
};

export const updateInterest = (cardId: string, interested: boolean, cardData: any): void => {
  const preferences = getUserPreferences();
  
  if (interested) {
    // Add interests based on the card data
    preferences.interests = [...new Set([...preferences.interests, cardId])];
    preferences.domains = [...new Set([...preferences.domains, cardData.domain])];
    preferences.regions = [...new Set([...preferences.regions, cardData.region])];
    preferences.parameters = [...new Set([...preferences.parameters, cardData.parameter])];
    preferences.discoveryLevels = [...new Set([...preferences.discoveryLevels, cardData.discoveryLevel])];
    
    // Add tags as interests
    cardData.tags?.forEach((tag: string) => {
      if (!preferences.interests.includes(tag)) {
        preferences.interests.push(tag);
      }
    });
  } else {
    // Remove the specific card interest but keep aggregated preferences
    preferences.interests = preferences.interests.filter(id => id !== cardId);
  }
  
  saveUserPreferences(preferences);
};

export const getPersonalizedScore = (cardData: any): number => {
  const preferences = getUserPreferences();
  let score = 0;
  
  // Score based on domain preference
  if (preferences.domains.includes(cardData.domain)) score += 3;
  
  // Score based on region preference  
  if (preferences.regions.includes(cardData.region)) score += 2;
  
  // Score based on parameter preference
  if (preferences.parameters.includes(cardData.parameter)) score += 2;
  
  // Score based on discovery level preference
  if (preferences.discoveryLevels.includes(cardData.discoveryLevel)) score += 1;
  
  // Score based on tag matches
  cardData.tags?.forEach((tag: string) => {
    if (preferences.interests.includes(tag)) score += 1;
  });
  
  return score;
};

export const getRecommendedCards = (allCards: any[], maxCards: number = 5): any[] => {
  return allCards
    .map(card => ({
      ...card,
      personalizedScore: getPersonalizedScore(card)
    }))
    .sort((a, b) => b.personalizedScore - a.personalizedScore)
    .slice(0, maxCards);
};

export const clearUserPreferences = (): void => {
  try {
    localStorage.removeItem(PREFERENCES_KEY);
  } catch (error) {
    console.warn('Failed to clear user preferences:', error);
  }
};