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
   const singleAuthorCutoff = 15; // adding commas and spacing

   // is this an expensive method? Test this out
   const displayAuthors = getAuthorCutoff(authors, authorCutoff, singleAuthorCutoff);
   const numberOfAuthors = displayAuthors?.length;

   return (
      <View style={[styles.authorContainer, style]}>
         {!authors && <View></View>}
         {Array.isArray(displayAuthors) ? (
            <View style={[styles.multipleAuthors, styles.author]}>
               {displayAuthors &&
                  numberOfAuthors &&
                  authors &&
                  displayAuthors?.map((author, index) => (
                     <Text key={index} style={[{ color: colors.onBackground }]}>
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
            <Text
               key={displayAuthors as string}
               style={[styles.author, { color: colors.onBackground }]}
               // accessibilityLabel={item}
            >
               {displayAuthors}
            </Text>
         )}
      </View>
   );
};

export default Authors;

const styles = StyleSheet.create({
   authorContainer: {},
   multipleAuthors: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginRight: 5,
   },
   author: {},
});
