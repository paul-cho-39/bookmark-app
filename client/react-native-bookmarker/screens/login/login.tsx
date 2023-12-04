import { useState, useEffect, useCallback } from 'react';
import styles from './styles';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { emailResolver } from '../../library/resolvers/authenticate';

import { LoginProps } from '../../library/@types/navigation';

// TODO: bundle this together
import Inputs from '../../components/forms/inputs';
import CustomDivider from '../../components/divider';
import ProviderButton from '../components/auth/provider';
import ButtonNavigate from '../../components/buttons/navigateButton';

import useConnectStore from '../../library/zustand/connectStore';
import { setEmail } from '../../library/zustand/logic/connector-logic';

const MainLoginScreen = ({ navigation }: LoginProps) => {
   const [labelColor, setLabelColor] = useState('transparent');
   const theme = useTheme();
   const email = useConnectStore((state) => state.inputs.email);

   const {
      control,
      handleSubmit,
      watch,
      formState: { isDirty },
   } = useForm({ defaultValues: { email: '' }, resolver: emailResolver });

   useEffect(() => {
      const { unsubscribe } = watch((value) => {
         setEmail(value.email as string);
      });

      return () => unsubscribe();
   }, [watch]);

   // likely have to change this?
   useEffect(() => {
      navigation.addListener('focus', () => {
         if (email.length > 1) {
            setLabelColor(theme.colors.onPrimary);
         }
         if (email.length < 1) {
            setLabelColor('transparent');
         }
      });
   }, [email]);

   const onPressToSignup = () => {
      navigation.navigate('SignUp');
   };

   return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
         <Text variant='headlineMedium' style={styles.logo}>
            Logo Most LikelyPicture Here
         </Text>
         <View style={styles.buttonWrapper}>
            <View>
               <Inputs
                  inputMode='email'
                  control={control}
                  isRequired={false}
                  name='email'
                  mode='outlined'
                  shouldDisplayError={isDirty}
                  labelColor={labelColor}
                  onFocus={() => setLabelColor(theme.colors.onPrimary)}
                  style={styles.input}
                  outlineStyle={{
                     borderColor: 'black',
                     borderRadius: 15,
                     borderWidth: 1.25,
                     elevation: 0,
                     zIndex: 0,
                  }}
               />
               <ButtonNavigate
                  mode='outlined'
                  name='Continue with email'
                  onPress={handleSubmit(onPressToSignup)}
               />
            </View>
            <CustomDivider name='Or' />
            <ProviderButton />
            <View style={styles.signin}>
               <Text style={styles.memberWrapper}>Already have an account?</Text>
               <ButtonNavigate
                  mode='text'
                  name='Log in'
                  onPress={() => navigation.navigate('Signin')}
               />
            </View>
         </View>
      </View>
   );
};

export default MainLoginScreen;
