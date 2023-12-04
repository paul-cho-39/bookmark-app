import { StyleSheet } from 'react-native';

// is there a way to customize at the top instead for each component?
const styles = StyleSheet.create({
   container: {
      marginTop: 70,
      marginHorizontal: 30,
      display: 'flex',
      flex: 1,
   },
   title: {
      marginBottom: 30,
      textAlign: 'center',
      fontWeight: '700',
   },
   inputWrapper: {
      marginBottom: 20,
   },
   icon: {
      paddingTop: 10,
      paddingRight: 5,
   },
   textInput: {
      paddingTop: 1,
      paddingLeft: 5,
      paddingHorizontal: 2,
      marginBottom: 0,
      backgroundColor: 'transparent',
      fontSize: 18,
   },
   textWrapper: {},
   textPrivacy: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
   },
   button: {
      fontSize: 18,
   },
   footer: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
   },
});

export default styles;
