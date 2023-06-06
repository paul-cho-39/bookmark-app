import { useMemo, useState } from 'react';
import { createUniqueDataSets } from '../../library/helper';
import { Items } from '../../library/@types/googleBooks';
import Books from '../components/books/books';
import { Divider } from 'react-native-paper';
import {
   FetchNextPageOptions,
   InfiniteData,
   InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { ActivityIndicator, FlatList, StyleProp, ViewStyle } from 'react-native';

interface SearchScreenResultProps {
   data: InfiniteData<any> | undefined;
   hasNextPage: boolean | undefined;
   isLoading: boolean;
   isFooterLoading: boolean;
   loadingStyle: StyleProp<ViewStyle>;
   fetchNextPage: (
      options?: FetchNextPageOptions | undefined
   ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
}

const SearchScreenResult = ({
   data,
   hasNextPage,
   isLoading,
   isFooterLoading,
   loadingStyle,
   fetchNextPage,
}: SearchScreenResultProps) => {
   const [uniqueDataSets, setUniqueDataSets] = useState<Array<Items<any>>>([]);

   useMemo(() => {
      const timeoutId = setTimeout(() => {
         if (data?.pages && data.pages[0]) {
            const uniqueData = createUniqueDataSets(data);
            if (uniqueData) {
               setUniqueDataSets(uniqueData);
            }
         }
      }, 150);

      return () => clearTimeout(timeoutId);
   }, [data]);

   const renderItem = ({ item }: { item: Items<any> }) => {
      return (
         <>
            {!item ? null : (
               <>
                  <Books book={item} />
                  <Divider />
               </>
            )}
         </>
      );
   };

   const loadNextPage = () => {
      if (hasNextPage) {
         setTimeout(() => {
            fetchNextPage();
         }, 350);
      }
   };

   return (
      <FlatList
         keyExtractor={(item) => item && item?.id}
         data={uniqueDataSets}
         renderItem={renderItem}
         onEndReachedThreshold={0.2}
         onEndReached={loadNextPage}
         style={{ display: isLoading ? 'none' : 'flex' }}
         ListFooterComponent={
            <ActivityIndicator
               size='large'
               animating={isFooterLoading}
               style={[loadingStyle, { display: isFooterLoading ? 'flex' : 'none' }]}
            />
         }
      />
   );
};

export default SearchScreenResult;
