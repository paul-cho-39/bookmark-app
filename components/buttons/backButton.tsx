import { ViewStyle } from 'react-native';
import { ICONS } from '../../assets/constants';
import IconButton, { IconButtonProps, TouchableIconButton } from './icons/iconButton';
import IonIcons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

interface BackButtonProps extends Omit<IconButtonProps, 'renderIcon'> {
   name: 'chevron-back' | 'md-close' | 'arrow-back';
   color: string;
   size?: number;
   isHighlighted?: boolean;
   highlighterColor?: string;
}

const BackButton = ({
   name,
   color,
   size = ICONS.MEDIUM,
   isHighlighted = false,
   activeOpacity,
   highlighterColor,
   ...rest
}: BackButtonProps) => {
   const [pressed, setPressed] = useState(false);

   const pressedStyle: ViewStyle = {
      opacity: activeOpacity ?? 0.5,
      backgroundColor: highlighterColor,
   };

   return (
      <>
         {isHighlighted ? (
            <TouchableIconButton
               onPressIn={() => setPressed(true)}
               onPressOut={() => setPressed(false)}
               accessibilityLabel='back-button'
               accessibilityRole='button'
               highlighterColor={highlighterColor as string}
               renderIcon={() => (
                  <IonIcons
                     name={name}
                     size={size}
                     color={color}
                     style={[pressed && pressedStyle, { borderRadius: 20 }]}
                  />
               )}
               {...rest}
            />
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
