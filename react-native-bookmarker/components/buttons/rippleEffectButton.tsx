import React from 'react';
import {
   Platform,
   TouchableOpacity,
   TouchableNativeFeedback,
   View,
   Text,
   StyleSheet,
   TouchableOpacityProps,
   TouchableNativeFeedbackProps,
} from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { FONT_SIZE } from '../../constants';

export type RippleEffectButtonProps = {
   onPress: () => void;
   title: string;
   size: keyof (typeof FONT_SIZE)['button'];
   colors?: MD3Colors;
   textColor?: string;
   backgroundColor?: string;
} & (TouchableOpacityProps | TouchableNativeFeedbackProps);

const RippleEffectButton: React.FC<RippleEffectButtonProps> = ({
   onPress,
   title,
   size,
   colors,
   textColor,
   backgroundColor,
   ...props
}) => {
   const Touchable: any = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

   const getColor = (color: string | undefined, type: 'text' | 'background') => {
      if (typeof color === 'string') return color;
      return type === 'text' ? colors?.onSurface : colors?.background;
   };

   const fontSize = FONT_SIZE['button'][size];

   return (
      <Touchable
         onPress={onPress}
         useForeground={TouchableNativeFeedback.canUseNativeForeground()}
         {...props}
      >
         <View
            style={[styles.button, { backgroundColor: getColor(backgroundColor, 'background') }]}
         >
            <Text
               accessibilityLabel={title}
               style={[
                  styles.text,
                  {
                     color: getColor(textColor, 'text'),
                     fontSize: fontSize,
                  },
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
      borderRadius: 5,
   },
   text: {
      textAlign: 'center',
   },
});

export default RippleEffectButton;
