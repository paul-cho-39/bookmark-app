import { useQuery } from '@tanstack/react-query';
import RealmContext from '../../realm';
import RealmLibraryRead from '../../realm/transaction/class/read/library';
import { queryKeys } from '../../helper/react-query';
import { RealmLibrary } from '../../realm/schema';
import { useEffect, useState } from 'react';

// TODO: TEST THIS OUT
export default function useGetCurrentReading() {
   const { useQuery: useRealmQuery } = RealmContext;
   const library = useRealmQuery(RealmLibrary);
   const currentlyReading = new RealmLibraryRead(library).getBooks<'reading'>('reading');
   const primaryBook = new RealmLibraryRead(library).getPrimary;

   // should refetch if the old data becomes stale but would be the case already
   // since this would automatically trigger a new data(?)
   // if this is not the case then refetch should happen when isPrimary is changed
   // or if it is the case the length of currentlyReading has changed
   // and this should be stored by CREATING ANOTHER CLASS

   // TODO: CLEAN THE DATA HERE SO RETRIEVE THE CLEANED AND NORMALIZE THE DATA HERE
   const numberOfCurrentlyReadingBooks = currentlyReading.reading.length;
   const [currentlyReadingLength, setCurrentlyReadingLength] = useState(
      numberOfCurrentlyReadingBooks
   );

   useEffect(() => {
      if (numberOfCurrentlyReadingBooks !== currentlyReadingLength) {
         setCurrentlyReadingLength(numberOfCurrentlyReadingBooks);
         refetch();
      }
   }, [currentlyReading]);

   const { refetch, ...rest } = useQuery(queryKeys.currentlyReading, async () => currentlyReading, {
      enabled: !!currentlyReading,
      retry: 5, // better retry number(?)
      retryDelay: (attempt: number) => Math.min(attempt * 1000, 5000),
   });
   return {
      queryObject: rest,
      primaryBook: primaryBook,
   };
}
