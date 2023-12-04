import useSettingsStore from '../../settingsStore';
import { UserPreferenceType, _setUserPreference } from './timerStoreParent';

type TimerSettingType = UserPreferenceType['userTimerSettings'];
const _setUserTimerSettings = <T extends keyof TimerSettingType>(
   property: T,
   value: TimerSettingType[T]
) => {
   _setUserPreference('userTimerSettings', {
      ...useSettingsStore.getState().userPreference.userTimerSettings,
      [property]: value,
   });
};

type PageFlipperType = TimerSettingType['defaultPageFlipper'];
const _setDefaultPageFlipper = <T extends keyof PageFlipperType>(
   property: T,
   value: PageFlipperType[T]
) => {
   _setUserTimerSettings('defaultPageFlipper', {
      ...useSettingsStore.getState().userPreference.userTimerSettings.defaultPageFlipper,
      [property]: value,
   });
};

type DefaultTimerType = TimerSettingType['defaultSetTimer'];
const _setDefaultTimer = <T extends keyof DefaultTimerType>(
   property: T,
   value: DefaultTimerType[T]
) => {
   _setUserTimerSettings('defaultSetTimer', {
      ...useSettingsStore.getState().userPreference.userTimerSettings.defaultSetTimer,
      [property]: value,
   });
};

const setDefaultReadingSessionTime = (value: number) => {
   _setDefaultTimer('sessionInMinutes', value);
};
const setAverageReadingPace = (value: number) => {
   _setDefaultPageFlipper('averageReadingPacePerMin', value);
};

const setMaxValuePage = (value: number) => {
   _setDefaultPageFlipper('maxPageValue', value);
};

export { setDefaultReadingSessionTime, setAverageReadingPace, setMaxValuePage };
