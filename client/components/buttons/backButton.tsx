import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { ICONS } from '../../constants';
import IconButton, { IconButtonProps, TouchableIconButton } from './icons/iconButton';
import IonIcons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import useHighlightedPress from '../../library/hooks/useHighlightedPress';

interface BackButtonProps extends Omit<IconButtonProps, 'renderIcon'> {
   name: 'chevron-back' | 'md-close' | 'arrow-back';
   color: string;
   size?: number;
   isHighlighted?: boolean;
   highlighterColor?: string;
   iconStyle?: StyleProp<TextStyle>;
   style?: StyleProp<ViewStyle>;
}

const BackButton = ({
   name,
   color,
   size = ICONS.MEDIUM,
   isHighlighted = false,
   activeOpacity,
   highlighterColor,
   iconStyle,
   style,
   ...rest
}: BackButtonProps) => {
   const { containerStyle, handlePressIn, handlePressOut } = useHighlightedPress({
      size: size + 5,
      highlighterColor,
      activeOpacity,
   });
   return (
      <>
         {isHighlighted ? (
            <View style={[containerStyle, style]}>
               <TouchableIconButton
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  accessibilityLabel='back-button'
                  accessibilityRole='button'
                  renderIcon={() => (
                     <IonIcons
                        name={name}
                        size={size}
                        color={color}
                        style={[
                           {
                              // borderRadius: 50,
                              // alignItems: 'center',
                              // justifyContent: 'center',
                              // alignSelf: 'center',
                           },
                        ]}
                     />
                  )}
                  {...rest}
               />
            </View>
         ) : (
            <IconButton
               accessibilityLabel='back-button'
               accessibilityRole='button'
               renderIcon={() => <IonIcons name={name} size={size} color={color} />}
               {...rest}
            />
         )}
      </>
   );
};

export default BackButton;
