import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import storage from './types/asyncStorage';
import { PersistStoreProps, TimerType, UserPreference } from './types/@types';

// think harder about the preference and how later
// if something is added or deleted if it wont break down
// the app
const initialState: UserPreference = {
   userGeneralSettings: {
      display: {
         isDarkMode: true,
      },
      userConsent: {
         allowNotifications: true,
         allowNfcRead: true,
         isLocationShared: false,
         // add privacy
         // add notification preferences
      },
      preference: {
         language: 'en',
         timeZone: null,
      },
   },
   userTimerSettings: {
      defaultPageFlipper: {
         allowPageEstimator: true,
         averageReadingPacePerMin: 15,
         maxPageValue: 50,
      },
      defaultSetTimer: {
         shouldNotifyUserAfterCountdown: false,
         sessionInMinutes: 60,
      },
   },
};
const useSettingsStore = create<PersistStoreProps>()(
   persist(
      (set) => ({
         _hasHydrated: false,
         setHasHydrated: (state: boolean) => {
            set({ _hasHydrated: state });
         },
         userPreference: initialState,
      }),
      {
         name: 'user-setting',
         storage: createJSONStorage(() => storage),
         onRehydrateStorage: () => (state) => {
            state?.setHasHydrated(true);
         },
      }
   )
);

export default useSettingsStore;
