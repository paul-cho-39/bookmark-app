import auth from '@react-native-firebase/auth';
import ButtonNavigate, { ButtonNavigateProps } from '../../../components/buttons/navigateButton';
import { useMutation } from '@tanstack/react-query';
import { deleteFetch } from '../../../library/helper/react-query';

const SignoutButton = ({ ...props }: Partial<ButtonNavigateProps>) => {
   const { color, name = 'Sign out', mode = 'outlined', style } = props;
   const email = auth().currentUser?.email;

   const { mutateAsync: sendToken } = useMutation(async () => {
      const body = { email: email as string };
      deleteFetch('/user/signout', body);
   });

   return (
      <ButtonNavigate
         onPress={async () => {
            sendToken().then(() => {
               auth()
                  .signOut()
                  .then(() => console.log('User signed out'));
            });
         }}
         name={name}
         mode={mode}
         color={color}
         style={style}
      />
   );
};

export default SignoutButton;
