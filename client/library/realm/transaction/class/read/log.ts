import { RealmLogResult } from '../../@realmTypes';

export default class RealmLogRead {
   private logs: RealmLogResult;
   private id: string;
   constructor(logs: RealmLogResult, id: string) {
      this.logs = logs;
      this.id = id;
   }
   get latestLog() {
      return this.getAllLogs.length > 0
         ? Math.max(...this.getAllLogs.map((log) => log.logIndex))
         : 0;
   }
   get getAllLogs() {
      return this.logs.filtered(`id = "${this.id}" `);
   }
}
