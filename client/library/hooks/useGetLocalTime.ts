import { convertDateFormat } from '../helper/timer/getTimerValue';
import useSettingsStore from '../zustand/settingsStore';

export default function useLocalTime() {
   const timeZone = useSettingsStore(
      (state) => state.userPreference.userGeneralSettings.preference.timeZone
   ) as string;
   const localizedStartTime = new Date().toLocaleString('en-US', { timeZone });

   const current = convertDateFormat(localizedStartTime);
   return current;
}
