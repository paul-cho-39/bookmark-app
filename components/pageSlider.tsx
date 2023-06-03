import { Text, TextInput, TextInputProps } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

interface PageInputProps {
   textValue: string;
   onTextChange: (newValue: string) => void;
   text: string;
   show: boolean;
}

const PageInput = ({
   textValue,
   onTextChange,
   text,
   show,
}: // increase,
PageInputProps) => {
   return show ? (
      <View style={styles.progressContainer}>
         <Text style={styles.inputText} variant='labelLarge'>
            {text}
         </Text>
         <PageInputter
            caretHidden
            autoFocus
            value={textValue}
            onChange={onTextChange}
            aria-label='page-in-progress'
            style={{ backgroundColor: 'transparent', marginBottom: 40 }}
         />
      </View>
   ) : null;
};

interface PageInputterProps extends Omit<TextInputProps, 'value' | 'onChange'> {
   value: string;
   onChange: (newValue: string) => void;
}

export const PageInputter = ({ value, onChange, ...rest }: PageInputterProps) => {
   // const valueToString = value.toString();
   return (
      <>
         <TextInput
            keyboardType='number-pad'
            value={value}
            onChangeText={onChange}
            {...(rest as TextInputProps)}
         />
      </>
   );
};

const styles = StyleSheet.create({
   progressContainer: {
      marginHorizontal: 25,
      marginVertical: 5,
   },
   input: {},
   inputText: {
      paddingBottom: 4,
      paddingHorizontal: 12,
      position: 'relative',
      textAlign: 'center',
      top: 20,
   },
});

export default PageInput;
