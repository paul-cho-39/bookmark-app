import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      marginTop: 70,
      marginHorizontal: 30,
      display: 'flex',
      flex: 1,
   },
   title: {
      marginBottom: 2,
      textAlignVertical: 'top',
      textAlign: 'justify',
      fontWeight: '700',
   },
   inputWrapper: {
      marginBottom: 10,
   },
   icon: {
      paddingTop: 10,
      paddingRight: 5,
   },
   textInput: {
      paddingTop: 1,
      paddingLeft: 15,
      paddingHorizontal: 2,
      marginBottom: 0,
      backgroundColor: 'transparent',
      fontSize: 18,
   },
   error: {
      fontSize: 8,
      color: 'red',
   },
   buttonWrapper: {
      marginBottom: 5,
   },
   button: {
      marginBottom: 10,
   },
   divider: {
      marginBottom: 15,
   },
});

export default styles;
 