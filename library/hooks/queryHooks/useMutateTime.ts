import { useMutation, useQuery } from '@tanstack/react-query';
import { getFetch, getUrl, postFetch, queryKeys } from '../../helper/react-query';
import { AddLogDataType, BaseUserLogProps, TimerParamType } from '../../@types/timerData';
import { BodyType } from '../../zustand/logic/bounded-logic/timerLogic';
import { BodyTimer } from '../../zustand/types/@types';

function useFetchLogMutation(params: TimerParamType) {
   const { uid, id, startTime, ...param } = params;
   const uniqueTime = startTime?.getMilliseconds();

   const { mutate: mutateStartReading, data: mutationData } = useMutation(
      queryKeys.timer(uid as string, uniqueTime),
      (body: BodyTimer) => postFetch(getUrl.bookLog.file.addLog(uid as string, id).start, body)
   );

   const queryResult = useQuery(
      queryKeys.timer(uid as string, uniqueTime),
      () => getFetch(getUrl.bookLog.file.getLog(uid, id).currentLog),
      {
         enabled: !mutationData,
      }
   );

   const data: AddLogDataType = mutationData ?? queryResult.data;
   const rest = { ...queryResult };
   return { data, mutateStartReading, rest };
}

function useSaveTimeMutation(params: BaseUserLogProps) {
   const { uid, id, logIndex } = params;
   const { mutate: mutateEndReading, ...rest } = useMutation(
      (body: BodyType) => postFetch(getUrl.bookLog.file.addLog(uid, id).end(logIndex), body),
      {}
   );

   return { mutateEndReading, ...rest };
}

export { useFetchLogMutation, useSaveTimeMutation };
