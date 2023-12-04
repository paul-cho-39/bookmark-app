import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      display: 'flex',
      flex: 1,
      marginTop: 20,
      marginHorizontal: 10,
   },
   logo: {
      textAlign: 'center',
      marginBottom: 20,
   },
   buttonWrapper: {
      marginTop: 20,
   },
   button: {},
   emailWrapper: {},
   memberWrapper: {
      display: 'flex',
      flexDirection: 'column',
      marginHorizontal: 20,
   },
   input: {
      backgroundColor: 'transparent',
      padding: 8,
      paddingVertical: 0,
      marginBottom: -5,
   },
   signin: {
      marginTop: 25,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export default styles;
