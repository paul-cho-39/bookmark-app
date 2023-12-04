import { View, StyleSheet } from 'react-native';
import { CONTAINER_HEIGHT, MODAL_WIDTH, width } from '../../../library/helper';
import { CurrentBookData } from '../../../library/@types/googleBooks';
import BookInfo from './bookInfo';

interface BookInfoModalProps {
   bookData: CurrentBookData;
   index?: number;
   thresholdLength?: number;
   titleCutoff?: number;
}

const BookInfoInsideModal = ({
   bookData,
   index,
   thresholdLength,
   titleCutoff,
}: BookInfoModalProps) => {
   const { title } = bookData;

   // this is preventing dummy data to appear
   const isDummyStart = index && index === 0;
   const isDummyEnd = index && index === thresholdLength;

   return (
      <>
         {isDummyStart || isDummyEnd ? (
            <View style={styles.infoContainer}></View>
         ) : (
            title && (
               <View style={styles.bookContainer}>
                  <BookInfo
                     titleCutoff={titleCutoff}
                     singleAuthorCutoff={24}
                     bookInfo={bookData}
                     style={styles.descriptionWrapper}
                     descriptionContent={styles.descriptionContent}
                     titleStyle={styles.title}
                  />
               </View>
            )
         )}
      </>
   );
};

const styles = StyleSheet.create({
   infoContainer: {
      display: 'flex',
      flex: 1,
      width: MODAL_WIDTH,
   },
   bookContainer: {
      flex: 1,
      // backgroundColor: 'red',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      justifyContent: 'center',
      width: MODAL_WIDTH,
   },
   descriptionWrapper: {
      // backgroundColor: '#C0C0C0',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      width: MODAL_WIDTH,
   },
   descriptionContent: {
      // backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
   },
   bookCover: {
      backgroundColor: 'blue',
   },
   title: {
      fontSize: 18,
   },
});

export default BookInfoInsideModal;
