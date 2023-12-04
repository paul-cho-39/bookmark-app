import { RealmBook, RealmLibrary, RealmLogs } from '../../schema';
import { LoggerEndBodyType, RealmBookResult, RealmLogResult, RealmResult } from '../@realmTypes';

// so even for notes, so when

interface BodySyncParams<DataType> {
   logs: {
      data: Omit<RealmLogs, 'isUpdated'>;
   };
}

function syncDataToServer<T>(isConnected: boolean, body: T, callback: (body: T) => void) {
   if (isConnected) {
      callback(body);
   } else {
      // TODO: communicate b/w zustand
      // if the network is not available
      // use zustand connector for each of the data and that would have batch update
   }
}

export default syncDataToServer;

class SyncRealmLogData {
   logs: RealmLogResult;
   protected body: { [key: number]: LoggerEndBodyType } = {};
   constructor(logs: RealmLogResult) {
      this.logs = logs;
      this.body = {};
   }
   get getBody() {
      return this.body;
   }
   onLogEnd(logs: RealmLogResult, changes: Realm.CollectionChangeSet) {
      changes.newModifications.forEach((index) => {
         const updatedLog = logs[index];
         this.updateBodyIfValid(updatedLog);
      });
      return this.body;
   }
   updateAfterNetworkFound() {
      const unupdatedLog = this.checkNotUpdatedLogs();
      unupdatedLog && this.updateBodyIfValid(unupdatedLog);
      return this.body;
   }
   private updateBodyIfValid(log: RealmLogs) {
      if (log && this.isLogTimeValid(log)) {
         this.body[log.logIndex] = log;
      }
   }
   private isLogTimeValid(logs: RealmLogs) {
      const startTime = logs.startTime;
      const endTime = logs.endTime;
      if (startTime !== null && endTime !== null) {
         return true;
      }
      return false;
   }
   private checkNotUpdatedLogs() {
      const notUpdatedLogs = this.logs.filtered(`isUpdated = false`);
      return notUpdatedLogs.length ? notUpdatedLogs[0] : null;
   }
}

// whenever useMutation and it is updated to the server
// then onSuccess -> toggle isUpdated = true;

// some good advice:
// 1)
// Batching: When sending logs with updateRest, consider batching them and sending
// multiple logs in a single request (if your server API supports it).
// This can reduce the number of network requests.

// 2)
// Error Handling & Retry: Implement a robust error handling mechanism.
// If a sync operation fails, you may want to retry it after some time.
// react-query, which you are using, has a built-in mechanism for retries.
