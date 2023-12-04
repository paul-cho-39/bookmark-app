import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function getUser() {
   // write a function that retrieves the user here
   return auth().currentUser?.uid;
}
