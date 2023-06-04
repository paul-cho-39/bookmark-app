import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import {
   UpdateBookButton,
   Store,
   ExtraInfo,
   RemoveBookButton,
   BookInfo,
} from '../components/books';
import { useQueryImage, useMutateLibraries } from '../../library/hooks';

import { Library } from '../../library/@types/googleBooks';
import { AddBookScreenProps } from '../../library/@types/navigation';
import RadioButtons from '../../components/buttons/radioButton';
import { useTheme } from 'react-native-paper';
import { setHasMutated } from '../../library/zustand/logic/connector-logic';
import RealmContext from '../../library/realm';
import { RealmBook, RealmLibrary } from '../../library/realm/schema';

const AddBookScreen = ({ navigation, route }: AddBookScreenProps) => {
   const { colors } = useTheme();
   const { uid, library, bookInfo } = route.params;
   const { id, ...basicBookInfo } = bookInfo;
   const { image, isError, isLoading } = useQueryImage(id);
   const queryClient = useQueryClient();

   // realm context(?);
   const { useRealm, useQuery: useRealmQuery } = RealmContext;
   const realm = useRealm();
   const book = useRealmQuery(RealmBook);
   const Library = useRealmQuery(RealmLibrary);

   console.log(
      '--------LIBRARY READING BOOKS---------',
      Library[0].name,
      Library[0].books
      // Library.forEach((lib) => lib.books.forEach((book) => book.bookInfo.title))
   );
   console.log(
      '--------LIBRARY WANT BOOKS-------',
      Library[1].name,
      Library[1].books
      // Library.forEach((lib) => lib.books.forEach((book) => book.bookInfo.title))
   );
   console.log(
      '--------LIBRARY WANT BOOKS-------',
      Library[2].name,
      Library[2].books
      // Library.forEach((lib) => lib.books.forEach((book) => book.bookInfo.title))
   );

   // const filteredId = Library.filtered(`books.id = "${id}" `);
   // console.log(
   //    'libraries:',
   //    filteredId[0].books.find((book) => book.id === id)
   // );

   // console.log(
   //    'WANT',
   //    Library.filtered(`name = "want" `)[0].books.find((book) => book.id === id),
   //    'READING NOW',
   //    Library.filtered(`name = "reading" `)[0].books.find((book) => book.id === id),
   //    'FINISHED',
   //    Library.filtered(`name = "finished" `)[0].books.find((book) => book.id === id)
   // );

   const mutationStore = useMutateLibraries(uid, id, setHasMutated, queryClient);

   const [value, setValue] = useState('0');
   const [isRereading, setIsRereading] = useState(false);

   // if user is rereading the finished book
   const finishedMutation = isRereading
      ? mutationStore.addToReReading.mutate
      : mutationStore.addToFinished.mutate;

   const body = { currentlyReading: library.reading };
   const data: Store[] = [
      {
         name: 'Read later',
         type: 'want',
         mutate: mutationStore.addToWant.mutate,
      },
      {
         name: 'Read already',
         type: 'finished',
         mutate: finishedMutation,
      },
      {
         name: 'Read now',
         type: 'reading',
         mutate: () => mutationStore.addToCurrent.mutate(body),
      },
   ];

   const [select, setSelect] = useState(data[0].name);

   useEffect(() => {
      const isNotDefault = select !== 'reading';
      if (isRereading && isNotDefault) {
         setSelect('reading');
      }
      if (isNotDefault) {
         setSelect('reading');
      }
   }, [isRereading]);

   const addWithInfo = () => {
      const body = { currentPage: value };
      if (select === 'reading') {
         mutationStore.addToCurrentWithPage.mutate(body);

         setTimeout(() => {
            navigation.navigate('Search');
         }, 1000);
      }
      return;
   };

   return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
         <BookInfo
            bookInfo={bookInfo}
            displayPage={true}
            image={image}
            lowQualityImage={basicBookInfo.thumbnail}
            isError={isError}
            isLoading={isLoading}
         />
         <ExtraInfo
            isRereading={isRereading}
            setIsRereading={() => setIsRereading(!isRereading)}
            value={value}
            setValue={setValue}
            page={basicBookInfo.page}
         />
         <View style={styles.buttonWrapper}>
            {data.map((item, index) => (
               <View key={index} style={styles.radioBtn}>
                  <Text>({library?.[item.type as keyof Library]?.length})</Text>
                  <RadioButtons
                     name={item.name}
                     onButtonChange={() => setSelect(item.type)}
                     select={select}
                     type={item.type}
                     disabled={isRereading}
                  />
               </View>
            ))}
            <UpdateBookButton
               navigation={navigation}
               store={data}
               select={select}
               isRereading={isRereading}
               toDatePage={parseInt(value)}
               bookInfo={bookInfo}
               addToLibrary={addWithInfo}
               realm={realm}
            />
            <RemoveBookButton
               library={library}
               id={id}
               navigation={navigation}
               mutate={mutationStore.removeBook.mutate}
               realm={realm}
            />
         </View>
      </View>
   );
};

export default AddBookScreen;

const styles = StyleSheet.create({
   container: {
      height: '100%',
   },
   buttonWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   radioBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
   },
});
