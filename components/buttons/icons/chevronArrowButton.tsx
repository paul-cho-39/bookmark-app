import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from 'react-native-paper';
import useHighlightedPress from '../../../library/hooks/useHighlightedPress';

interface ChevronArrowButtonProps extends TouchableOpacityProps {
   iconName: 'chevron-right' | 'chevron-left' | 'chevron-up' | 'chevron-down';
   size: number;
   handleDirection: () => void;
   activeOpacity?: number;
   highlighterColor?: string;
   style?: StyleProp<ViewStyle>;
}

const ChevronArrowButton = ({
   iconName,
   activeOpacity,
   highlighterColor,
   size,
   handleDirection,
   style,
   ...rest
}: ChevronArrowButtonProps) => {
   const { colors } = useTheme();
   const { containerStyle, handlePressIn, handlePressOut } = useHighlightedPress({
      size: size + 5,
      highlighterColor,
      activeOpacity,
   });

   return (
      <View style={[containerStyle, style]}>
         <TouchableOpacity
            accessibilityLabel={iconName}
            accessibilityRole='button'
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleDirection}
            {...rest}
         >
            <MaterialCommunityIcons
               name={iconName}
               size={size}
               color={colors.onBackground}
               style={[{ borderRadius: 50, justifyContent: 'center', alignContent: 'center' }]}
            />
         </TouchableOpacity>
      </View>
   );
};

export default ChevronArrowButton;
