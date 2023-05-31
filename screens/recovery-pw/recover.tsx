import { View } from 'react-native';
import Inputs from '../../components/forms/inputs';
import { useForm } from 'react-hook-form';
import { Button, Text } from 'react-native-paper';
import styles from './styles';
import ButtonNavigate from '../../components/buttons/navigateButton';

const RecoverPassword = () => {
   const {
      control,
      handleSubmit,
      formState: { isDirty },
   } = useForm({ defaultValues: { email: '' } });
   return (
      <View style={styles.container}>
         <Text variant='headlineSmall' style={styles.mainText}>
            Request new password
         </Text>
         <Text style={styles.subText}>write a short summary here for forgetting the password</Text>
         <Inputs
            isRequired={true}
            name='email'
            control={control}
            mode='outlined'
            labelColor='white'
            shouldDisplayError={isDirty}
            outlineStyle={styles.inputOutline}
         />
         <ButtonNavigate name='Submit' mode='outlined' onPress={() => console.log('auth')} />
      </View>
   );
};

export default RecoverPassword;
