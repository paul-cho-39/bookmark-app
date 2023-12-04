import { Alert, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Inputs from '../../components/forms/inputs';
import { useForm } from 'react-hook-form';

import { SignUpProps } from '../../library/@types/navigation';
import { SignUpFormValues } from '../../library/@types/control';
import styles from './styles';

import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import useSendToken from '../../library/hooks/queryHooks/useSendToken';
import { signupResolver } from '../../library/resolvers/authenticate';
import useBoundedStore from '../../library/zustand/store';
import useConnectStore from '../../library/zustand/connectStore';

const SignupScreen = ({ navigation }: SignUpProps) => {
   const [isHidden, setIsHidden] = useState(true);
   const email = useConnectStore((state) => state.inputs.email);
   const bodySample = { idToken: 'testingToken' };
   const { sendToken, isLoading, isError } = useSendToken('/user/signup');

   const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<SignUpFormValues>({
      defaultValues: {
         email: '',
         name: '',
         password: '',
      },
      resolver: signupResolver,
   });

   useEffect(() => {
      setValue('email', email);
   }, []);

   // TODO: still have to set the error message inside the alert more properly
   function handleNewSignUp(data: SignUpFormValues) {
      auth()
         .createUserWithEmailAndPassword(data.email, data.password)
         .then(async (userCredential) => {
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            const name = data.name;
            const body = { idToken, name };
            return body;
         })
         .then((body) => sendToken(body))
         // .then(async (user) => await user.sendEmailVerification())
         .catch((error) => {
            let message;
            if (error.code === 'auth/email-already-in-use') {
               message = 'Oops, email already exists. \nPlease, try using a different email.';
            }
            Alert.alert('Error', message);
         });
   }

   return (
      <View style={styles.container}>
         <Text variant='headlineSmall' style={styles.title}>
            Create Account
         </Text>
         <View style={styles.inputWrapper}>
            <Inputs control={control} name='email' isRequired={true} style={styles.textInput} />
            <Inputs control={control} name='name' isRequired={true} style={styles.textInput} />
            <Inputs
               control={control}
               name='password'
               isRequired={true}
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
         <Button
            loading={isLoading}
            accessibilityLabel='Register'
            labelStyle={styles.button}
            mode='outlined'
            onPress={handleSubmit(handleNewSignUp)}
         >
            Register
         </Button>
         <Text style={styles.textWrapper}>
            By creating an account, you agree to the ___{' '}
            <Text style={styles.textPrivacy}>Terms of Service</Text> and{' '}
            <Text style={styles.textPrivacy}>Privacy Policy</Text>
         </Text>
         <View style={styles.footer}>
            <Button mode='text'>Terms of Service</Button>
            <Button mode='text'>Privacy</Button>
         </View>
      </View>
   );
};

export default SignupScreen;
