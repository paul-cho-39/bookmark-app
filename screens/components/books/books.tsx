import { StyleSheet, Text, View, Button } from 'react-native';
import React, { Suspense, lazy, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { SearchProps } from '../../../library/@types/navigation';
import { Items, Library } from '../../../library/@types/googleBooks';

import {
   getUser,
   checkBookInLibrary,
   getBasicBookInfo,
   width as WIDTH,
   IMAGE_WIDTH,
} from '../../../library/helper/index';
import { BookInfo } from './index';
import ChevronButton from '../../../components/buttons/dropdownButton';
import { useMutateLibraryWithBody } from '../../../library/hooks/queryHooks/useMutateLibrary';
import useBoundedStore, { setHasMutated } from '../../../library/zustand/store';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { getFetch, queryKeys, getUrl } from '../../../library/helper/react-query';

const DisplayBookIdIcon = lazy(() => import('./../books/displayBookIdIcon'));

type BookProps = {
   book: Items<Record<string, string>>;
};

type QueryData = { data: Library };

const Books = ({ book }: BookProps) => {
   const { colors } = useTheme();

   const navigation = useNavigation<SearchProps['navigation']>();
   const uid = getUser();
   const bookInfo = getBasicBookInfo(book);

   const url = `/library/authenticate/${uid}/${bookInfo.id}/reading`;
   const hasMutated = useBoundedStore((state) => state.hasMutated);
   const queryClient = useQueryClient();

   const { data: userLibrary } = useQuery<QueryData>(
      queryKeys.userLibrary(uid as string),
      () => getFetch(getUrl.library.file.getBooks.allBooks(uid as string)),
      // () => getFetch(`/library/books/${uid}`),
      {
         onSuccess: () => setHasMutated(false),
         onError: (err) => console.log(err), // logging error
         refetchOnWindowFocus: true,
         refetchInterval: hasMutated ? 1000 : false, // triggers if updated refetches in 1 sec
         enabled: !!uid,
      }
   );
   const library = userLibrary?.data as Library;

   const { mutate, status } = useMutateLibraryWithBody(url, book.id, uid as string, queryClient);
   const body = { currentlyReading: library?.reading };

   const bookInWhichLibrary = useMemo(
      () => library && checkBookInLibrary(library, book.id),
      [library, userLibrary]
   );

   return (
      <View style={styles.container} accessible={true}>
         <BookInfo
            titleCutoff={30}
            style={styles.descriptionWrapper}
            descriptionContent={styles.descriptionContent}
            bookInfo={bookInfo}
         >
            <Suspense fallback={<View></View>}>
               <DisplayBookIdIcon bookInWhichLibrary={bookInWhichLibrary as string[]} />
            </Suspense>
            <ChevronButton
               color={colors.secondaryContainer}
               iconColor={colors.onSecondaryContainer}
               loadingComponent={<ActivityIndicator animating={true} />}
               status={status}
               title='Add Book'
               onPress={() => mutate(body)}
               handleIconPress={() => {
                  navigation.navigate('AddBook', {
                     uid: uid as string,
                     library: library,
                     bookInfo: bookInfo,
                  });
               }}
            />
         </BookInfo>
      </View>
   );
};

export default React.memo(Books);

const styles = StyleSheet.create({
   container: {
      marginVertical: 10,
      paddingHorizontal: 10,
      flex: 1,
      flexDirection: 'row',
   },
   descriptionWrapper: {
      // backgroundColor: 'red',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: WIDTH - IMAGE_WIDTH,
   },
   descriptionContent: {
      // backgroundColor: 'white',
      justifyContent: 'flex-start',
      alignItems: 'baseline',
      marginBottom: 25,
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: '100%',
   },
});
