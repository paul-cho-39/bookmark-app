import useSettingsStore, { UserPreferenceProps } from '../../settingsStore';

export type UserPreferenceType = UserPreferenceProps['userPreference'];
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
