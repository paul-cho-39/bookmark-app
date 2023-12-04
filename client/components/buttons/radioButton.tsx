import { RadioButton, RadioButtonProps, Text } from 'react-native-paper';
import { Library } from '../../library/@types/googleBooks';

interface CustomRadioButtonProps {
   name: string;
   type: keyof Library;
   select: string;
   disabled: boolean;
   onButtonChange?: (store: any) => void;
}

const RadioButtons = ({ name, type, select, disabled, onButtonChange }: CustomRadioButtonProps) => {
   return (
      <>
         <RadioButton
            value={type}
            status={select === type ? 'checked' : 'unchecked'}
            onPress={onButtonChange}
            disabled={disabled}
         />
         <Text>{name}</Text>
      </>
   );
};

export default RadioButtons;
