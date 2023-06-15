import useSettingsStore from '../../zustand/settingsStore';
import { convertDateFormat } from './getTimerValue';

type TypeParam = 'string' | 'date';

export default function getUsersLocalTime<T extends TypeParam>(
   type: T = 'date' as T
): T extends 'string' ? string : Date {
   const timeZone = useSettingsStore.getState().userPreference.userGeneralSettings.preference
      .timeZone as string;
   const localizedStartTime = new Date().toLocaleString('en-US', { timeZone });
   const localDate = convertDateFormat(localizedStartTime);

   return type === 'string' ? (localizedStartTime as any) : (localDate as any);
}
