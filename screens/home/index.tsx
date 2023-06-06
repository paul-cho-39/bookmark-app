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

import Realm from 'realm';
import EmptyLibrary from './emptyLibrary';

const HomeScreen = ({}) => {
   const uid = getUser() as string;
   const { colors } = useTheme();
   const [hasMutated, isConnected] = useConnectStore((state) => [
      state.data.library.hasMutated,
      state.data.network.isConnected,
   ]);

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
            <MainBookCover uid={uid as string} currentBooks={currentBooks} />
         )}
      </View>
   );
};

export default HomeScreen;
