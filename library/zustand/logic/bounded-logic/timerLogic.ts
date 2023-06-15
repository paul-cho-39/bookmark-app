import { BodyEndTimer, BodyTimer, StoreProps } from '../../types/@types';
import useBoundedStore from '../../store';
import useSettingsStore from '../../settingsStore';
import { convertDateFormat } from '../../../helper/timer/getTimerValue';
import { RealmTimerParams } from '../../../realm/transaction/@realmTypes';
import RealmTimerLogs from '../../../realm/transaction/class/write/createLog';
import getUsersLocalTime from '../../../helper/timer/getUsersLocalTime';

export const setTimerWithDate = (newStartDate?: Date, newEndDate?: Date) => {
   useBoundedStore.setState({
      timerWithDate: {
         startTime: newStartDate ?? null,
         endTime: newEndDate ?? null,
      },
   });
};

// logic whenever screen is refocused using AppState
export const setTimer = () => {
   const { startTime, endTime } = useBoundedStore.getState().timerWithDate;
   if (startTime !== null && endTime === null && !useBoundedStore.getState().isPaused) {
      const current = Date.now();
      const diff = current - startTime.getTime();
      useBoundedStore.setState({
         timer: {
            hours: Math.floor(diff / (1000 * 60 * 60)),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
         },
      });
   }
};

export const startTimer = () => {
   const newIntervalId = setInterval(() => {
      useBoundedStore.setState(() => {
         const timer = useBoundedStore.getState().timer;
         const seconds = timer.seconds + 1;
         const minutes = seconds === 60 ? timer.minutes + 1 : timer.minutes;
         const hours = minutes === 60 ? timer.hours + 1 : timer.hours;

         // restring the time to 24 hours
         if (hours >= 24) {
            return {
               timer: {
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
               },
            };
         }

         return {
            timer: {
               hours,
               minutes: minutes % 60,
               seconds: seconds % 60,
            },
         };
      });
   }, 1000);

   useBoundedStore.setState({ intervalId: newIntervalId, isPaused: false });

   return { newIntervalId };
};
// dates: { startTime: StoreProps['timerWithDate']['startTime'] }}
export const initiateStartTime = async (
   callback: (body: BodyTimer) => void,
   realmParams: RealmTimerParams
) => {
   // const timeZone = useSettingsStore.getState().userPreference.userGeneralSettings.preference
   //    .timeZone as string;
   // const localizedStartTime = new Date().toLocaleString('en-US', { timeZone });
   // const localDate = convertDateFormat(localizedStartTime);
   const localDate = getUsersLocalTime('date');
   useBoundedStore.setState({
      timerWithDate: {
         startTime: localDate,
         endTime: null,
      },
   });

   setTimeout(async () => {
      const startTime = useBoundedStore.getState().timerWithDate.startTime;
      const body = await Promise.resolve({
         dates: {
            startTime: startTime,
         },
      });
      callback(body);
      writeToRealm(realmParams, startTime);
   }, 0);

   function writeToRealm(realmParams: RealmTimerParams, startTime: Date | null) {
      if (startTime !== null) {
         const { id, realm } = realmParams;
         try {
            realm.write(() => {
               const logger = new RealmTimerLogs(realm, id);
               const log = logger.startTimer(startTime);
               logger.connectLog(log);
            });
         } catch (err) {
            console.error('Failed to write timer logs: ', err);
         }
      }
   }
};

// likely to be the case for nfc but wth page(?);
export const stampEndTime = async (callback: (body: BodyTimer) => void) => {
   const startTime = useBoundedStore.getState().timerWithDate.startTime;

   if (startTime !== null) {
      useBoundedStore.setState({
         timerWithDate: {
            ...useBoundedStore.getState().timerWithDate,
            endTime: new Date(),
         },
      });
   }
};

type AddtionalParams = { [key: string]: string | number };
export type BodyType = BodyEndTimer & AddtionalParams;

// refer to server/../loggers.ts - EndLoggerData for how the body
// should be encoded
export const stopTimer = async (callback: (body: BodyType) => void, ...rest: unknown[]) => {
   const intervalId = useBoundedStore.getState().intervalId;
   const timer = useBoundedStore.getState().timer;
   const timerWithDate = useBoundedStore.getState().timerWithDate;
   const currentPage = useBoundedStore.getState().currentPage;

   if (intervalId !== null) {
      await new Promise<void>((resolve) => {
         const unsubscribe = useBoundedStore.subscribe((state) => {
            const additionalProps = Object.assign({}, ...rest);
            callback({
               timer: timer,
               dates: timerWithDate,
               pageRead: currentPage,
               ...additionalProps,
            });
            unsubscribe();
            resolve();
         });
      });
      pauseTimer();
   }
};

export const pauseTimer = () => {
   const intervalId = useBoundedStore.getState().intervalId;
   if (intervalId !== null) {
      clearInterval(intervalId);
   }

   useBoundedStore.setState({ isPaused: true });
};

export const resumeTimer = () => {
   startTimer();
};

export const resetTimer = () => {
   const intervalId = useBoundedStore.getState().intervalId;
   if (intervalId !== null) {
      clearInterval(intervalId);
   }
   useBoundedStore.setState({
      timer: { hours: 0, minutes: 0, seconds: 0 },
      timerWithDate: { startTime: null, endTime: null },
      intervalId: null,
   });
};
