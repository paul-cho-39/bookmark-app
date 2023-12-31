import Realm from 'realm';
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
}

export interface RealmNoteMeta extends Realm.Dictionary {
   bgColor?: string;
   fontFamily?: string;
   fontSize?: number;
}

export interface RealmNoteData extends Realm.Dictionary {
   hasAttached?: boolean;
   body?: Realm.List<string>;
   attr?: Realm.List<RealNoteBodyParams>;
   links?: Realm.List<string>;
   quotes?: Realm.Set<string>;
   highlight?: Realm.Set<string>;
}

export interface RealNoteBodyParams extends Realm.Dictionary {}

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

// INTRODUCE EXTENSION LIBRARIES WHERE IT CAN BE STORED
export class RealmBook extends Realm.Object<RealmBook, 'id'> {
   id!: string;
   bookInfo!: RealmBookInfo; // dict
   isPrimary!: boolean;
   currentlyReading?: boolean;
   numberOfRead?: number;
   pageStart?: number;
   logs?: Realm.List<RealmLogs>; //  O-t-M
   notes?: Realm.List<RealmNotes>; // O-t-M
   // personalLibrary?: Realm.List<RealmPersonalLib>
   static schema = {
      name: 'Book',
      properties: {
         id: { type: 'string', indexed: true },
         bookInfo: '{}',
         isPrimary: { type: 'bool', default: false },
         currentlyReading: { type: 'bool', default: false },
         numberOfRead: { type: 'int', default: 0 },
         pageStart: { type: 'int', default: 0 },
         logs: 'Logs[]',
         notes: 'Notes[]',
         // peronsalLibrary: 'RealmPersonalLib[]'
      },
   };
}

export class RealmLogs extends Realm.Object<RealmLogs> {
   id!: string;
   logIndex!: number;
   isUpdated!: boolean;
   startTime?: Date;
   endTime?: Date;
   timer?: RealmTimer; // dict
   pageRead?: number;
   bookmarked?: boolean;
   rating?: number;
   feedback?: 0 | 1 | null;
   words?: Realm.List<string>;
   //    note?: RealmNotes; // one-to-one w/ RealmNote
   static schema = {
      name: 'Logs',
      properties: {
         id: 'string',
         logIndex: 'int',
         isUpdated: { type: 'bool', default: false },
         startTime: 'date?',
         endTime: 'date?',
         timer: '{}',
         pageRead: 'int?',
         rating: 'int?',
         feedback: 'int?',
         bookmarked: { type: 'bool', default: false },
         words: { type: 'list', objectType: 'string' },
         // note: 'Notes?', // if
      },
   };
}

// class RealmPersonalLib extends Realm.Object<RealmPersonalLib> {

// }

export class RealmNotes extends Realm.Object<RealmNotes> {
   id!: string;
   noteId!: Realm.BSON.UUID;
   isUpdated!: boolean;
   logIndex?: number; // if logIndex is deleted then should be -1;
   title?: string;
   chapter?: string;
   tags?: Realm.Set<string>;
   createdAt?: Date;
   lastEdited?: Date;
   meta?: RealmNoteMeta;
   noteData?: RealmNoteData;
   static schema = {
      name: 'Notes',
      properties: {
         id: 'string',
         noteId: { type: 'uuid', indexed: true },
         logIndex: 'int?',
         isUpdated: { type: 'bool', default: false },
         title: 'string?',
         chapter: 'string?',
         createdAt: 'date?',
         updatedAt: 'date?',
         meta: '{}',
         noteData: '{}',
      },
   };
}

// export const RealmConfig: Realm.Configuration = {
//    schema: [RealmLibrary, RealmBook, RealmLogs, RealmNotes],
// };

// provide saved notes for users(?);
// following users(?)
const SCHEMA_VERSION = 13;

export const RealmConfig: Realm.Configuration = {
   schema: [RealmBook, RealmLibrary, RealmLogs, RealmNotes],
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
