import { Text, View } from 'react-native';
import styles from './styles';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'react-native-paper';

import { getUser } from '../../library/helper';
import queryKeys from '../../library/helper/react-query/queryKeys';
import { getFetch, getUrl } from '../../library/helper/react-query';

import { CurrentBook } from '../../library/@types/googleBooks';

import useConnectStore from '../../library/zustand/connectStore';
import { resetQuery, setHasMutated } from '../../library/zustand/logic/connector-logic';

import MainBookCover from './mainBook';
import EmptyLibrary from './emptyLibrary';

import RealmContext from '../../library/realm';
import { RealmBook, RealmLibrary } from '../../library/realm/schema';
import { getRealmCurrentBookData } from '../../library/realm/transaction/controller';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const HomeScreen = ({}) => {
   const uid = getUser() as string;
   const navigation = useNavigation();
   const { colors } = useTheme();

   const [hasMutated, isConnected] = useConnectStore((state) => [
      state.data.library.hasMutated,
      state.data.network.isConnected,
   ]);

   const { useQuery: useRealmQuery } = RealmContext;
   const libraries = useRealmQuery(RealmLibrary);

   const { data: currentlyReadingData } = useQuery(queryKeys.currentlyReading, () =>
      getRealmCurrentBookData(libraries)
   );

   // TODO: SNIP this part out!
   const { data: current } = useQuery(queryKeys.currentlyReading, () =>
      getRealmCurrentBookData(libraries)
   );
   const { data: userLibrary, isError } = useQuery<CurrentBook>(
      queryKeys.recording(uid),
      () => getFetch(getUrl.library.file.getBooks.currentBooks(uid)),
      {
         onSuccess: () => setHasMutated(false),
         refetchInterval: hasMutated ? 1000 : false, // refetches in 1 sec
      }
   );
   const currentBooks = userLibrary?.data;
   // SNIP!

   useEffect(() => {
      navigation.addListener('blur', () => resetQuery());

      return () => {
         navigation.removeListener('blur', () => resetQuery());
      };
   }, [navigation]);

   return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
         {!currentBooks ? (
            <EmptyLibrary />
         ) : (
            <>
               <MainBookCover uid={uid as string} currentBooks={currentBooks} />
               {/* <Text style={{ color: 'white' }}>{title}</Text> */}
            </>
         )}
      </View>
   );
};

export default HomeScreen;
