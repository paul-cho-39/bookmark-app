import Slider from '@react-native-community/slider';
import {
   useTheme,
   Text,
   Button,
   TextInput,
   TextInputProps as ReactNativePaperTextInputProps,
} from 'react-native-paper';
import { View } from 'react-native';

interface PageSliderProps {
   textValue: string;
   onTextChange: (newValue: string) => void;
   value: number;
   text: string;
   maxValue: number;
   show: boolean;
   setValue: (value: number) => void;
}

const PageSlider = ({
   textValue,
   onTextChange,
   value,
   text,
   setValue,
   maxValue,
   show,
}: // increase,
PageSliderProps) => {
   const theme = useTheme();
   return show ? (
      <View
         style={{
            marginHorizontal: 25,
            marginVertical: 5,
         }}
      >
         <Text
            style={{
               paddingBottom: 4,
               paddingHorizontal: 12,
               position: 'relative',
               textAlign: 'center',
               top: 20,
            }}
            variant='labelLarge'
         >
            {text}
         </Text>
         <PageInputter
            value={textValue}
            onChange={onTextChange}
            // mode='flat'
            style={{ backgroundColor: 'transparent', marginBottom: 40 }}
         />
         {/* still deciding whether to put the <Slider/> here */}
         {/* <Slider
            disabled={!maxValue}
            value={value}
            onValueChange={setValue}
            minimumValue={0}
            maximumValue={maxValue}
            minimumTrackTintColor={theme.colors.onBackground}
            style={{
               height: 15,
               alignSelf: 'stretch',
               marginBottom: 30,
            }}
         /> */}
      </View>
   ) : null;
};

export default PageSlider;

interface PageInputterProps extends Omit<ReactNativePaperTextInputProps, 'value' | 'onChange'> {
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
            {...(rest as ReactNativePaperTextInputProps)}
         />
      </>
   );
};
