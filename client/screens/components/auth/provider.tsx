import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useSendToken from '../../../library/hooks/queryHooks/useSendToken';
import { Button } from 'react-native-paper';
import Config from '../../../library/config';

GoogleSignin.configure({
   webClientId: Config.WEB_CLIENT_ID,
});

const ProviderButton = ({ style }: { style?: Record<string, any> }) => {
   const { sendToken } = useSendToken('/user/provider');

   async function signWithGoogle() {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken, user } = await GoogleSignin.signIn();
      // for connecting googleSignin and firebase auth
      const googleCredential = auth.GoogleAuthProvider.credential(idToken as string);
      const body = { email: user.email as string };

      sendToken(body);

      return auth().signInWithCredential(googleCredential);
   }
   return (
      <>
         <Button
            style={style}
            icon='google'
            mode='outlined'
            onPress={() => signWithGoogle()}
            shouldRasterizeIOS={true}
         >
            Sign in with Google
         </Button>
      </>
   );
};

export default ProviderButton;
