import { RealmLogResult } from '../@realmTypes';
import RealmLogRead from '../class/read/log';

export function getLogIndex(id: string, logs: RealmLogResult) {
   const logIndex = new RealmLogRead(logs, id).latestLog;
   return logIndex;
}
