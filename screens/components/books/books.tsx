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
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { getFetch, queryKeys, getUrl } from '../../../library/helper/react-query';
import useConnectStore from '../../../library/zustand/connectStore';
import { setHasMutated } from '../../../library/zustand/logic/connector-logic';

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
   const hasMutated = useConnectStore((state) => state.data.library.hasMutated);
   const queryClient = useQueryClient();

   const { data: userLibrary } = useQuery<QueryData>(
      queryKeys.userLibrary(uid as string),
      () => getFetch(getUrl.library.file.getBooks.allBooks(uid as string)),
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

   const buttonTitle =
      bookInWhichLibrary && bookInWhichLibrary?.length > 0
         ? bookInWhichLibrary.toString()
         : 'Add book';

   // TODO: handleAddButton
   // if buttonTitle is equal to one of the store types
   // then it will navigation.navigate() otherwise "AddButton"

   return (
      <View style={styles.container} accessible={true}>
         <BookInfo
            style={styles.bookInfoContainer}
            descriptionContent={styles.descriptionContent}
            titleStyle={styles.title}
            bookInfo={bookInfo}
            authorStyle={[styles.authors, { color: colors.elevation.level3 }]}
            titleCutoff={30}
            subtitleCutoff={30}
            singleAuthorCutoff={35}
            numberOfAuthorCutoff={3}
         >
            <ChevronButton
               colors={colors}
               loadingComponent={<ActivityIndicator animating={true} />}
               status={status}
               title={buttonTitle}
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
      // backgroundColor: 'red',
      marginVertical: 10,
      paddingHorizontal: 10,
      flex: 1,
      flexDirection: 'row',
   },
   bookInfoContainer: {
      // backgroundColor: 'white',
      marginLeft: 10,
      padding: 5,
   },
   descriptionContent: {
      // backgroundColor: 'white',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
   },
   title: {
      // backgroundColor: 'red',
      textAlign: 'left',
   },
   authors: {
      marginTop: 15,
      width: '100%',
   },
});
