import useSettingsStore from '../../zustand/settingsStore';

export default function getUsersLocalTime() {
   const timeZone = useSettingsStore.getState().userPreference.userGeneralSettings.preference
      .timeZone as string;
   const localizedStartTime = new Date().toLocaleString('en-US', { timeZone });
   return localizedStartTime;
}
