import { Appbar } from 'react-native-paper';
import ControlledTextInput from './controlledInput';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { resetQuery } from '../../../../library/zustand/logic/connector-logic';

// typescript if searchShown is true
interface SearchBarProps {
   onPress?: () => void;
   title?: string;
   searchShown?: boolean;
}

const SearchBar = ({ searchShown = true, title, onPress }: SearchBarProps) => {
   const navigation = useNavigation();
   const goBackHome = () => {
      resetQuery();
      navigation.goBack();
   };
   return (
      <SafeAreaView>
         <Appbar.Header style={styles.header}>
            {searchShown ? (
               <Appbar.Content title={title} />
            ) : (
               <Appbar.BackAction style={styles.backButton} onPress={goBackHome} />
            )}
            <ControlledTextInput displayCloseIcon={!searchShown} />
         </Appbar.Header>
      </SafeAreaView>
   );
};

export default SearchBar;

const styles = StyleSheet.create({
   header: {
      display: 'flex',
      justifyContent: 'space-around',
      height: 45,
      marginTop: 2,
      marginHorizontal: 1,
      marginBottom: 2,
   },
   backButton: {
      // backgroundColor: 'red',
      // alignItems: 'flex-start',
   },
});
