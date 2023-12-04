import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../helper/react-query';

interface RealmWithQueryParams<QueryData, ReturnedData extends unknown | Record<string, unknown>> {
   realmData: Promise<QueryData>;
   queryKeys: QueryKey;
   queryOptions?: UseQueryOptions<QueryData, unknown>;
   options?: (QueryData: any) => ReturnedData | void;
}

// higher order hook call that calls an option
function useRealmWithQuery<QueryData, ReturnedData>(
   realmData: () => Promise<QueryData>,
   queryKeys: QueryKey,
   queryOptions?: UseQueryOptions<QueryData, unknown>,
   options?: (QueryData: any) => ReturnedData | void
) {
   // set the query result but it can be changed

   const defaultConfig: UseQueryOptions<QueryData, unknown> = {
      enabled: !!realmData,
      staleTime: 1000 * 60 * 5,
      cacheTime: Infinity,
      retry: 3,
      retryDelay: (attempt: number) => Math.min(attempt * 1000, 5000),
   };

   const whichOption = !queryOptions ? defaultConfig : queryOptions;

   const queryResult = useQuery<QueryData>(queryKeys, realmData, whichOption);

   const _data = queryResult.data;

   //    if (options && _data) {
   //       return options(_data);
   //    }

   return queryResult;
}

export default useRealmWithQuery;

// work with realm data and useQuery to store the data for reading
// first it will use data and use options that can either cleanup/parse/
