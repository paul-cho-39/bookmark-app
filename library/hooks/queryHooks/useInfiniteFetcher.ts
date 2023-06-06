import { fetcher } from '../useFetcher';
import { getCompleteUrl } from '../../helper/fetchGoogleUrl';
import queryKeys from '../../helper/react-query/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

interface FetcherProps {
   search: string;
   enabler: boolean;
   pageIndex?: number;
}

export default function useInfiniteFetcher({ search, enabler }: FetcherProps) {
   // console.log('-----TESTING ITEMS IN INFITEFETCHER----', enabler);
   const { data, isLoading, isFetching, isError, isSuccess, hasNextPage, fetchNextPage } =
      useInfiniteQuery(
         queryKeys.bookSearch(search),
         ({ pageParam }) => fetcher(getCompleteUrl(search, 15, pageParam)),
         {
            onError: (err) => {
               console.log('The error has occured inside InfiniteFetcher', err);
            },
            getNextPageParam: (lastPage, allPages) => {
               // // google book api ordering is off
               // // tested this but cannot seem to find the proper ordering?
               let pageParam = 15;
               if (lastPage && allPages) {
                  const totalAllPagesLength = allPages.length;
                  const lastPageItems = allPages[totalAllPagesLength - 1]?.totalItems;

                  if (lastPage.totalItems === lastPageItems) {
                     return totalAllPagesLength * pageParam;
                  } else {
                     return pageParam;
                  }
               }
            },
            enabled: !!search || !enabler,
            keepPreviousData: true,
            retry: true,
         }
      );
   return {
      data,
      isLoading,
      isFetching,
      isError,
      isSuccess,
      hasNextPage,
      fetchNextPage,
   };
}
