import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginParamsList } from '../../library/@types/navigation';
import MainLoginScreen from '../../screens/login/login';
import SigninScreen from '../../screens/signin/signin';
import SignupScreen from '../../screens/signup/signup';
import RecoverPassword from '../../screens/recovery-pw/recover';

const Stack = createNativeStackNavigator<LoginParamsList>();

const LoginNavigation = () => {
   return (
      <Stack.Navigator initialRouteName='Login'>
         <Stack.Screen
            name='Login'
            component={MainLoginScreen}
            options={{
               headerShown: false,
            }}
         />
         <Stack.Screen
            name='Signin'
            component={SigninScreen}
            options={{
               headerShadowVisible: true,
            }}
         />
         <Stack.Screen
            name='SignUp'
            component={SignupScreen}
            options={{
               headerTitle: 'Back',
            }}
         />
         <Stack.Screen
            name='PasswordRecovery'
            component={RecoverPassword}
            options={{
               headerTitle: 'Back',
            }}
         />
      </Stack.Navigator>
   );
};

export default LoginNavigation;
