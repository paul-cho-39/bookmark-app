import { BodyType } from '../logic/bounded-logic/timerLogic';

export interface PersistStoreProps {
   _hasHydrated: boolean;
   setHasHydrated: (state: boolean) => void;
   userPreference: UserPreference;
}

export interface ConnectorStoreProps {
   inputs: {
      email: string;
      query: string;
   };
   data: {
      library: {
         hasMutated: boolean;
      };
      notes: {
         isDataAvailable: boolean;
      };
   };
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
}

export interface StoreProps {
   notes: NoteProps;
   timer: {
      hours: number;
      minutes: number;
      seconds: number;
   };
   timerWithDate: {
      startTime: Date | null;
      endTime: Date | null;
   };
   tempPage: number | null;
   currentPage: number | null;
   isPaused: boolean;
   intervalId: null | NodeJS.Timer;
}

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

interface DeltaOperation {
   insert?: string | Object;
   delete?: number;
   retain?: number;
   attributes?: {
      [key: string]: string;
   };
}

interface Delta {
   ops: DeltaOperation[];
}

interface NoteProps {
   id: string | null;
   [key: number]: {
      logIndex: number;
      tags?: string[]; // use past tags so when creating this keep this in mind
      title?: string;
      note?: Delta;
      page?: null | number;
      isPrivate: boolean;
      dates: {
         start: string | null;
         end: string | null;
         lastEdited: string | null;
      };
   };
}

export type TimerType = StoreProps['timer'];
export type NoteType = StoreProps['notes'];
export type NoteIndexType = NoteType[number];

// body for th
export interface BodyTimer {
   dates: Record<string, Date | null>;
}

export interface BodyEndTimer extends BodyTimer {
   timer: StoreProps['timer'];
   pageRead?: StoreProps['currentPage'];
}
