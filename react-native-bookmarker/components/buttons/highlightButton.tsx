import React, { useState } from 'react';
import {
   Platform,
   TouchableOpacity,
   TouchableNativeFeedback,
   View,
   Text,
   StyleSheet,
   StyleProp,
   ViewStyle,
} from 'react-native';
import { RippleEffectButtonProps } from './rippleEffectButton';
import { FONT_SIZE } from '../../constants';

type HighlightButtonProps = {
   transparent?: boolean;
   highlighterColor?: string;
   contentStyle?: StyleProp<ViewStyle>;
} & RippleEffectButtonProps;

const HighlightButton: React.FC<HighlightButtonProps> = ({
   onPress,
   title,
   size = 'medium',
   colors,
   textColor,
   backgroundColor,
   transparent,
   highlighterColor,
   contentStyle,
   ...props
}) => {
   const Touchable: any = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

   const [pressed, setPressed] = useState(false);

   const getColor = (color: string | undefined, type: 'text' | 'background') => {
      if (typeof color === 'string') return color;
      return type === 'text' ? colors?.onSurface : colors?.background;
   };

   const normalBg = transparent ? 'transparent' : getColor(backgroundColor, 'background');
   const bg = pressed ? highlighterColor : normalBg;

   const pressedStyle: ViewStyle = {
      opacity: 0.5,
      backgroundColor: highlighterColor,
   };

   return (
      <Touchable
         onPress={onPress}
         onPressIn={() => setPressed(true)}
         onPressOut={() => setPressed(false)}
         useForeground={TouchableNativeFeedback.canUseNativeForeground()}
         {...props}
      >
         <View
            style={[pressed && pressedStyle, contentStyle, styles.button, { backgroundColor: bg }]}
         >
            <Text
               accessibilityLabel={title}
               style={[
                  styles.text,
                  { color: getColor(textColor, 'text'), fontSize: FONT_SIZE['button'][size] },
               ]}
            >
               {title}
            </Text>
         </View>
      </Touchable>
   );
};

const styles = StyleSheet.create({
   button: {
      margin: 10,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 15,
   },
   text: {
      fontSize: 15,
      textAlign: 'center',
   },
});

export default HighlightButton;
