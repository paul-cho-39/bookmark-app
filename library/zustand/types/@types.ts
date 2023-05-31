import { BodyType } from '../logic/bounded-logic/timerLogic';

export interface PersistStoreProps {
   _hasHydrated: boolean;
   setHasHydrated: (state: boolean) => void;
   userPreference: UserPreference;
}

export interface StoreProps {
   email: string;
   query: string;
   hasMutated: boolean;
   isDataAvailable: boolean;
   tempPage: number | null;
   currentPage: number | null;
   modal: {
      edit: {
         isChangeBookVisible: boolean;
      };
      timer: {
         isStopTimeVisible: boolean;
      };
      note: {
         isAddNoteVisible: boolean;
         isAddTagsVisible: boolean;
         isUploadNotesVisible: boolean;
      };
   };
   notes: {
      id: string | null;
      index: {
         [key: number]: {
            logIndex: number;
            tags?: string[]; // use past tags so when creating this keep this in mind
            title?: string;
            noteText?: string;
            note?: string[];
            page?: null | number;
            isPrivate: boolean;
            dates: {
               start: string | null;
               end: string | null;
               lastEdited: string | null;
            };
         };
      };
   };
   timer: {
      hours: number;
      minutes: number;
      seconds: number;
   };
   timerWithDate: {
      startTime: Date | null;
      endTime: Date | null;
   };
   isPaused: boolean;
   intervalId: null | NodeJS.Timer;
}

export type TimerType = StoreProps['timer'];

// type EnforceNotificationRelation<T extends boolean> = T extends false ? false : boolean;
export interface UserPreference {
   userGeneralSettings: {
      display: {
         isDarkMode: boolean;
      };
      userConsent: {
         allowNotifications: boolean;
         allowNfcRead: boolean;
         isLocationShared: boolean;
      };
      preference: {
         language: string;
         timeZone: string | null;
      };
   };
   userTimerSettings: {
      defaultPageFlipper: {
         allowPageEstimator: boolean;
         averageReadingPacePerMin: number;
         maxPageValue: number;
      };
      defaultSetTimer: {
         shouldNotifyUserAfterCountdown: boolean;
         sessionInMinutes: number;
      };
   };
}

export type NoteType = StoreProps['notes'];
export type NoteIndexType = NoteType['index'];

// body for th
export interface BodyTimer {
   dates: Record<string, Date | null>;
}

export interface BodyEndTimer extends BodyTimer {
   timer: StoreProps['timer'];
   pageRead?: StoreProps['currentPage'];
}
