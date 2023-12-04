import { height as HEIGTH } from '../../library/helper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      paddingTop: 5,
      flex: 1,
   },
   loading: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: HEIGTH / 4,
   },
});

export default styles;
