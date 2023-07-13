import { NoteDarkColor, NoteLightColor } from '../../../constants/notes';
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
      noteQuery: string;
   };
   data: {
      library: {
         hasMutated: boolean;
      };
      notes: {
         isDataAvailable: boolean;
         shouldSave: boolean;
         params: {
            id: string;
            logIndex: number | string;
         };
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
         isUploadNotesVisible: boolean;
         isTrashVisible: boolean;
         isExportVisible: boolean;
         isTagsVisible: boolean;
         isInfoVisible: boolean;
         isSearchVisible: boolean;
         isModalVisible: {
            visible: boolean;
            dismissKeyboard: boolean;
         };
      };
   };
}

export interface StoreProps {
   notes: NoteCollections;
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

export interface NoteAttributesType {
   pageFrom: number | null;
   pageTo: number | null;
   title?: string;
   chapter?: string;
   isPrivate: boolean;
   favorite: boolean;
}

// NoteProps keys which are saved for recording the history
export type NotePropsHistoryKeys = 'tags' | 'note' | 'meta';
export type NoteColors = NoteDarkColor | NoteLightColor;

export interface NoteHistoryProps<K extends NotePropsHistoryKeys> {
   propertyChanged: K;
   oldValue: NoteProps[K];
   newValue: NoteProps[K];
}

export interface NoteProps {
   attr: NoteAttributesType;
   tags?: string[]; // use past tags so when creating this keep this in mind
   note?: Delta | [];
   history?: NoteHistoryProps<NotePropsHistoryKeys>[];
   dates: {
      start: string | null;
      end: string | null;
      lastEdited: string | null;
   };
   meta?: NoteMetaProps;
}

// use this to set it in the settings
export interface NoteMetaProps {
   headerColor: NoteColors;
   bgColor: string;
   // fontSize: number;
   // fontFamily: string;
   // add theme here;
}

export type NoteCollections = Record<string, Record<string | number, NoteProps>>;

export type TimerType = StoreProps['timer'];
export type NoteType = StoreProps['notes'];
export type NoteIndexType = NoteCollections[string];

export interface BodyTimer {
   dates: Record<string, Date | null>;
}

export interface BodyEndTimer extends BodyTimer {
   timer: StoreProps['timer'];
   pageRead?: StoreProps['currentPage'];
}
