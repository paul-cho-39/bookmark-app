import { FlatList, View, Text } from 'react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import useInfiniteFetcher from '../../library/hooks/queryHooks/useInfiniteFetcher';
import styles from './styles';
import { Divider, useTheme, ActivityIndicator } from 'react-native-paper';
import useConnectStore from '../../library/zustand/connectStore';
import SearchScreenResult from './searchScreen';
import { setSearchIsLoading } from '../../library/zustand/logic/connector-logic';
// import { setSearchIsLoading } from '../../library/zustand/logic/connector-logic';

const SearchScreen = ({}) => {
   const { colors } = useTheme();

   const [isFooterLoading, setIsFooterLoading] = useState(false);
   const [query, search, isConnected, isSearchLoading] = useConnectStore((state) => [
      state.inputs.query,
      state.inputs.search,
      state.data.network.isConnected,
      state.data.loader.isSearchLoading,
   ]);

   const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteFetcher({
      search,
      enabler: isFooterLoading,
   });
   const items = data?.pages[0].items;
   useEffect(() => {
      if (items && isFetching && query === search) {
         setIsFooterLoading(true);
      }
      return () => {
         setIsFooterLoading(false);
      };
   }, [query, search, items]);

   useEffect(() => {
      if (items && search && isSearchLoading) {
         setTimeout(() => {
            setSearchIsLoading(false);
         }, 500);
      }
   }, [items, isSearchLoading]);

   const Loader = () => {
      return (
         <ActivityIndicator
            animating={isSearchLoading}
            size='large'
            style={[styles.loading, { display: isSearchLoading ? 'flex' : 'none' }]}
         />
      );
   };

   if (!items) {
      return (
         <View
            style={[styles.container, { backgroundColor: colors.background, height: '100%' }]}
            accessible={true}
         ></View>
      );
   }

   return (
      <View
         style={[styles.container, { backgroundColor: colors.background, height: '100%' }]}
         accessible={true}
      >
         <Divider style={{ marginTop: 5 }} bold />
         {isSearchLoading && <Loader />}
         <SearchScreenResult
            data={data}
            hasNextPage={hasNextPage}
            isLoading={isSearchLoading}
            isFooterLoading={isFooterLoading}
            loadingStyle={styles.loading}
            fetchNextPage={fetchNextPage}
         />
      </View>
   );
};

export default SearchScreen;
