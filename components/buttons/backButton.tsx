import IconButton, { IconButtonProps } from './icons/iconButton';
import IonIcons from '@expo/vector-icons/Ionicons';

interface BackButtonProps extends Omit<IconButtonProps, 'renderIcon'> {
   name: 'chevron-back' | 'md-close' | 'arrow-back';
   color: string;
   size?: number;
}

const BackButton = ({ name, color, size = 24, ...rest }: BackButtonProps) => {
   return (
      <IconButton
         accessibilityLabel='back-button'
         accessibilityRole='button'
         renderIcon={() => <IonIcons name={name} size={size} color={color} />}
         {...rest}
      />
   );
};

export default BackButton;
