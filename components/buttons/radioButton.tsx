import { RadioButton, Text } from 'react-native-paper';
import { Library } from '../../library/@types/googleBooks';

interface RadioButtonProps {
   name: string;
   type: keyof Library;
   select: string;
   onButtonChange?: (store: any) => void;
}

const RadioButtons = ({ name, type, select, onButtonChange }: RadioButtonProps) => {
   return (
      <>
         <RadioButton
            value={type}
            status={select === type ? 'checked' : 'unchecked'}
            onPress={onButtonChange}
         />
         <Text>{name}</Text>
      </>
   );
};

export default RadioButtons;
