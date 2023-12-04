import { useState } from 'react';
import { ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface HighlightedPressProps {
   size?: number;
   highlighterColor?: string;
   style?: ViewStyle;
   activeOpacity?: number;
}

const useHighlightedPress = ({
   size,
   highlighterColor,
   activeOpacity,
   style,
}: HighlightedPressProps) => {
   const [pressed, setPressed] = useState(false);
   const { colors } = useTheme();

   const pressedStyle: ViewStyle = {
      opacity: activeOpacity ?? 0.5,
      backgroundColor: highlighterColor ?? colors.outline,
      borderRadius: 50,
   };

   const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: size,
      width: size,
      ...style,
      ...(pressed ? pressedStyle : {}),
   };

   const handlePressIn = () => setPressed(true);
   const handlePressOut = () => setPressed(false);

   return { containerStyle, handlePressIn, handlePressOut, pressed };
};

export default useHighlightedPress;
