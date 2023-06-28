import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { EditableHeaderParams } from '../../../../library/zustand/utils/notes/retriever';
import TitleInput, { TitleInputProps } from './titleInput';
import { convertPage } from '../../../../library/zustand/utils/notes/converter';
import { Text } from 'react-native-paper';
import { PageParamKeys } from '../../../../constants';

interface Params {
   keys: PageParamKeys;
   page: EditableHeaderParams['pageFrom'];
}

interface PageInputProps
   extends Omit<
      TitleInputProps<EditableHeaderParams['pageFrom']>,
      'value' | 'keyboardType' | 'size' | 'onChangeText' | 'placeholder'
   > {
   params: Params;
   setPage: (text: string) => void;
   style?: StyleProp<ViewStyle>;
}

const PageInput = ({ params, setPage, style, ...props }: PageInputProps) => {
   const { keys, page } = params;

   function convertToString(value: null | number) {
      if (value === null || isNaN(value)) {
         return '';
      }
      return value.toString();
   }

   const value = convertToString(page);
   const label = keys === PageParamKeys.TO ? 'To: ' : 'From: ';

   return (
      <View style={[style, styles.container]}>
         <Text variant='labelLarge' style={styles.label}>
            {label}
         </Text>
         <TitleInput
            placeholder='Page'
            keyboardType='numeric'
            size='small'
            value={value}
            // onChangeText={(text) => onPageChange(text)}
            onChangeText={(text) => setPage(text)}
            {...props}
         />
      </View>
   );
};

const WIDTH = 140;
const MIN_WIDTH = 40;

const styles = StyleSheet.create({
   container: {
      width: WIDTH, // subtitle is 55% of width
      flexDirection: 'row',
   },
   label: {
      minWidth: MIN_WIDTH,
      textAlign: 'center',
      alignSelf: 'center',
   },
   pageLabel: {
      position: 'absolute',
      //   left: WIDTH - MIN_WIDTH,
      alignSelf: 'center',
   },
});

export default PageInput;
