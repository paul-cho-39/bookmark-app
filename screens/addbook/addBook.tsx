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
import { RealmLibrary } from '../../library/realm/schema';

const AddBookScreen = ({ navigation, route }: AddBookScreenProps) => {
   const { colors } = useTheme();
   const { uid, library, bookInfo } = route.params;
   const { id, ...basicBookInfo } = bookInfo;
   const { image, isError, isLoading } = useQueryImage(id);
   const queryClient = useQueryClient();

   // realm context(?);
   const { useRealm, useQuery: useRealmQuery } = RealmContext;
   const realm = useRealm();
   const realmLibrary = useRealmQuery(RealmLibrary);
   const realmParams = {
      realm,
      realmLibrary,
   };

   // EXPERIMENTAL PURPOSES FOR TESTING LIBRARY BUT USE JEST LATER
   // const book = useRealmQuery(RealmBook);
   // const Library = useRealmQuery(RealmLibrary);

   // console.log(
   //    '--------LIBRARY READING BOOKS---------',
   //    Library[1].name,
   //    Library[1].books
   //    // Library.forEach((lib) => lib.books.forEach((book) => book.bookInfo.title))
   // );
   // console.log(
   //    '--------LIBRARY WANT BOOKS-------',
   //    Library[0].name,
   //    Library[0].books
   //    // Library.forEach((lib) => lib.books.forEach((book) => book.bookInfo.title))
   // );
   // console.log(
   //    '--------LIBRARY FINISHED-------',
   //    Library[2].name,
   //    Library[2].books
   //    // Library.forEach((lib) => lib.books.forEach((book) => book.bookInfo.title))
   // );

   const mutationStore = useMutateLibraries(uid, id, setHasMutated, queryClient);

   // if any of isReading or value is true or more than zero, respectively, the type will
   // be 'reading' and radio buttons will be disabled
   const [value, setValue] = useState('0');
   const [isRereading, setIsRereading] = useState(false);

   const DISABLED = isRereading || parseInt(value) > 0;
   const body = {
      currentlyReading: library.reading,
      isRereading: isRereading,
   };

   const data: Store[] = [
      {
         name: 'Read later',
         type: 'want',
         value: null,
         mutate: mutationStore.addToWant.mutate,
      },
      {
         name: 'Read already',
         type: 'finished',
         value: null,
         mutate: mutationStore.addToFinished.mutate,
      },
      // how about reReading AND pageRead?
      {
         name: 'Read now',
         type: 'reading',
         value: value,
         mutate: () => mutationStore.addToCurrent.mutate(body),
      },
   ];

   const [select, setSelect] = useState(data[0].name);

   useEffect(() => {
      const isNotDefault = select !== 'reading';
      if (isNotDefault && DISABLED) {
         setSelect('reading');
      }
      if (isNotDefault) {
         setSelect('reading');
      }
   }, [isRereading]);

   const addWithInfo = () => {
      const bodyWithPage = {
         ...body,
         currentPage: value,
      };
      mutationStore.addToCurrentWithPage.mutate(bodyWithPage);
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
                     disabled={DISABLED}
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
               realmParams={realmParams}
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
