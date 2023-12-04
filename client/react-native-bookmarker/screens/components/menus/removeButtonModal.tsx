import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

interface RemoveBookModalProps {
   removeBook: () => void;
   setVisible: (value: boolean) => void;
}

const RemoveButtonInsideModal = ({ removeBook, setVisible }: RemoveBookModalProps) => {
   const theme = useTheme();
   return (
      <>
         <Text variant='labelLarge' style={styles.subtext}>
            Once this book is deleted from the database, you will lose all the logs and other data
            associated with this book!
         </Text>
         <View style={styles.buttonWrapper}>
            <Button mode='outlined' style={styles.buttonBack} onPress={() => setVisible(false)}>
               Go back
            </Button>
            <Button
               mode='contained-tonal'
               textColor={theme.colors.onError}
               buttonColor={theme.colors.error}
               onPress={removeBook}
            >
               Remove book
            </Button>
         </View>
      </>
   );
};

export default RemoveButtonInsideModal;

const styles = StyleSheet.create({
   buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   subtext: {
      alignContent: 'center',
      marginVertical: 25,
   },
   buttonBack: {},
});
