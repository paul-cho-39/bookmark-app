import useSettingsStore from '../../settingsStore';
import { UserPreferenceType, _setUserPreference } from './timerStoreParent';

// NOTE:
// the purpose of breaking each into more atomic function is
// its flexibility. It is relatively much easier to change later
// if more settings are to be added/deleted/appended

type UserGeneralSettings = UserPreferenceType['userGeneralSettings'];
const _setUserGeneralSettings = <T extends keyof UserGeneralSettings>(
   property: T,
   value: UserGeneralSettings[T]
) => {
   _setUserPreference('userGeneralSettings', {
      ...useSettingsStore.getState().userPreference.userGeneralSettings,
      [property]: value,
   });
};

type PreferenceType = UserGeneralSettings['preference'];
const _setPreference = <T extends keyof PreferenceType>(property: T, value: PreferenceType[T]) => {
   _setUserGeneralSettings('preference', {
      ...useSettingsStore.getState().userPreference.userGeneralSettings.preference,
      [property]: value,
   });
};

type DisplayType = UserGeneralSettings['display'];
const _setDisplay = <T extends keyof DisplayType>(property: T, value: DisplayType[T]) => {
   _setUserGeneralSettings('display', {
      ...useSettingsStore.getState().userPreference.userGeneralSettings.display,
      [property]: value,
   });
};

type UserContentTYpe = UserGeneralSettings['userConsent'];
const _setUserConsent = <T extends keyof UserContentTYpe>(
   property: T,
   value: UserContentTYpe[T]
) => {
   _setUserGeneralSettings('userConsent', {
      ...useSettingsStore.getState().userPreference.userGeneralSettings.userConsent,
      [property]: value,
   });
};

// if logic needs to be chnaged set here
const setUserTimeZone = (timeZone: string | null) => {
   _setPreference('timeZone', timeZone);
};

export { setUserTimeZone };
