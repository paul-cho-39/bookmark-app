import { Text, View } from 'react-native';
import styles from './styles';
import { getUser } from '../../library/helper';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '../../library/helper/react-query/queryKeys';
import { CurrentBook } from '../../library/@types/googleBooks';
import MainBookCover from './mainBook';
import { useTheme } from 'react-native-paper';
import { getFetch, getUrl } from '../../library/helper/react-query';

import useConnectStore from '../../library/zustand/connectStore';
import { setHasMutated } from '../../library/zustand/logic/connector-logic';

import RealmInit from '../../library/realm/';
import EmptyLibrary from './emptyLibrary';
import RealmLibraryEditor from '../../library/realm/transaction/class/library';
import { RealmBook, RealmLibrary } from '../../library/realm/schema';
import RealmLibraryRead from '../../library/realm/transaction/class/library';

const HomeScreen = ({}) => {
   const uid = getUser() as string;
   const { colors } = useTheme();
   const [hasMutated, isConnected] = useConnectStore((state) => [
      state.data.library.hasMutated,
      state.data.network.isConnected,
   ]);

   const { useQuery: useRealmQuery } = RealmInit;
   const libraries = useRealmQuery(RealmLibrary);
   const getLibrary = new RealmLibraryRead(libraries);
   const book = getLibrary.getBooks<'reading'>('reading');

   console.log('reading: ', book.reading);
   // const title = libraries[1].books.map((book) => book.bookInfo.title);

   // const realmLibraryEditor = new RealmLibraryEditor(realm);

   // const current = realmLibraryEditor.booksInEachLibrary<'reading'>('reading');
   // const book = current.reading.map((book) => book.bookInfo.title).toString();
   // change the queryKeys based
   const { data: userLibrary, isError } = useQuery<CurrentBook>(
      queryKeys.recording(uid),
      () => getFetch(getUrl.library.file.getBooks.currentBooks(uid)),
      {
         onSuccess: () => setHasMutated(false),
         refetchInterval: hasMutated ? 1000 : false, // refetches in 1 sec
      }
   );
   const currentBooks = userLibrary?.data;

   return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
         {!currentBooks ? (
            <EmptyLibrary />
         ) : (
            <>
               <MainBookCover uid={uid as string} currentBooks={currentBooks} />
               {/* <Text style={{ color: 'white' }}>{book}</Text> */}
               {/* <Text style={{ color: 'white' }}>{title}</Text> */}
            </>
         )}
      </View>
   );
};

export default HomeScreen;
