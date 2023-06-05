import { Realm } from '@realm/react';
import { RealmLibrary, RealmLogs, RealmBook } from '../schema';

export default class TimerLogs {
   private realm: Realm;

   constructor(realm: Realm) {
      this.realm = realm;
   }
   // depending on the data create a new one here
   createNewLog(id: string, options?: Record<string, unknown>) {
      const currentBook = this.getBookById(id);
      const latestLogIndex = this.getLatestLogIndex(currentBook.id);

      const newLogIndex = latestLogIndex + 1;
      this.realm.create<RealmLogs>('Logs', {
         id: id,
         logIndex: newLogIndex,
         ...options,
      });
   }
   getLogByIndex(logIndex: number, id: string) {
      return this.realm
         .objects<RealmLogs>('Logs')
         .filtered(`logIndex = "${logIndex}" AND id = "${id}" `)[0];
   }
   getLatestLogIndex(id: string) {
      const logs = this.getAllLogsById(id);
      if (logs.length === 0) return 0;
      return Math.max(...logs.map((log) => log.logIndex));
   }
   private getCurrentlyReadingBook(id: string) {
      const library = this.realm
         .objects<RealmLibrary>('Library')
         .filtered(`name = "reading" OR name = "finished" `)[0];
      const currentBook = library.books.find((book) => book.id === id);
      return currentBook;
   }
   private getBookById(id: string) {
      return this.realm.objects<RealmBook>('Book').filtered(`id = "${id}" `)[0];
   }
   private getAllLogsById(id: string) {
      return this.realm.objects<RealmLogs>('Logs').filtered(`id = "${id}" `);
   }
}
