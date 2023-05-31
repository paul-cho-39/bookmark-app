import { FlatList, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import useInfiniteFetcher from '../../library/hooks/queryHooks/useInfiniteFetcher';
import createUniqueDataSets from '../../library/helper/createUniqueData';
import { Items } from '../../library/@types/googleBooks';
import Books from '../components/books/books';
import styles from './styles';
import { Divider, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import useConnectStore from '../../library/zustand/connectStore';
import { resetQuery } from '../../library/zustand/logic/connector-logic';

const SearchScreen = ({}) => {
   const [search, setSearch] = useState('');
   const [uniqueDataSets, setUniqueDataSets] = useState<Array<Items<any>>>([]);
   const { colors } = useTheme();
   const navigation = useNavigation();
   const [isLoading, setIsLoading] = useState(false); // react query isLoading not working so manually creating this
   const [isFooterLoading, setIsFooterLoading] = useState(false);
   const query = useConnectStore((state) => state.inputs.query);

   const { data, isFetching, isError, hasNextPage, fetchNextPage } = useInfiniteFetcher({ search });

   // resetting query so that query becomes active
   useEffect(() => {
      navigation.addListener('blur', () => resetQuery());

      return () => {
         navigation.removeListener('blur', () => resetQuery());
      };
   }, [navigation]);

   // recreating isLoading
   useEffect(() => {
      if (query && search.length > 2 && query !== search) {
         setIsLoading(true);
      }
      if (uniqueDataSets && isFetching && query === search) {
         setIsFooterLoading(true);
      }
      const timeoutId = setTimeout(() => {
         if (query && query.length > 2) {
            setSearch(query);
         }
      }, 500);

      return () => {
         clearTimeout(timeoutId);
         setIsLoading(false);
         setIsFooterLoading(false);
      };
   }, [query, search]);

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

   const loadNextPage = () => {
      if (hasNextPage) {
         setTimeout(() => {
            fetchNextPage();
         }, 350);
      }
   };

   const renderItem = ({ item }: { item: Items<any> }) => {
      return (
         <>
            <Books book={item} />
            <Divider />
         </>
      );
   };

   return (
      <View
         style={[styles.container, { backgroundColor: colors.background, height: '100%' }]}
         accessible={true}
      >
         <Divider style={{ marginTop: 5 }} bold />
         {isLoading ? (
            <ActivityIndicator
               animating={isLoading}
               size='large'
               style={[styles.loading, { display: isLoading ? 'flex' : 'none' }]}
            />
         ) : null}
         {isError || isLoading ? null : (
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
                     style={[styles.loading, { display: isFooterLoading ? 'flex' : 'none' }]}
                  />
               }
            />
         )}
      </View>
   );
};

export default SearchScreen;

// original or old data
// useUniqueDataSet = ((useMemo() => data?.pages && data.pages[0] && createUniqueData(data)))
