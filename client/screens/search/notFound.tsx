import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface BookNotFoundProps {
   hasNoItems?: boolean;
   isLoading?: boolean;
}

const BookNotFound = ({ hasNoItems, isLoading }: BookNotFoundProps) => {
   return (
      <>
         <View
            style={{
               marginTop: 50,
               paddingHorizontal: 20,
            }}
         >
            <Text variant='displayMedium'>No results found</Text>
            <Text variant='bodyLarge'>
               Even with our reading glasses on, we couldn't find any matches for your query. Try
               using different keywords or check your spelling
            </Text>
         </View>
      </>
   );
};
// TODO: finish this
const styles = StyleSheet.create({
   infoContainer: {},
});

export default BookNotFound;
