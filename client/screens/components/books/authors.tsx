import { FlatList, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { createAbbreviationForAuthors, getAuthorCutoff } from '../../../library/helper/sliceAuthor';
import { useTheme } from 'react-native-paper';

type Authors = {
   authors: string[] | undefined;
   authorCutoff?: number; // default 32
   numberOfAuthorToCut?: number; // default 3
   style?: StyleProp<ViewStyle>;
};

const Authors = ({ authors, authorCutoff = 45, numberOfAuthorToCut = 3, style }: Authors) => {
   const { colors } = useTheme();
   const TEXT_COLOR = { color: colors.onBackground };
   const singleAuthorCutoff = 15; // adding commas and spacing

   // is this an expensive method? Test this out
   const displayAuthors = getAuthorCutoff(authors, authorCutoff, singleAuthorCutoff);
   const numberOfAuthors = displayAuthors?.length;

   const SingleAuthor = () => {
      return (
         <Text
            key={displayAuthors as string}
            style={[styles.author, TEXT_COLOR]}
            // accessibilityLabel={item}
         >
            <Text style={[styles.authorBy, TEXT_COLOR]}>by </Text>
            {displayAuthors}
         </Text>
      );
   };

   return (
      <View style={[style]}>
         {!authors && <View></View>}
         {Array.isArray(displayAuthors) ? (
            <View style={[styles.multipleAuthors, styles.author]}>
               <Text style={[styles.authorBy, TEXT_COLOR]}>by </Text>
               {displayAuthors &&
                  numberOfAuthors &&
                  authors &&
                  displayAuthors?.map((author, index) => (
                     <Text key={index} style={[TEXT_COLOR]}>
                        {createAbbreviationForAuthors(
                           author,
                           authors.length,
                           numberOfAuthorToCut,
                           index,
                           numberOfAuthors
                        )}
                     </Text>
                  ))}
               {/* show all... for authors */}
               {/* this one will be used to map  */}
            </View>
         ) : (
            SingleAuthor()
         )}
      </View>
   );
};

export default Authors;

const styles = StyleSheet.create({
   multipleAuthors: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '95%',
      // backgroundColor: 'white',
      // marginRight: 5,
   },
   authorBy: {
      opacity: 0.8,
   },
   author: {
      marginTop: 5,
   },
});
