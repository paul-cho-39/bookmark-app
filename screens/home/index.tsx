import { Text, View } from 'react-native';
import styles from './styles';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'react-native-paper';

import { getUser } from '../../library/helper';
import queryKeys from '../../library/helper/react-query/queryKeys';
import { getFetch, getUrl } from '../../library/helper/react-query';

import { CurrentBook } from '../../library/@types/googleBooks';

import useConnectStore from '../../library/zustand/connectStore';
import { setHasMutated } from '../../library/zustand/logic/connector-logic';

import MainBookCover from './mainBook';
import EmptyLibrary from './emptyLibrary';

import RealmContext from '../../library/realm';
import { RealmBook, RealmLibrary } from '../../library/realm/schema';
import { getRealmCurrentBookData } from '../../library/realm/transaction/controller';

const HomeScreen = ({}) => {
   const uid = getUser() as string;
   const { colors } = useTheme();
   const [hasMutated, isConnected] = useConnectStore((state) => [
      state.data.library.hasMutated,
      state.data.network.isConnected,
   ]);

   const { useQuery: useRealmQuery } = RealmContext;
   const libraries = useRealmQuery(RealmLibrary);
   const { data: current } = useQuery(queryKeys.currentlyReading, () =>
      getRealmCurrentBookData(libraries)
   );

   console.log(current);
   const { data: userLibrary, isError } = useQuery<CurrentBook>(
      queryKeys.recording(uid),
      () => getFetch(getUrl.library.file.getBooks.currentBooks(uid)),
      {
         onSuccess: () => setHasMutated(false),
         refetchInterval: hasMutated ? 1000 : false, // refetches in 1 sec
      }
   );
   const currentBooks = userLibrary?.data;
   console.log(currentBooks);

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
