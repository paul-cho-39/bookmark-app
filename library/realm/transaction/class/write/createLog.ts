import { Realm } from '@realm/react';
import { RealmLibrary, RealmLogs, RealmBook } from '../../../schema';

export default class RealmTimerLogs {
   private realm: Realm;
   private id: string;

   constructor(realm: Realm, id: string) {
      this.realm = realm;
      this.id = id;
   }

   private get currentBook() {
      return this.realm.objects<RealmBook>('Book').filtered(`id = "${this.id}" `)[0];
   }
   private get bookLogs() {
      return this.realm.objects<RealmLogs>('Logs').filtered(`id = "${this.id}" `);
   }
   connectLog(log: RealmLogs) {
      this.currentBook.logs?.push(log);
   }
   startTimer(startTime: Date) {
      const latestLogIndex = this.getLatestLogIndex();
      const newLogIndex = latestLogIndex + 1;
      return this.realm.create<RealmLogs>('Logs', {
         id: this.id,
         logIndex: newLogIndex,
         startTime: startTime,
      });
   }
   deleteLog(logIndex: number) {
      const logToDelete = this.getLogByIndex(logIndex);
      if (logToDelete) {
         this.reIndex(logIndex, 'DELETE');
         //  delete the log after
         this.realm.delete(logToDelete);
      }
   }
   reIndex(logIndex: number, type: 'INSERT' | 'DELETE') {
      const logsToReindex = this.getFiltered<RealmLogs>(
         'Logs',
         `id = "${this.id}" AND logIndex > ${logIndex}`
      );
      logsToReindex.forEach((log) => {
         type === 'DELETE' ? (log.logIndex -= 1) : (log.logIndex += 1);
      });
   }
   private getLogByIndex(logIndex: number) {
      return this.getFiltered<RealmLogs>('Logs', `logIndex = "${logIndex}"`)[0];
   }
   private getLatestLogIndex() {
      const logs = this.bookLogs;
      if (logs.length === 0) return 0;
      return Math.max(...logs.map((log) => log.logIndex));
   }
   private getFiltered<T extends RealmLogs | RealmBook>(schema: string, filter: string) {
      return this.realm.objects<T>(schema).filtered(filter);
   }
}
