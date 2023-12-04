import {
   TouchableOpacityProps,
   StyleProp,
   ViewStyle,
   TouchableOpacity,
   TextStyle,
} from 'react-native';

import { Text, useTheme } from 'react-native-paper';
import { TextVariant } from '../../library/@types/variant';

interface TouchableSaveButtonProps extends TouchableOpacityProps {
   name: string;
   color?: string;
   variant?: TextVariant;
   label?: string;
   textStyle?: StyleProp<TextStyle>;
}

const TouchableCustomButton = ({
   name,
   color,
   variant,
   label,
   textStyle,
   ...rest
}: TouchableSaveButtonProps) => {
   const accessibleLabel = !label ? name : label;
   return (
      <TouchableOpacity
         style={[{ backgroundColor: color }]}
         accessibilityRole='button'
         accessibilityLabel={`${accessibleLabel}-button`}
         {...rest}
      >
         <Text variant={variant} style={textStyle}>
            {name}
         </Text>
      </TouchableOpacity>
   );
};

export default TouchableCustomButton;
