import { StyleSheet, View } from 'react-native';
import { CurrentBookData } from '../../library/@types/googleBooks';
import { CONTAINER_HEIGHT, IMAGE_HEIGHT, width } from '../../library/helper';
import MainMenu from '../components/menu/mainBookMenu';
import { QueryCache, useQueryClient } from '@tanstack/react-query';
import { useMutateLibrary } from '../../library/hooks/queryHooks/useMutateLibrary';
import BookInfo from '../components/books/bookInfo';
import { Button, Text } from 'react-native-paper';
import SurfaceButtons from '../components/menu/surfaceButtons';
import queryKeys from '../../library/helper/react-query/queryKeys';
import getUrl from '../../library/helper/react-query/getUrl';
import useSettingsStore from '../../library/zustand/settingsStore';
import { setHasMutated } from '../../library/zustand/logic/connector-logic';
import useConnectStore from '../../library/zustand/connectStore';

interface MainBookCoverProps {
   currentBooks: CurrentBookData[];
   uid?: string;
}

const MainBookCover = ({ currentBooks, uid }: MainBookCoverProps) => {
   const isConnected = useConnectStore((state) => state.data.network.isConnected);
   console.log(`network is:`, isConnected ? 'connected' : 'not connected');

   const queryClient = useQueryClient();
   const timeZone = useSettingsStore(
      (state) => state.userPreference.userGeneralSettings.preference.timeZone
   );
   // TODO: refactor this part use helper function
   // when first loading will likely be using cache to open the app
   const primaryBook = currentBooks
      .filter((book) => book.type === 'PRIMARY')
      .reduce((_, key) => {
         return key;
      }, {}) as CurrentBookData;

   const primaryBookInfo = {
      id: primaryBook.id,
      title: primaryBook.title,
      subtitle: primaryBook.subtitle,
      authors: primaryBook.authors,
      page: primaryBook.page,
   };

   const id = primaryBook.id;
   const url = getUrl.library.file.addBooks(uid as string, id).remove;
   const { mutate, status } = useMutateLibrary(
      url,
      uid as string,
      id,
      setHasMutated,
      queryClient,
      'remove'
   );
   // SNIP -- to here set the logic elsewhere not here

   const userLibrary = queryClient.getQueryData(queryKeys.userLibrary(uid as string));

   return (
      <>
         <View style={styles.infoContainer}>
            {/* its going to be calendar here? */}
            {/* text component? */}
            <View style={styles.containerWrapper}>
               <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Currently Recording: </Text>
               {/* <Text>Started reading: {primaryBook.date?.toString().slice(0, 10)}</Text>*/}
               <View style={styles.bookContainer}>
                  <BookInfo
                     bookInfo={primaryBook}
                     authorStyle={styles.mainAuthor}
                     descriptionContent={styles.descriptionContent}
                     style={styles.descriptionWrapper}
                     imageStyle={styles.image}
                  >
                     <MainMenu removeBook={() => mutate()} currentBooks={currentBooks} />
                  </BookInfo>
                  {/* replace this with <IconButton/> and another component here */}
                  <Button style={styles.infoButton}>Show more info...</Button>
               </View>
            </View>
            <SurfaceButtons uid={uid as string} primaryBookInfo={primaryBookInfo} />
         </View>
      </>
   );
};

export default MainBookCover;

const styles = StyleSheet.create({
   infoContainer: {
      display: 'flex',
      flex: 1,
   },
   containerWrapper: {
      // backgroundColor: 'grey',
   },
   bookContainer: {
      // flexDirection: 'column',
      // alignItems: 'center',
      // justifyContent: 'center',
      // backgroundColor: 'grey',
      // from here on out
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-evenly',
      marginTop: 20,
      paddingVertical: 5,
      borderTopStartRadius: 15,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: 'grey',
   },
   descriptionWrapper: {
      // backgroundColor: '#C0C0C0',
      marginTop: 5,
      flexDirection: 'column-reverse',
      justifyContent: 'space-evenly',
      alignItems: 'flex-end',
      paddingLeft: 10,
      maxHeight: CONTAINER_HEIGHT * 0.5,
      width: width * 0.55,
   },
   descriptionContent: {
      // backgroundColor: 'white',
      height: CONTAINER_HEIGHT * 0.5,
      width: width * 0.55,
      flexDirection: 'column',
      paddingVertical: 5,
   },
   bookCover: {
      backgroundColor: 'blue',
   },
   mainAuthor: {
      // backgroundColor: 'red',
      marginTop: 5,
      paddingVertical: 5,
      fontSize: 18,
   },
   image: {
      borderRadius: 0,
      borderWidth: 2,
      borderColor: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   infoButton: {
      position: 'absolute',
      top: IMAGE_HEIGHT - 50,
      left: width - width * 0.6,
   },
});

// if I want to make the app time it right, I have to build so that the splash page does not interfere with the timer.
// IT ONLY SHOULD GO TO THE SERVER when once the timer stops -- for both the startTime and endTime.
// The first thing that should be loaded is the
// a) language, preference settings
// b/c) authentication
// c/b) timer. Timer has to start right on when the app starts.
// should there be a trigger that triggers everything to start loading once say in the cache
// all I need is the date(?) - or the fastest way of recording
// c) good idea to cache (because caching is faster), especially the image -- and only one image. Other library books are only loaded async AFTER loading the current book
// d)

// how does the data fetch? Where does it start? Does it start on load?

// should it be able send a notification when it is notified of clock running and
// not stopping?
// best situation a) it can successfully be able to activate one part of the app and
// as long as it is not asleep it can "background fetch" and display the time on the
// notification (or status?).

// DISPLAYING STATS:
// display the total number of stats for all users that may raise interest to other users
