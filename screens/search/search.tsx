import { FlatList, View, Text } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import useInfiniteFetcher from '../../library/hooks/queryHooks/useInfiniteFetcher';
import styles from './styles';
import { Divider, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import useConnectStore from '../../library/zustand/connectStore';
import { resetQuery } from '../../library/zustand/logic/connector-logic';
import SearchScreenResult from '.';
import BookNotFound from './notFound';

const SearchScreen = ({}) => {
   const { colors } = useTheme();
   const navigation = useNavigation();

   const [search, setSearch] = useState('');
   const [hasNoItems, setHasNoItems] = useState(false);
   const [isLoading, setIsLoading] = useState(false); // react query isLoading not working so manually creating this
   const [isFooterLoading, setIsFooterLoading] = useState(false);

   const query = useConnectStore((state) => state.inputs.query);

   const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteFetcher({
      search,
      enabler: hasNoItems,
   });
   const items = data?.pages[0].items;

   // resetting query so that query becomes active
   useEffect(() => {
      navigation.addListener('blur', () => resetQuery());

      return () => {
         navigation.removeListener('blur', () => resetQuery());
      };
   }, [navigation]);

   useEffect(() => {
      if (query && search.length > 2 && data) {
         if (items) {
            setHasNoItems(false);
         }
      }
      if (hasNoItems && query !== search) {
         setHasNoItems(false);
      }
      if (query && search.length > 2 && !items) {
         setHasNoItems(true);
         setTimeout(() => {
            if (isLoading && hasNoItems) {
               setIsLoading(false);
            }
         }, 500);
      }
      if (query && search.length > 2 && query !== search) {
         setIsLoading(true);
      }
      if (items && isFetching && query === search) {
         setIsFooterLoading(true);
      }
      const timeoutId = setTimeout(() => {
         if ((query && query.length > 2) || (query && query.length < 2)) {
            setSearch(query);
         }
      }, 100);

      return () => {
         clearTimeout(timeoutId);
         setIsLoading(false);
         setHasNoItems(false);
         setIsFooterLoading(false);
      };
   }, [query, search, items]);

   const Loader = () => {
      return (
         <ActivityIndicator
            animating={isLoading}
            size='large'
            style={[styles.loading, { display: isLoading ? 'flex' : 'none' }]}
         />
      );
   };

   if (!items && !hasNoItems) {
      return (
         <View
            style={[styles.container, { backgroundColor: colors.background, height: '100%' }]}
            accessible={true}
         >
            {isLoading && <Loader />}
         </View>
      );
   }

   return (
      <View
         style={[styles.container, { backgroundColor: colors.background, height: '100%' }]}
         accessible={true}
      >
         <Divider style={{ marginTop: 5 }} bold />
         {isLoading ? (
            <Loader />
         ) : hasNoItems ? (
            <BookNotFound />
         ) : (
            <SearchScreenResult
               data={data}
               hasNextPage={hasNextPage}
               isLoading={isLoading}
               isFooterLoading={isFooterLoading}
               loadingStyle={styles.loading}
               fetchNextPage={fetchNextPage}
            />
         )}
      </View>
   );
};

export default SearchScreen;

// original or old data
// useUniqueDataSet = ((useMemo() => data?.pages && data.pages[0] && createUniqueData(data)))
