import { Realm } from '@realm/react';
import { RealmBook, RealmLibrary, RealmLogs, RealmTimer } from '../schema';

export type RealmResult<Result extends RealmBook | RealmLibrary | RealmLogs> = Realm.Results<
   Result & Realm.Object<unknown, never>
>;
export type RealmLibraryResult = Realm.Results<RealmLibrary & Realm.Object<unknown, never>>;
export type RealmBookResult = Realm.Results<RealmBook & Realm.Object<unknown, never>>;
export type RealmLogResult = Realm.Results<RealmLogs & Realm.Object<unknown, never>>;
interface RealmTimerParams {
   realm: Realm;
   id: string;
}

// sending data to server
interface LoggerEndBodyType {
   id: string;
   logIndex: number;
   startTime?: Date;
   endTime?: Date;
   timer?: RealmTimer;
   pageRead?: number;
   bookmarked?: boolean;
   rating?: number;
   feedback?: 0 | 1 | null;
   words?: Realm.List<string>;
}

export type { RealmTimerParams, LoggerEndBodyType };
