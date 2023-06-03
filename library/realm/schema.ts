import Realm from 'realm';
// import { RealmTimer, RealmBookInfo } from './dictionary';
import { createRealmContext } from '@realm/react';
// location (since it will likely change(?))
// should location differ for each time user reads the book?

// should this information be encrypted(?);
// NOTE: should the get more complex and requires real-time data
// to interact with another user GraphQL may be a better fit
export interface RealmTimer extends Realm.Dictionary {
   hours: number;
   minute: number;
   seconds: number;
}

export interface RealmBookInfo extends Realm.Dictionary {
   title: string;
   subtitle?: string;
   authors?: string;
   page?: number;
   language?: string;
   publisher?: string;
   publishedDate?: string;
   numberOfRead?: number;
}

export class RealmLibrary extends Realm.Object<RealmLibrary, 'name'> {
   name!: string;
   books!: Realm.List<RealmBook>;
   static schema = {
      name: 'Library',
      properties: {
         name: 'string',
         books: 'Book[]',
      },
   };
}

export class RealmBook extends Realm.Object<RealmBook, 'id'> {
   id!: string;
   bookInfo!: RealmBookInfo; // dict

   //    logs?: Realm.List<RealmLogs>; //  O-t-M
   //    notes?: Realm.List<RealmNotes>; // O-t-M
   static schema = {
      name: 'Book',
      properties: {
         id: 'string',
         bookInfo: '{}',
         //  library: {
         //     type: 'string',
         //  },
         //  logs: 'Logs[]',
         //  notes: 'Notes[]?',
      },
      primaryKey: 'id',
   };
}

// class RealmLogs extends Realm.Object<RealmLogs> {
//    logIndex!: number;
//    startTime?: Date;
//    endTime?: Date;
//    timer?: RealmTimer; // dict
//    pageCount?: number;
//    bookmarked?: boolean;
//    rating?: number;
//    feedback?: 0 | 1 | null;
//    words?: Realm.List<string>;
//    book!: Realm.Results<RealmBook>;
//    note?: RealmNotes; // one-to-one w/ RealmNote
//    static schema = {
//       name: 'Logs',
//       properties: {
//          logIndex: 'int',
//          startTime: 'date?',
//          endTime: 'date?',
//          timer: '{}',
//          pageCount: 'int?',
//          bookmarked: { type: 'bool', default: 'false' },
//          rating: 'int?',
//          feedback: 'int?',
//          words: { type: 'list', objectType: 'string' },
//          book: { type: 'linkingObjects', objectType: 'Book' },
//          note: 'Note?',
//       },
//    };
// }

// class RealmNotes extends Realm.Object<RealmNotes> {
//    id!: string;
//    logIndex?: number;
//    notes?: Realm.List<string>; // this one should be tested may be delta
//    tags?: Realm.Set<string>;
//    quotes?: Realm.Set<string>;
//    highlight?: Realm.Set<string>;
//    createdAt?: Date;
//    updatedAt?: Date;
//    static schema = {
//       name: 'Notes',
//       properties: {
//          id: 'string',
//          logIndex: 'int',
//          notes: {
//             type: 'list',
//             objectType: 'string',
//          },
//          tags: {
//             type: 'set',
//             objectType: 'string',
//          },
//          quotes: {
//             type: 'set',
//             objectType: 'string',
//          },
//          highlight: {
//             type: 'set',
//             objectType: 'string',
//          },
//          createdAt: 'date?',
//          updatedAt: 'date?',
//       },
//    };
// }

// export const RealmConfig: Realm.Configuration = {
//    schema: [RealmLibrary, RealmBook, RealmLogs, RealmNotes],
// };

// provide saved notes for users(?);
// following users(?)
const SCHEMA_VERSION = 1;

export const RealmConfig: Realm.Configuration = {
   schema: [RealmBook, RealmLibrary],
   schemaVersion: SCHEMA_VERSION,
   //    onMigration: (oldRealm: Realm, newRealm: Realm) => {
   //     // only apply this change if upgrading schemaVersion
   //     if (oldRealm.schemaVersion < SCHEMA_VERSION) {
   //       const oldObjects: Realm.Results<RealmLibrary> =
   //         oldRealm.objects(RealmLibrary);
   //       const newObjects: Realm.Results<Person> = newRealm.objects(Person);
   //       // loop through all objects and set the fullName property in the
   //       // new schema
   //       for (const objectIndex in oldObjects) {
   //         const oldObject = oldObjects[objectIndex];
   //         const newObject = newObjects[objectIndex];
   //         newObject.fullName = `${oldObject.firstName} ${oldObject.lastName}`;
   //       }
   //     }
   //   },
};
