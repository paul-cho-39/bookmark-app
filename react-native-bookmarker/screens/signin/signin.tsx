import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import { LoginFormValues } from '../../library/@types/control';

import styles from './styles';
import type { SignInProps } from '../../library/@types/navigation';

import Inputs from '../../components/forms/inputs';
import { loginResolver } from '../../library/resolvers/authenticate';

// import auth from '@react-native-firebase/auth';
import useSendToken from '../../library/hooks/queryHooks/useSendToken';

const SigninScreen = ({ navigation }: SignInProps) => {
   const [isHidden, setIsHidden] = useState(true);
   const [isDisabled, setIsDisabled] = useState(true);
   const { sendToken, isLoading, isError } = useSendToken('/user/signin');

   const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm({
      defaultValues: {
         email: '',
         password: '',
      },
      resolver: loginResolver,
   });

   useEffect(() => {
      const subscription = watch((value, { name, type }) => {
         if (errors.email || errors.password) {
            setIsDisabled(true);
         }
         if (
            !value.email ||
            value.email.length < 3 ||
            !value.password ||
            value.password.length < 1
         ) {
            setIsDisabled(true);
         } else {
            setIsDisabled(false);
         }
      });
      return () => subscription.unsubscribe();
   }, [watch, errors]);

   const onSubmit = (data: LoginFormValues) => {
      auth()
         .signInWithEmailAndPassword(data.email, data.password)
         .then((userCredential) => {
            const user = userCredential;
            return user;
         })
         .then(async (user) => {
            const idToken = await user.user.getIdToken();
            return idToken;
         })
         .then((idToken) => {
            const body = { idToken: idToken };
            sendToken(body);
         })
         .catch((error) => {
            console.log('Error has been issued', error);
            Alert.alert('Error');
         });
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title} variant='headlineSmall'>
            LOGIN
         </Text>
         <Text style={styles.error}>
            {errors.email || errors.password ? 'The email or password is incorrect' : ''}
         </Text>
         <View style={styles.inputWrapper}>
            <Inputs
               control={control}
               shouldDisplayError={false}
               isRequired={true}
               name='email'
               style={styles.textInput}
            />
            <Inputs
               control={control}
               shouldDisplayError={false}
               isRequired={true}
               name='password'
               isPassword={isHidden}
               style={styles.textInput}
               displayRight={
                  <TextInput.Icon
                     style={styles.icon}
                     icon='eye'
                     onPress={() => setIsHidden((prev) => !prev)}
                  />
               }
            />
         </View>
         <View style={styles.buttonWrapper}>
            <Button
               loading={isLoading}
               style={styles.button}
               mode='elevated'
               onPress={handleSubmit(onSubmit)}
               disabled={isDisabled}
            >
               Login
            </Button>
            <Button
               style={styles.button}
               mode='outlined'
               disabled={isLoading}
               onPress={() => navigation.navigate('PasswordRecovery')}
            >
               Forgot password?
            </Button>
         </View>
         <Text>{''}</Text>
         <Button
            disabled={isLoading}
            style={styles.button}
            mode='text'
            onPress={() => navigation.navigate('SignUp')}
         >
            Don't have an account? Sign up now!
         </Button>
      </View>
   );
};

export default SigninScreen;
