import { BodyType } from '../logic/bounded-logic/timerLogic';

export interface PersistStoreProps {
   _hasHydrated: boolean;
   setHasHydrated: (state: boolean) => void;
}

export interface ConnectorStoreProps {
   inputs: {
      email: string;
      query: string;
      search: string;
   };
   data: {
      library: {
         hasMutated: boolean;
      };
      notes: {
         isDataAvailable: boolean;
         shouldSave: boolean;
      };
      network: {
         isConnected: null | boolean;
      };
      loader: {
         isSearchLoading: boolean;
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

export interface UserInfo {
   bookInfo: {
      bookdId: string;
      authors: string[];
      libraryType: string; // should be object literal(?)
   };
   notes: {
      latestLogIndex?: number[];
      notes?: Delta[]; // have users multiple notes
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
   logIndex: number;
   pageFrom: number | null;
   pageTo: number | null;
   tags?: string[]; // use past tags so when creating this keep this in mind
   title?: string;
   chapter?: string;
   note?: Delta | [];
   isPrivate: boolean;
   dates: {
      start: string | null;
      end: string | null;
      lastEdited: string | null;
   };
}

type NoteCollections = Record<string, Record<number, NoteProps>>;

export type TimerType = StoreProps['timer'];
export type NoteType = StoreProps['notes'];
export type NoteIndexType = NoteType[number];

export interface BodyTimer {
   dates: Record<string, Date | null>;
}

export interface BodyEndTimer extends BodyTimer {
   timer: StoreProps['timer'];
   pageRead?: StoreProps['currentPage'];
}
