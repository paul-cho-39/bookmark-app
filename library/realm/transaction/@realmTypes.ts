import { RealmBook, RealmLibrary } from '../schema';

export type RealmLibraryResult = Realm.Results<RealmLibrary & Realm.Object<unknown, never>>;
export type RealmBookResult = Realm.Results<RealmBook & Realm.Object<unknown, never>>;
