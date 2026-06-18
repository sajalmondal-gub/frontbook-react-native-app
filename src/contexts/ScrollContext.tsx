import React, { createContext, useContext } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

type ScrollContextType = {
  tabBarTranslateY: SharedValue<number>;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tabBarTranslateY = useSharedValue(0);

  return (
    <ScrollContext.Provider value={{ tabBarTranslateY }}>
      {children}
    </ScrollContext.Provider>
  );
};
