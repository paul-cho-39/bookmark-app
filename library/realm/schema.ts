import Realm from 'realm';
import { RealmTimer, RealmBookInfo } from './dictionary';
// location (since it will likely change(?))
// should location differ for each time user reads the book?

// should this information be encrypted(?);
// NOTE: should the get more complex and requires real-time data
// to interact with another user GraphQL may be a better fit

// class RealmLibrary extends Realm.Object<RealmLibrary> {
//    name!: string;
//    library!: Realm.List<RealmBook>;
//    static schema = {
//       name: 'Library',
//       properties: {
//          name: 'string',
//          library: { type: 'list', objectType: 'Book' },
//       },
//    };
// }

class RealmBook extends Realm.Object<RealmBook> {
   id!: string;
   //    library!: Realm.Set<string>;
   //    bookInfo?: RealmBookInfo; // dict
   //    logs?: Realm.List<RealmLogs>; //  O-t-M
   //    notes?: Realm.List<RealmNotes>; // O-t-M
   static schema = {
      name: 'Book',
      properties: {
         id: 'string',
         //  library: {
         //     type: 'string',
         //  },
         //  bookInfo: '{}',
         //  logs: 'Logs[]',
         //  notes: 'Notes[]?',
      },
      //   primaryKey: 'id',
   };

   constructor(realm: Realm, id: string) {
      super(realm, { id: id || '_SYNC_DISABLED_' });
   }
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

export const RealmConfig: Realm.Configuration = {
   schema: [RealmBook],
   //    inMemory: true,
};

// provide saved notes for users(?);
// following users(?)
