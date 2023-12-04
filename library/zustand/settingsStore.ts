import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import storage from './types/asyncStorage';
import { PersistStoreProps, TimerType, UserPreference } from './types/@types';

export interface UserPreferenceProps extends PersistStoreProps {
   userPreference: UserPreference;
}

// preference: a) language preference,
// if something is added or deleted if it wont break down app
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
const useSettingsStore = create<UserPreferenceProps>()(
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
