import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

// useless component unless further devised

export interface ButtonNavigateProps {
   name: string;
   onPress: (e: GestureResponderEvent) => void;
   mode: 'text' | 'outlined';
   color?: string;
   style?: StyleProp<ViewStyle>;
}

const ButtonNavigate = ({ name, onPress, color, mode, style }: ButtonNavigateProps) => {
   return (
      <Button
         accessibilityHint={name}
         style={style}
         mode={mode}
         buttonColor={color}
         onPress={onPress}
      >
         {name}
      </Button>
   );
};

export default ButtonNavigate;
