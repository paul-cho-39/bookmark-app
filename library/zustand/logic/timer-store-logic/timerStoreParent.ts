import useSettingsStore from '../../settingsStore';
import { PersistStoreProps } from '../../types/@types';

export type UserPreferenceType = PersistStoreProps['userPreference'];
export const _setUserPreference = <T extends keyof UserPreferenceType>(
   property: T,
   value: UserPreferenceType[T]
) => {
   useSettingsStore.setState((state) => {
      return {
         ...state,
         userPreference: {
            ...state.userPreference,
            [property]: value,
         },
      };
   });
};
