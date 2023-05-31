import { useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { VariantProp } from 'react-native-paper/lib/typescript/src/components/Typography/types';

export interface CheckedProps {
   title: string;
   checked: boolean;
   setChecked: (value: React.SetStateAction<boolean>) => void;
   variant?: VariantProp<string>;
   style?: StyleProp<ViewStyle>;
}
const Checked = ({ title, setChecked, checked, variant, style }: CheckedProps) => {
   return (
      <View style={[style]}>
         <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
         />
         <Text variant={variant}>{title}</Text>
      </View>
   );
};

export default Checked;
