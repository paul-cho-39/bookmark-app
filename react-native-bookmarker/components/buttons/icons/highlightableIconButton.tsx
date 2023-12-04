import { useState } from 'react';
import { IconButtonProps, TouchableIconButton } from './iconButton';
import { StyleProp, View, ViewStyle } from 'react-native';
import useHighlightedPress from '../../../library/hooks/useHighlightedPress';

interface HighlightableIconButtonProps extends IconButtonProps {
   size?: number;
   isHighlighted?: boolean;
   highlighterColor?: string;
   style?: StyleProp<ViewStyle>;
}

const HighlightableIconButton = (props: HighlightableIconButtonProps) => {
   const { isHighlighted, activeOpacity, renderIcon, size, highlighterColor, style, ...rest } =
      props;

   const { containerStyle, handlePressIn, handlePressOut } = useHighlightedPress({
      size,
      highlighterColor,
      activeOpacity,
   });

   return (
      <View style={[containerStyle, style]}>
         <TouchableIconButton
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            accessibilityRole='button'
            renderIcon={renderIcon}
            {...rest}
         />
      </View>
   );
};

export default HighlightableIconButton;
