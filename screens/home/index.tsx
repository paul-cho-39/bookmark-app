import { Text, View } from 'react-native';
import styles from './styles';
import { getUser } from '../../library/helper';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '../../library/helper/react-query/queryKeys';
import { CurrentBook } from '../../library/@types/googleBooks';
import MainBookCover from '../components/books/mainBook';
import { useTheme } from 'react-native-paper';
import useBoundedStore, { setHasMutated } from '../../library/zustand/store';
import { getFetch, getUrl } from '../../library/helper/react-query';

const HomeScreen = ({}) => {
   const uid = getUser() as string;
   const { colors } = useTheme();
   const [hasMutated] = useBoundedStore((state) => [state.hasMutated]);
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
            // TDOO: replacement component if there are no books
            // TODO: an error page if it fails to load the data here
            <View style={{ flex: 1 }}>
               <Text>There are no current books available</Text>
            </View>
         ) : (
            <MainBookCover uid={uid as string} currentBooks={currentBooks} />
         )}

         {/* TODO: signout button should be where editing the book */}
         {/* <SignoutButton /> */}
      </View>
   );
};

export default HomeScreen;
